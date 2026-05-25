# ScanWise Supabase Auth Email Templates

Use these templates in the Supabase Dashboard under **Authentication** > **Email Templates**.

## Magic Link / OTP

- Subject: `Your secure ScanWise sign-in link`
- Body: paste `magic-link.html`

## Confirm Sign Up

- Subject: `Confirm your ScanWise email`
- Body: paste `confirmation.html`

## Sender Identity

Templates change the email design, but the sender still comes from Supabase until custom SMTP is enabled.

In **Authentication** > **SMTP Settings**, enable custom SMTP and use:

- Sender name: `ScanWise`
- Sender email: `no-reply@your-domain.com`

For a real production sender, use a verified domain from an email provider such as Resend, Postmark, SendGrid, AWS SES, Brevo, or another SMTP provider.
