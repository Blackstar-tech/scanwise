import { z } from "zod";
import { acceptedReportFileLabel, acceptedReportMimeTypes, maxUploadBytes } from "@/lib/constants";
import { reportModalities } from "@/types/report";

export const modalitySchema = z.enum(reportModalities);

export const reportTextSchema = z
  .string()
  .trim()
  .min(80, "Report text is too short to analyze reliably.")
  .max(60000, "Report text is too long for a single analysis request.");

export const analyzeReportSchema = z.object({
  modality: modalitySchema,
  reportText: reportTextSchema
});

export function validateReportUpload(file: File): string | null {
  if (!acceptedReportMimeTypes.includes(file.type)) {
    return `Only ${acceptedReportFileLabel} radiology reports are supported.`;
  }

  if (file.size > maxUploadBytes) {
    return "Report file must be 15 MB or smaller.";
  }

  return null;
}
