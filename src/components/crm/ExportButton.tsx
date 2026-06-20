"use client";

import { useState } from "react";
import { Download } from "lucide-react";

interface ExportButtonProps {
  label?: string;
  filename?: string;
  fetchUrl: string;
}

export function ExportButton({
  label = "Export CSV",
  filename = "export.csv",
  fetchUrl,
}: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const downloadCSV = async (data: Record<string, unknown>[], keys: string[], headers: string[]) => {
    const csvRows: string[] = [headers.join(",")];
    for (const row of data) {
      const values = keys.map((key) => {
        const val = row[key];
        if (val === null || val === undefined) return "";
        const str = String(val);
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      });
      csvRows.push(values.join(","));
    }

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const json = await res.json();
      const data = json.data || json;

      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]);
        await downloadCSV(data, keys, keys);
      }
    } catch (e) {
      console.error("Gagal mengexport data:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
    >
      <Download className="w-4 h-4" />
      {loading ? "Mengekspor..." : label}
    </button>
  );
}
