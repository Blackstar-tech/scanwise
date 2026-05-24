import { getOcrProviderEnv } from "@/lib/env";

export interface OcrResult {
  status: "completed" | "not_configured" | "failed";
  text: string;
  provider?: string;
  error?: string;
}

export async function extractTextFromReportFile(file: File): Promise<OcrResult> {
  const env = getOcrProviderEnv();

  if (!env.ocrApiUrl) {
    return {
      status: "not_configured",
      text: "",
      provider: "external-ocr"
    };
  }

  const formData = new FormData();
  formData.append("file", file, file.name);

  const response = await fetch(env.ocrApiUrl, {
    method: "POST",
    headers: env.ocrApiKey ? { Authorization: `Bearer ${env.ocrApiKey}` } : undefined,
    body: formData
  });

  if (!response.ok) {
    return {
      status: "failed",
      text: "",
      provider: "external-ocr",
      error: `OCR provider returned ${response.status}`
    };
  }

  const data = (await response.json()) as { text?: string };

  return {
    status: "completed",
    text: data.text?.trim() ?? "",
    provider: "external-ocr"
  };
}
