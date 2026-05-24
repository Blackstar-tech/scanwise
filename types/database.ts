import type { ReportModality, ReportStatus } from "@/types/report";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string | null;
          full_name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      reports: {
        Row: {
          id: string;
          user_id: string;
          modality: ReportModality;
          source_filename: string;
          storage_path: string;
          report_date: string | null;
          raw_text: string | null;
          status: ReportStatus;
          encryption_key_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          modality: ReportModality;
          source_filename: string;
          storage_path: string;
          report_date?: string | null;
          raw_text?: string | null;
          status?: ReportStatus;
          encryption_key_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          modality?: ReportModality;
          source_filename?: string;
          storage_path?: string;
          report_date?: string | null;
          raw_text?: string | null;
          status?: ReportStatus;
          encryption_key_id?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      report_analysis: {
        Row: {
          id: string;
          report_id: string;
          user_id: string;
          analysis_json: unknown;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          user_id: string;
          analysis_json: unknown;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          analysis_json?: unknown;
          updated_at?: string;
        };
        Relationships: [];
      };
      report_findings: {
        Row: {
          id: string;
          report_id: string;
          user_id: string;
          label: string;
          comparison_key: string;
          body_region: string | null;
          measurement_value: number | null;
          measurement_unit: string | null;
          finding_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          user_id: string;
          label: string;
          comparison_key: string;
          body_region?: string | null;
          measurement_value?: number | null;
          measurement_unit?: string | null;
          finding_date: string;
          created_at?: string;
        };
        Update: {
          label?: string;
          comparison_key?: string;
          body_region?: string | null;
          measurement_value?: number | null;
          measurement_unit?: string | null;
          finding_date?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      report_modality: ReportModality;
      report_status: ReportStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
