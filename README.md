# ScanWise

ScanWise is a mobile-first web application for Western healthcare markets that helps patients understand CT and ultrasound radiology reports in plain English and track findings over time.

The MVP deliberately supports only:

- CT scan reports
- Ultrasound reports
- PDF and image uploads
- Plain English education, not diagnosis

## Project Architecture

Frontend:

- Next.js App Router with TypeScript
- Tailwind for responsive UI
- Server Components for authenticated dashboards and report pages
- Client Components for auth and upload interactions

Backend:

- Supabase Auth for email magic links and Google login
- PostgreSQL with row-level security
- Supabase Storage private bucket for report PDFs and images
- Server-only API routes for upload, OCR, AI analysis, and PDF export

AI and OCR:

- `services/ocr.ts` calls a configured OCR API endpoint for PDFs or report images
- `services/ai.ts` calls an API-based model and requires structured JSON output
- Report explanations include summary, important findings, term definitions, doctor questions, and disclaimers
- The AI prompt forbids diagnosis and limits output to report text

Compliance posture:

- HIPAA-ready architecture: private storage, server-side processing, RLS, audit-friendly tables, and service boundaries
- GDPR-friendly data model: user-scoped records, deletable user data, no public buckets
- Uploads are kept in a private bucket and should be backed by encrypted storage and a signed BAA/DPA with vendors
- User data is not used for model training by this application; enforce this through provider contracts and settings
- Medical disclaimer is displayed across patient-facing workflows

## Folder Structure

```text
app/
  api/
  auth/
  dashboard/
  reports/
  upload/
components/
lib/
  supabase/
services/
types/
supabase/
  schema.sql
```

## Database Schema

The full schema is in `supabase/schema.sql`.

Core tables:

- `profiles`: user profile metadata
- `reports`: uploaded CT and ultrasound reports
- `report_analysis`: structured AI explanation JSON
- `report_findings`: normalized measurements for timeline trends
- `report_comparisons`: saved comparison snapshots

Storage:

- Private `reports` bucket
- Upload limit of 15 MB for PDF, JPG, PNG, and WebP files
- User-scoped storage paths

## API Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/reports/upload` | `POST` | Validate PDF or image report, upload to storage, run OCR, run AI analysis, persist output |
| `/api/reports/analyze` | `POST` | Analyze report text into structured JSON |
| `/api/reports/[id]/export` | `GET` | Export a plain English report summary PDF |

## Component Structure

- `SiteHeader`: navigation and primary upload action
- `AuthPanel`: email magic link and Google login
- `UploadDropzone`: PDF/image validation, modality selection, upload state, analysis preview
- `ExplainerSections`: Summary, Important Findings, Medical Terms Explained, Questions To Ask Your Doctor
- `DashboardShell`: recent uploads, comparison history, dashboard metrics
- `ReportCard`: individual uploaded report
- `TrendCard`: repeated measurement comparison
- `MedicalDisclaimer`: reusable patient-facing disclaimer

## MVP Implementation Order

1. Create Supabase project, run `supabase/schema.sql`, and configure Auth providers.
2. Create private `reports` storage bucket if it was not created by the SQL migration.
3. Add `.env.local` values from `.env.example`.
4. Connect a HIPAA/GDPR-appropriate OCR provider through `OCR_API_URL`.
5. Add an approved AI provider key and model through `OPENAI_API_KEY` and `OPENAI_MODEL`.
6. Verify email and Google login redirect to `/auth/callback`.
7. Upload CT and ultrasound sample PDFs and report images, then confirm unsupported files are rejected.
8. Validate structured analysis output, timeline measurements, and PDF export.
9. Add audit logging, retention controls, account deletion, and consent screens before production launch.

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3001`.

Do not use VS Code Live Server as the main app server. This is a Next.js application, so it must run through `npm run dev`, `npm run build`, or `npm start`. A small `index.html` fallback is included only to redirect accidental Live Server opens to the Next.js dev server.

## Environment

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_REPORT_BUCKET`
- `OCR_API_URL`
- `OCR_API_KEY`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

Keep `OPENAI_MODEL` explicit so clinical, legal, and product stakeholders can approve model changes.

For detailed Supabase setup, see `SUPABASE_SETUP.md`.
