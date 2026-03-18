import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, message, 'bot-field': botField } = body;

    // Honeypot — silently ignore bots
    if (botField) {
      return NextResponse.json({ ok: true });
    }

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'שדות חובה חסרים' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"The Digital Sanctuary" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[The Digital Sanctuary] New Lead: ${name}`,
      html: `
        <div dir="rtl" style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#3D3530;margin-bottom:24px">פנייה חדשה מהאתר</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;color:#6B5E52;font-weight:bold;width:120px">שם:</td>
              <td style="padding:8px 0;color:#3D3530">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6B5E52;font-weight:bold">אימייל:</td>
              <td style="padding:8px 0"><a href="mailto:${email}" style="color:#6B8C6B">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6B5E52;font-weight:bold">סוג פרקטיקה:</td>
              <td style="padding:8px 0;color:#3D3530">${role || 'לא צוין'}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #E8DFD8;margin:16px 0"/>
          <p style="color:#6B5E52;font-weight:bold;margin-bottom:8px">הודעה:</p>
          <p style="color:#3D3530;white-space:pre-wrap;background:#FAF7F4;padding:16px;border-radius:8px">${message}</p>
          <hr style="border:none;border-top:1px solid #E8DFD8;margin:16px 0"/>
          <p style="color:#9E8E81;font-size:12px">נשלח מ-The Digital Sanctuary</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[/api/contact] Failed to send email:', err);
    return NextResponse.json({ error: 'שליחה נכשלה' }, { status: 500 });
  }
}
