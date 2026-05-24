"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { FileText, Loader2, ShieldCheck, UploadCloud, XCircle } from "lucide-react";
import { ExplainerSections } from "@/components/ExplainerSections";
import { acceptedReportFileExtensions, acceptedReportFileLabel, supportedReportLabels } from "@/lib/constants";
import { validateReportUpload } from "@/lib/validation";
import type { ReportModality, UploadResult } from "@/types/report";

type UploadResponse = Partial<UploadResult> & { error?: string };

export function UploadDropzone() {
  const [file, setFile] = useState<File | null>(null);
  const [modality, setModality] = useState<ReportModality>("ct");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const canSubmit = useMemo(() => Boolean(file && !error && !isUploading), [error, file, isUploading]);

  function onFileChange(nextFile: File | null) {
    setResult(null);
    setFile(nextFile);

    if (!nextFile) {
      setError(null);
      return;
    }

    setError(validateReportUpload(nextFile));
  }

  async function submitUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError(`Choose a ${acceptedReportFileLabel} report before uploading.`);
      return;
    }

    const validationError = validateReportUpload(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("modality", modality);

    try {
      const response = await fetch("/api/reports/upload", {
        method: "POST",
        body: formData
      });
      const payload = await readUploadResponse(response);

      if (!response.ok) {
        setError(payload.error ?? "Upload failed. Please try again.");
        return;
      }

      if (!payload.reportId || !payload.status) {
        setError(payload.error ?? "Upload finished, but the server response was incomplete.");
        return;
      }

      setResult(payload as UploadResult);
    } catch {
      setError("Upload failed. Please check your connection and try again.");
    } finally {
      setIsUploading(false);
    }
  }

  async function readUploadResponse(response: Response): Promise<UploadResponse> {
    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      return (await response.json()) as UploadResponse;
    }

    if (!response.ok) {
      return {
        error: `Upload failed on the server with status ${response.status}. Check the terminal running npm run dev for details.`
      };
    }

    return {
      error: "Upload finished, but the server returned an unreadable response."
    };
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form onSubmit={submitUpload} className="surface-card p-6 sm:p-7">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold heading-text">Upload report</h1>
          <p className="mt-2 text-sm leading-6 body-text">
            ScanWise accepts report PDFs and clear report images for CT scans and ultrasound only.
          </p>
        </div>

        <fieldset className="mb-6">
          <legend className="mb-2 text-sm font-medium body-text">Report type</legend>
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 transition-colors dark:bg-white/5">
            {(["ct", "ultrasound"] as const).map((option) => (
              <label
                key={option}
                className={`focus-within:ring-2 focus-within:ring-medical-blue ${
                  modality === option
                    ? "bg-white text-medical-blue shadow-sm dark:bg-sky-500 dark:text-white"
                    : "text-slate-600 dark:text-slate-300"
                } flex cursor-pointer items-center justify-center rounded-2xl px-3 py-2 text-sm font-semibold transition-all duration-200`}
              >
                <input
                  type="radio"
                  name="modality"
                  value={option}
                  checked={modality === option}
                  onChange={() => setModality(option)}
                  className="sr-only"
                />
                {supportedReportLabels[option]}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block cursor-pointer rounded-[20px] border-2 border-dashed border-line bg-ice-blue/50 p-8 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-medical-blue/50 focus-within:ring-2 focus-within:ring-medical-blue dark:border-white/10 dark:bg-sky-400/5 dark:hover:border-sky-300/40">
          <input
            type="file"
            accept={acceptedReportFileExtensions}
            className="sr-only"
            onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
          />
          <span className="icon-tile mx-auto size-12 bg-white shadow-sm dark:bg-white/10">
            <UploadCloud aria-hidden="true" size={24} />
          </span>
          <span className="mt-4 block font-semibold heading-text">
            {file ? file.name : `Choose ${acceptedReportFileLabel}`}
          </span>
          <span className="mt-2 block text-sm body-text">
            PDF, JPG, PNG, or WebP. Maximum file size: 15 MB.
          </span>
        </label>

        {file ? (
          <div className="surface-muted mt-4 flex items-center gap-3 p-4 text-sm text-slate-700 dark:text-slate-200">
            <FileText aria-hidden="true" size={18} className="text-medical-blue" />
            <span className="min-w-0 flex-1 truncate">{file.name}</span>
            <button
              type="button"
              onClick={() => onFileChange(null)}
              className="focus-ring rounded-xl p-1 text-slate-500 transition-colors hover:bg-white hover:text-ink dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Remove file"
            >
              <XCircle aria-hidden="true" size={18} />
            </button>
          </div>
        ) : null}

        {error ? <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-400/10 dark:text-red-200">{error}</p> : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="focus-ring primary-action mt-6 w-full px-4 py-3"
        >
          {isUploading ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <UploadCloud aria-hidden="true" size={18} />}
          {isUploading ? "Analyzing report" : "Upload Report"}
        </button>

        <div className="surface-muted mt-6 flex gap-3 p-4 text-sm leading-6 body-text">
          <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-medical-blue" size={18} />
          <p>Uploads are stored in a private bucket and processed through server-side routes.</p>
        </div>
      </form>

      <div>
        {result?.analysis ? (
          <ExplainerSections analysis={result.analysis} />
        ) : (
          <div className="surface-card p-6">
            <h2 className="text-lg font-semibold heading-text">Analysis preview</h2>
            <p className="mt-2 text-sm leading-6 body-text">
              After upload, ScanWise will show a plain English summary, important findings, medical
              terms, and questions for your doctor.
            </p>
            {result?.message ? (
              <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-100">{result.message}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
