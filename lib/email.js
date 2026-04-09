const BRAND_COLOR = "#c94b30";

function emailWrapper(content) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:-apple-system,Segoe UI,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;padding:40px 20px">
<tr><td align="center">
<table width="100%" style="max-width:480px;background:#fff;border-radius:4px;overflow:hidden">
<tr><td style="background:${BRAND_COLOR};padding:24px 32px">
  <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:1px;font-family:monospace">RUGGED</span>
</td></tr>
<tr><td style="padding:32px">
  ${content}
</td></tr>
<tr><td style="padding:16px 32px 24px;border-top:1px solid #eee">
  <span style="color:#999;font-size:11px;font-family:monospace">rugged.pk — preparedness for Pakistani families</span>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[DEV EMAIL] To: ${to}`);
    console.log(`[DEV EMAIL] Subject: ${subject}`);
    console.log(`[DEV EMAIL] Body: ${html}`);
    return { success: true, dev: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Rugged <noreply@rugged.pk>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend API error:", res.status, err);
    throw new Error(`Email send failed: ${res.status}`);
  }

  return { success: true };
}

export async function sendVerificationEmail(email, code) {
  await sendEmail({
    to: email,
    subject: `${code} — Verify your Rugged account`,
    html: emailWrapper(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#1a1a1a">Verify your email</h2>
      <p style="margin:0 0 24px;color:#666;font-size:14px;line-height:1.5">
        Enter this code to complete your registration:
      </p>
      <div style="background:#f5f0eb;border-radius:4px;padding:20px;text-align:center;margin:0 0 24px">
        <span style="font-family:monospace;font-size:32px;font-weight:700;letter-spacing:8px;color:#1a1a1a">${code}</span>
      </div>
      <p style="margin:0;color:#999;font-size:12px">This code expires in 10 minutes. If you didn't create an account, ignore this email.</p>
    `),
  });
}

export async function sendPasswordResetEmail(email, token) {
  const baseUrl = process.env.AUTH_URL || "https://rugged.pk";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your Rugged password",
    html: emailWrapper(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#1a1a1a">Reset your password</h2>
      <p style="margin:0 0 24px;color:#666;font-size:14px;line-height:1.5">
        Click the button below to set a new password. This link expires in 1 hour.
      </p>
      <div style="text-align:center;margin:0 0 24px">
        <a href="${resetUrl}" style="display:inline-block;background:${BRAND_COLOR};color:#fff;text-decoration:none;padding:12px 32px;border-radius:4px;font-size:14px;font-weight:600">
          Reset Password
        </a>
      </div>
      <p style="margin:0;color:#999;font-size:12px">If the button doesn't work, copy this link:<br>
        <a href="${resetUrl}" style="color:${BRAND_COLOR};word-break:break-all;font-size:11px">${resetUrl}</a>
      </p>
      <p style="margin:16px 0 0;color:#999;font-size:12px">If you didn't request this, ignore this email.</p>
    `),
  });
}
