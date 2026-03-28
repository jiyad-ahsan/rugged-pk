export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[DEV] Email to ${to}: ${subject}`);
    console.log(`[DEV] Body: ${html}`);
    return;
  }

  await fetch("https://api.resend.com/emails", {
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
}

export async function sendVerificationEmail(email, code) {
  await sendEmail({
    to: email,
    subject: "Verify your Rugged account",
    html: `<p>Your verification code is: <strong>${code}</strong></p><p>It expires in 10 minutes.</p>`,
  });
}

export async function sendPasswordResetEmail(email, token) {
  const baseUrl = process.env.AUTH_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your Rugged password",
    html: `<p>Click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 1 hour.</p>`,
  });
}
