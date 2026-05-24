import { appName, medicalDisclaimer } from "@/lib/constants";
import type { ReportRecord } from "@/types/report";

export async function createReportSummaryPdf(report: ReportRecord): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const margin = 48;
  let y = 730;

  const write = (text: string, size = 11, font = regular) => {
    const lines = wrapText(text, 86);
    lines.forEach((line) => {
      page.drawText(line, {
        x: margin,
        y,
        size,
        font,
        color: rgb(0.09, 0.13, 0.2)
      });
      y -= size + 8;
    });
  };

  page.drawText(appName, {
    x: margin,
    y,
    size: 22,
    font: bold,
    color: rgb(0.08, 0.27, 0.65)
  });
  y -= 34;

  write(`Report: ${report.sourceFilename}`, 12, bold);
  write(`Modality: ${report.modality.toUpperCase()}`, 10);
  y -= 8;

  if (report.analysis) {
    write("Summary", 14, bold);
    write(report.analysis.summary);
    y -= 8;

    write("Important Findings", 14, bold);
    report.analysis.importantFindings.slice(0, 8).forEach((finding) => {
      write(`${finding.title}: ${finding.plainEnglish}`);
    });
    y -= 8;

    write("Questions To Ask Your Doctor", 14, bold);
    report.analysis.questionsForDoctor.slice(0, 6).forEach((question) => {
      write(`${question.question} ${question.reason}`);
    });
  } else {
    write("No AI explanation has been generated for this report yet.");
  }

  y = Math.max(y - 12, 80);
  write(medicalDisclaimer, 9);

  return pdf.save();
}

function wrapText(text: string, maxChars: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines;
}
