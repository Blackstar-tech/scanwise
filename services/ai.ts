import { z } from "zod";
import { getAiProviderEnv } from "@/lib/env";
import { medicalDisclaimer } from "@/lib/constants";
import type { ReportAnalysis, ReportModality } from "@/types/report";

const analysisSchema = z.object({
  modality: z.enum(["ct", "ultrasound"]),
  summary: z.string(),
  importantFindings: z.array(
    z.object({
      title: z.string(),
      bodyRegion: z.string().optional(),
      plainEnglish: z.string(),
      originalText: z.string().optional(),
      severity: z.enum(["routine", "follow_up", "urgent"]),
      measurements: z
        .array(
          z.object({
            label: z.string(),
            value: z.number(),
            unit: z.enum(["mm", "cm", "ml", "other"]),
            comparisonKey: z.string()
          })
        )
        .optional()
    })
  ),
  medicalTerms: z.array(
    z.object({
      term: z.string(),
      definition: z.string(),
      whyItMatters: z.string().optional()
    })
  ),
  questionsForDoctor: z.array(
    z.object({
      question: z.string(),
      reason: z.string()
    })
  ),
  confidenceDisclaimer: z.string(),
  noDiagnosisDisclaimer: z.string()
});

export async function analyzeRadiologyReport(params: {
  modality: ReportModality;
  reportText: string;
}): Promise<ReportAnalysis> {
  const env = getAiProviderEnv();

  if (!env.openAiApiKey || !env.openAiModel) {
    return buildFallbackAnalysis(params.modality);
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.openAiApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: env.openAiModel,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: [
                "You explain CT and ultrasound radiology reports to non-medical patients.",
                "You never diagnose, estimate prognosis, or say a finding is harmless.",
                "You only use information present in the report text.",
                "You flag urgent-sounding wording as a reason to contact the doctor, not as a diagnosis.",
                "Return only JSON that matches the requested schema."
              ].join(" ")
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Modality: ${params.modality}\n\nRadiology report:\n${params.reportText}`
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "scanwise_report_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: [
              "modality",
              "summary",
              "importantFindings",
              "medicalTerms",
              "questionsForDoctor",
              "confidenceDisclaimer",
              "noDiagnosisDisclaimer"
            ],
            properties: {
              modality: { type: "string", enum: ["ct", "ultrasound"] },
              summary: { type: "string" },
              importantFindings: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["title", "plainEnglish", "severity"],
                  properties: {
                    title: { type: "string" },
                    bodyRegion: { type: "string" },
                    plainEnglish: { type: "string" },
                    originalText: { type: "string" },
                    severity: {
                      type: "string",
                      enum: ["routine", "follow_up", "urgent"]
                    },
                    measurements: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: false,
                        required: ["label", "value", "unit", "comparisonKey"],
                        properties: {
                          label: { type: "string" },
                          value: { type: "number" },
                          unit: {
                            type: "string",
                            enum: ["mm", "cm", "ml", "other"]
                          },
                          comparisonKey: { type: "string" }
                        }
                      }
                    }
                  }
                }
              },
              medicalTerms: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["term", "definition"],
                  properties: {
                    term: { type: "string" },
                    definition: { type: "string" },
                    whyItMatters: { type: "string" }
                  }
                }
              },
              questionsForDoctor: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["question", "reason"],
                  properties: {
                    question: { type: "string" },
                    reason: { type: "string" }
                  }
                }
              },
              confidenceDisclaimer: { type: "string" },
              noDiagnosisDisclaimer: { type: "string" }
            }
          }
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`AI provider returned ${response.status}`);
  }

  const payload = (await response.json()) as {
    output_text?: string;
    output?: Array<{
      content?: Array<{ text?: string }>;
    }>;
  };

  const rawText =
    payload.output_text ??
    payload.output?.flatMap((item) => item.content ?? []).find((item) => item.text)?.text;

  if (!rawText) {
    throw new Error("AI provider returned an empty analysis.");
  }

  return analysisSchema.parse(JSON.parse(rawText));
}

export function buildFallbackAnalysis(modality: ReportModality): ReportAnalysis {
  return {
    modality,
    summary:
      "AI analysis is not configured yet. The report was stored, and ScanWise is ready to explain it once an AI provider key and model are added.",
    importantFindings: [],
    medicalTerms: [],
    questionsForDoctor: [
      {
        question: "Can you walk me through the main finding in this report?",
        reason: "Your clinician can interpret the report with your symptoms, exam, and history."
      },
      {
        question: "Does this report need follow-up imaging or lab tests?",
        reason: "Follow-up depends on the full clinical context."
      }
    ],
    confidenceDisclaimer:
      "This explanation is limited because AI analysis has not been configured.",
    noDiagnosisDisclaimer: medicalDisclaimer
  };
}
