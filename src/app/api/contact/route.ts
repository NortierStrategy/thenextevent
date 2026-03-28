import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkCsrf, escapeHtml, checkRateLimit, getClientIp } from "@/lib/api/security";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || "";
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "";

/* ── Zod Schema ── */
const contactSchema = z.object({
  name: z.string().min(1, "Nom requis").max(200),
  email: z.string().email("Format email invalide").max(320),
  phone: z.string().max(30).optional().default(""),
  company: z.string().max(200).optional().default(""),
  event_type: z.string().max(100).optional().default(""),
  event_date: z.string().max(30).optional().default(""),
  location: z.string().max(200).optional().default(""),
  budget: z.string().max(50).optional().default(""),
  message: z.string().max(5000).optional().default(""),
});

type ContactData = z.infer<typeof contactSchema>;

/* ── Service Functions ── */
async function sendEmails(data: ContactData): Promise<void> {
  if (!RESEND_API_KEY) return;

  const s = (v: string | undefined) => escapeHtml(v || "—");
  const firstName = escapeHtml(data.name.split(" ")[0]);

  // Notification to Nicola
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "The Next Event <noreply@thenextevent.fr>",
      to: ["nicola@thenextevent.fr"],
      subject: `Nouveau lead TNE — ${escapeHtml(data.name)} (${escapeHtml(data.event_type || "Non précisé")})`,
      html: `
        <h2>Nouvelle demande de devis</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nom</td><td style="padding:8px;border:1px solid #ddd">${s(data.name)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${s(data.email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Téléphone</td><td style="padding:8px;border:1px solid #ddd">${s(data.phone)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Société</td><td style="padding:8px;border:1px solid #ddd">${s(data.company)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Type d'événement</td><td style="padding:8px;border:1px solid #ddd">${s(data.event_type)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Date</td><td style="padding:8px;border:1px solid #ddd">${s(data.event_date)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Lieu</td><td style="padding:8px;border:1px solid #ddd">${s(data.location)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Budget</td><td style="padding:8px;border:1px solid #ddd">${s(data.budget)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${s(data.message)}</td></tr>
        </table>
        <p style="margin-top:16px;color:#666">Source: thenextevent.fr — ${new Date().toISOString()}</p>
      `,
    }),
  });

  // Confirmation to prospect
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "The Next Event <noreply@thenextevent.fr>",
      to: [data.email],
      subject: "Votre demande a bien été reçue — The Next Event",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#0A0A0A;color:#F5F0EB;">
          <h1 style="font-family:Georgia,serif;color:#C4A35A;font-size:24px;font-weight:300;">Merci ${firstName} !</h1>
          <p style="color:#8A8580;line-height:1.8;font-size:15px;">Votre demande pour <strong style="color:#F5F0EB;">${escapeHtml(data.event_type || "votre événement")}</strong> a bien été reçue.</p>
          <p style="color:#8A8580;line-height:1.8;font-size:15px;">Notre équipe vous recontacte sous <strong style="color:#C4A35A;">24 heures</strong>.</p>
          <hr style="border:1px solid #1E1E1E;margin:30px 0;" />
          <p style="color:#8A8580;font-size:14px;">Besoin urgent ? Appelez-nous directement :<br/>
          <a href="tel:+33660388027" style="color:#9B1B24;text-decoration:none;font-weight:bold;">06 60 38 80 27</a></p>
          <p style="color:#555;font-size:12px;margin-top:30px;">The Next Event — 66 rue du Cherche-Midi, 75006 Paris</p>
        </div>
      `,
    }),
  });
}

async function pushToHubSpot(data: ContactData): Promise<void> {
  if (!HUBSPOT_ACCESS_TOKEN) return;

  const nameParts = data.name.split(" ");
  const hubspotBody = {
    properties: {
      email: data.email,
      firstname: nameParts[0] || "",
      lastname: nameParts.slice(1).join(" ") || "",
      phone: data.phone || "",
      company: data.company || "",
      hs_lead_status: "NEW",
      lifecyclestage: "lead",
    },
  };

  const hubspotResponse = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(hubspotBody),
    }
  );

  if (!hubspotResponse.ok) {
    const errData = await hubspotResponse.json();
    console.error("[Contact API] HubSpot error:", hubspotResponse.status, errData?.message);
  }
}

async function forwardToMake(data: ContactData): Promise<void> {
  if (!MAKE_WEBHOOK_URL) return;

  await fetch(MAKE_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      source: "thenextevent.fr",
      submitted_at: new Date().toISOString(),
    }),
  });
}

/* ── Main Handler ── */
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
    const parsed = contactSchema.safeParse(raw);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Données invalides";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Parallel execution of all services
    const results = await Promise.allSettled([
      sendEmails(data),
      pushToHubSpot(data),
      forwardToMake(data),
    ]);

    // Log failures silently
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        const services = ["Resend", "HubSpot", "Make"];
        console.error(`[Contact API] ${services[i]} failed:`, r.reason);
      }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
