export const reportModalities = ["ct", "ultrasound"] as const;

export type ReportModality = (typeof reportModalities)[number];

export type ReportStatus =
  | "uploaded"
  | "processing"
  | "analyzed"
  | "needs_ocr_configuration"
  | "failed";

export type FindingSeverity = "routine" | "follow_up" | "urgent";

export interface ImportantFinding {
  title: string;
  bodyRegion?: string;
  plainEnglish: string;
  originalText?: string;
  severity: FindingSeverity;
  measurements?: FindingMeasurement[];
}

export interface FindingMeasurement {
  label: string;
  value: number;
  unit: "mm" | "cm" | "ml" | "other";
  comparisonKey: string;
}

export interface MedicalTermDefinition {
  term: string;
  definition: string;
  whyItMatters?: string;
}

export interface DoctorQuestion {
  question: string;
  reason: string;
}

export interface ReportAnalysis {
  modality: ReportModality;
  summary: string;
  importantFindings: ImportantFinding[];
  medicalTerms: MedicalTermDefinition[];
  questionsForDoctor: DoctorQuestion[];
  confidenceDisclaimer: string;
  noDiagnosisDisclaimer: string;
}

export interface ReportRecord {
  id: string;
  userId: string;
  modality: ReportModality;
  sourceFilename: string;
  storagePath: string;
  reportDate: string | null;
  status: ReportStatus;
  createdAt: string;
  analysis?: ReportAnalysis | null;
}

export interface TimelineFinding {
  reportId: string;
  reportDate: string;
  label: string;
  comparisonKey: string;
  value: number;
  unit: string;
  bodyRegion?: string | null;
}

export interface TrendCardData {
  comparisonKey: string;
  label: string;
  bodyRegion?: string | null;
  unit: string;
  first: TimelineFinding;
  latest: TimelineFinding;
  delta: number;
  direction: "increased" | "decreased" | "stable";
  history: TimelineFinding[];
}

export interface UploadResult {
  reportId: string;
  status: ReportStatus;
  extractedText?: string;
  analysis?: ReportAnalysis;
  message?: string;
}
