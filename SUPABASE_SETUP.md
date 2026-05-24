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

Add **Redirect URL**:

```text
http://localhost:3001/auth/callback
```

Supabase requires redirect URLs used by email and OAuth sign-ins to be allow-listed.

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
