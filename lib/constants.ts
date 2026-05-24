export const appName = "ScanWise";

export const acceptedReportMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp"
];

export const acceptedReportFileExtensions = ".pdf,.jpg,.jpeg,.png,.webp";

export const acceptedReportFileLabel = "PDF, JPG, PNG, or WebP";

export const maxUploadBytes = 15 * 1024 * 1024;

export const medicalDisclaimer =
  "ScanWise explains report language for education only. It does not diagnose, rule out conditions, or replace advice from a licensed clinician.";

export const supportedReportLabels = {
  ct: "CT scan",
  ultrasound: "Ultrasound"
} as const;
