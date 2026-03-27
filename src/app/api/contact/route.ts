import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || "";
const MAKE_WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL || "";

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  event_type?: string;
  event_date?: string;
  location?: string;
  budget?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: ContactData = await req.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Warn if no email/CRM service configured
    if (!RESEND_API_KEY) {
      console.warn("⚠️ RESEND_API_KEY non configuré. Les leads ne sont pas notifiés par email.");
    }
    if (!HUBSPOT_ACCESS_TOKEN) {
      console.warn("⚠️ HUBSPOT_ACCESS_TOKEN non configuré. Les leads ne sont pas envoyés au CRM.");
    }

    // 1. Send notification email to Nicola via Resend
    if (RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "The Next Event <noreply@thenextevent.fr>",
            to: ["nicola@thenextevent.fr"],
            subject: `Nouveau lead TNE — ${data.name} (${data.event_type || "Non précisé"})`,
            html: `
              <h2>Nouvelle demande de devis</h2>
              <table style="border-collapse:collapse;width:100%">
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nom</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Téléphone</td><td style="padding:8px;border:1px solid #ddd">${data.phone || "—"}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Société</td><td style="padding:8px;border:1px solid #ddd">${data.company || "—"}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Type d'événement</td><td style="padding:8px;border:1px solid #ddd">${data.event_type || "—"}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Date</td><td style="padding:8px;border:1px solid #ddd">${data.event_date || "—"}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Lieu</td><td style="padding:8px;border:1px solid #ddd">${data.location || "—"}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Budget</td><td style="padding:8px;border:1px solid #ddd">${data.budget || "—"}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${data.message || "—"}</td></tr>
              </table>
              <p style="margin-top:16px;color:#666">Source: thenextevent.fr — ${new Date().toISOString()}</p>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("[Contact API] Resend notification error:", emailErr);
      }

      // 1b. Send confirmation email to the prospect
      try {
        const firstName = data.name.split(" ")[0];
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
                <p style="color:#8A8580;line-height:1.8;font-size:15px;">Votre demande pour <strong style="color:#F5F0EB;">${data.event_type || "votre événement"}</strong> a bien été reçue.</p>
                <p style="color:#8A8580;line-height:1.8;font-size:15px;">Notre équipe vous recontacte sous <strong style="color:#C4A35A;">24 heures</strong>.</p>
                <hr style="border:1px solid #1E1E1E;margin:30px 0;" />
                <p style="color:#8A8580;font-size:14px;">Besoin urgent ? Appelez-nous directement :<br/>
                <a href="tel:+33660388027" style="color:#9B1B24;text-decoration:none;font-weight:bold;">06 60 38 80 27</a></p>
                <p style="color:#555;font-size:12px;margin-top:30px;">The Next Event — 66 rue du Cherche-Midi, 75006 Paris</p>
              </div>
            `,
          }),
        });
      } catch (confirmErr) {
        console.error("[Contact API] Confirmation email error:", confirmErr);
      }
    }

    // 2. Push lead to HubSpot CRM
    console.log("🔵 HubSpot — Token présent:", !!HUBSPOT_ACCESS_TOKEN);
    if (HUBSPOT_ACCESS_TOKEN) {
      try {
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
        console.log("🔵 HubSpot — Envoi:", JSON.stringify(hubspotBody));

        const hubspotResponse = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          },
          body: JSON.stringify(hubspotBody),
        });

        const hubspotData = await hubspotResponse.json();
        console.log("🔵 HubSpot — Status:", hubspotResponse.status);

        if (!hubspotResponse.ok) {
          console.error("❌ HubSpot ERREUR:", hubspotResponse.status, JSON.stringify(hubspotData));
        } else {
          console.log("✅ Contact HubSpot créé — ID:", hubspotData.id);
        }
      } catch (hubspotErr) {
        console.error("❌ HubSpot EXCEPTION:", hubspotErr);
      }
    } else {
      console.warn("⚠️ HUBSPOT_ACCESS_TOKEN non défini dans .env.local");
    }

    // 3. Forward to Make.com webhook
    if (MAKE_WEBHOOK_URL) {
      try {
        await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            source: "thenextevent.fr",
            submitted_at: new Date().toISOString(),
          }),
        });
      } catch (makeErr) {
        console.error("[Contact API] Make webhook error:", makeErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
