# Configure Supabase for ScanWise

The app can run in demo mode locally, but real email login and Google login need Supabase keys.

## 1. Get Your Supabase Values

In your Supabase project, open **Project Settings** > **API** and copy:

- Project URL
- anon public key
- service role key

## 2. Create `.env.local`

Create `.env.local` in this folder:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_REPORT_BUCKET=reports
```

Do not share or commit `.env.local`.

## 3. Configure Redirect URLs

In Supabase, open **Authentication** > **URL Configuration**.

Set **Site URL**:

```text
http://localhost:3001
```

Add **Redirect URLs**:

```text
http://localhost:3001/auth/callback
https://your-vercel-domain.vercel.app/auth/callback
```

Supabase requires redirect URLs used by email and OAuth sign-ins to be allow-listed.
If Supabase sends a magic link to `/?code=...` instead of `/auth/callback?code=...`,
the callback URL has not been allow-listed for the app URL you used to request the link.

## 4. Enable Email Login

In Supabase, open **Authentication** > **Providers** > **Email**.

Enable Email provider and magic link or OTP sign-in.

## 5. Enable Google Login

In Supabase, open **Authentication** > **Providers** > **Google**.

Enable Google and add your Google OAuth Client ID and Client Secret.

In Google Cloud Console, add Supabase's callback URL as an authorized redirect URI. Supabase shows the exact URL in the Google provider panel. It normally looks like:

```text
https://your-project-id.supabase.co/auth/v1/callback
```

## 6. Create the Database

In Supabase SQL Editor, run the contents of:

```text
supabase/schema.sql
```

This creates the `reports` table and the private `reports` storage bucket. If upload shows a Supabase setup error, this SQL has not been run successfully in the connected Supabase project.

## 7. Restart the App

Stop the server and run:

```bash
npm run dev
```

Open:

```text
http://localhost:3001
```

## 8. Brand the Auth Emails

The default Supabase emails show `Supabase Auth <noreply@mail.app.supabase.io>`.
To make login emails come from ScanWise, configure both the sender and the email body.

### A. Enable Custom SMTP

In Supabase, open **Authentication** > **SMTP Settings**.

Enable custom SMTP and add values from your email provider:

```text
Sender name: ScanWise
Sender email: no-reply@your-domain.com
SMTP host: provided by your email service
SMTP port: usually 465, 587, or 2525
SMTP username: provided by your email service
SMTP password: provided by your email service
```

Use a verified domain for the sender email. Good providers include Resend, Postmark,
SendGrid, AWS SES, Brevo, or any SMTP-compatible email service.

### B. Replace the Magic Link Template

In Supabase, open **Authentication** > **Email Templates** > **Magic Link**.

Set the subject:

```text
Your secure ScanWise sign-in link
```

Paste the contents of:

```text
supabase/email-templates/magic-link.html
```

The template must keep:

```text
{{ .ConfirmationURL }}
```

Supabase replaces that variable with the real one-time login link.

### C. Replace the Confirm Sign Up Template

If email confirmation is enabled, open **Authentication** > **Email Templates** > **Confirm Sign Up**.

Set the subject:

```text
Confirm your ScanWise email
```

Paste the contents of:

```text
supabase/email-templates/confirmation.html
```

### D. Send a Fresh Test Link

Old emails keep the old sender and old template. After saving SMTP and templates,
request a new login link from:

```text
http://localhost:3001/auth
```

### E. If You See `email rate limit exceeded`

This means Supabase has temporarily blocked more auth emails for the project or recipient.

For local testing:

- Wait a few minutes before requesting another email link.
- Use **Continue with Google** while the email limit cools down.
- Avoid repeatedly clicking **Email login link**.

For production:

- Enable custom SMTP as described above.
- Verify your sender domain with your email provider.
- In Supabase, review **Authentication** > **Rate Limits** so email auth limits match expected usage.
