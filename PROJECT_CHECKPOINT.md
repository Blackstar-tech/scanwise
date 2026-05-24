# ScanWise Checkpoint

Last local app URL:

```text
http://localhost:3001
```

Run the app:

```bash
npm run dev
```

## What Is Done

- Next.js, TypeScript, Tailwind project scaffold is built.
- Landing page is built.
- Login page is built.
- Upload page is built.
- Dashboard UI is built.
- Report detail UI is built.
- Supabase client/server setup is added.
- `.env.local` has Supabase URL, anon key, service role key, and bucket name.
- Upload supports PDF, JPG, JPEG, PNG, and WebP.
- Supabase SQL schema is in `supabase/schema.sql`.
- Supabase setup instructions are in `SUPABASE_SETUP.md`.

## Important Files

- `README.md`
- `SUPABASE_SETUP.md`
- `.env.local`
- `supabase/schema.sql`
- `app/page.tsx`
- `app/upload/page.tsx`
- `app/dashboard/page.tsx`
- `components/UploadDropzone.tsx`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`

## Still Needed In Supabase Dashboard

1. Authentication URL Configuration:

```text
Site URL: http://localhost:3001
Redirect URL: http://localhost:3001/auth/callback
```

2. Enable Email provider.
3. Enable Google provider.
4. Add real Google OAuth Client ID and Client Secret.
5. Run `supabase/schema.sql` in the Supabase SQL Editor.
6. Make sure the `reports` storage bucket allows:

```text
application/pdf
image/jpeg
image/png
image/webp
```

## Still Needed For Real Report Analysis

- Add an OCR provider:

```env
OCR_API_URL=
OCR_API_KEY=
```

- Add an AI provider:

```env
OPENAI_API_KEY=
OPENAI_MODEL=
```

Without these, uploads can be tested, but real report text extraction and AI explanation will not happen yet.

## Security Note

The Supabase service role key was added to `.env.local`. Keep it private. Before publishing this project or pushing to GitHub, make sure `.env.local` is never committed.
