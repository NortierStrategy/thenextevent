import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkCsrf, escapeHtml, checkRateLimit, getClientIp } from "@/lib/api/security";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

/* ── Zod Schema ── */
const recruitSchema = z.object({
  nom: z.string().min(1, "Nom requis").max(200),
  email: z.string().email("Format email invalide").max(320),
  telephone: z.string().min(10, "Téléphone invalide").max(30),
  ville: z.string().min(1, "Ville requise").max(200),
  experience: z.string().max(1000).optional().default(""),
  message: z.string().max(5000).optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    // CSRF check
    const csrfError = checkCsrf(req);
    if (csrfError) return csrfError;

    // Rate limiting
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Trop de requêtes. Réessayez dans 1 minute." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "Retry-After": String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
          },
        }
      );
    }

    // Zod validation
    const raw = await req.json();
    const parsed = recruitSchema.safeParse(raw);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Données invalides";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const s = (v: string | undefined) => escapeHtml(v || "—");

    if (RESEND_API_KEY) {
      const results = await Promise.allSettled([
        // Notification to recruitment team
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "The Next Event <noreply@thenextevent.fr>",
            to: ["recrutement@thenextevent.fr"],
            subject: `Nouvelle candidature — ${escapeHtml(data.nom)} (${escapeHtml(data.ville)})`,
            html: `
              <h2>Nouvelle candidature régisseur</h2>
              <table style="border-collapse:collapse;width:100%">
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nom</td><td style="padding:8px;border:1px solid #ddd">${s(data.nom)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${s(data.email)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Téléphone</td><td style="padding:8px;border:1px solid #ddd">${s(data.telephone)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ville</td><td style="padding:8px;border:1px solid #ddd">${s(data.ville)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Expérience</td><td style="padding:8px;border:1px solid #ddd">${s(data.experience)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${s(data.message)}</td></tr>
              </table>
              <p style="margin-top:16px;color:#666">Source: thenextevent.fr/rejoindre — ${new Date().toISOString()}</p>
            `,
          }),
        }),
        // Confirmation to candidate
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "The Next Event <noreply@thenextevent.fr>",
            to: [data.email],
            subject: "Candidature reçue — The Next Event",
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#0A0A0A;color:#F5F0EB;">
                <h1 style="font-family:Georgia,serif;color:#C4A35A;font-size:24px;font-weight:300;">Merci ${escapeHtml(data.nom.split(" ")[0])} !</h1>
                <p style="color:#8A8580;line-height:1.8;font-size:15px;">Votre candidature a bien été reçue. Notre équipe l'examinera avec attention.</p>
                <p style="color:#8A8580;line-height:1.8;font-size:15px;">Nous reviendrons vers vous <strong style="color:#C4A35A;">sous 48 heures</strong>.</p>
                <hr style="border:1px solid #1E1E1E;margin:30px 0;" />
                <p style="color:#8A8580;font-size:14px;">N'oubliez pas d'envoyer votre CV à :<br/>
                <a href="mailto:recrutement@thenextevent.fr" style="color:#9B1B24;text-decoration:none;font-weight:bold;">recrutement@thenextevent.fr</a></p>
                <p style="color:#555;font-size:12px;margin-top:30px;">The Next Event — 66 rue du Cherche-Midi, 75006 Paris</p>
              </div>
            `,
          }),
        }),
      ]);

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`[Recruit API] Email ${i} failed:`, r.reason);
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Recruit API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
