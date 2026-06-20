"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
  children?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  variant = "default",
  children,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      confirmBtnRef.current?.focus();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      if (open) onCancel();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-transparent open:flex open:items-center open:justify-center"
      onClick={(e) => {
        if (e.target === dialogRef.current) onCancel();
      }}
    >
      <div className="bg-white rounded-lg shadow-elevated border border-gray-300 w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 id="confirm-modal-title" className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onCancel}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p id="confirm-modal-message" className="text-sm text-gray-600 mb-6">{message}</p>
        {children}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmBtnRef}
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors ${
              variant === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-sage-500 hover:bg-sage-700"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}

interface RescheduleModalProps {
  open: boolean;
  currentDate: string;
  onConfirm: (newDate: string) => void;
  onCancel: () => void;
}

export function RescheduleModal({
  open,
  currentDate,
  onConfirm,
  onCancel,
}: RescheduleModalProps) {
  const [date, setDate] = useState(currentDate);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
      setDate(currentDate);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      dialogRef.current?.close();
    }
  }, [open, currentDate]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      if (open) onCancel();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-transparent open:flex open:items-center open:justify-center"
      onClick={(e) => {
        if (e.target === dialogRef.current) onCancel();
      }}
    >
      <div className="bg-white rounded-lg shadow-elevated border border-gray-300 w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 id="reschedule-modal-title" className="text-lg font-semibold text-gray-900">
            Jadwalkan Ulang
          </h2>
          <button
            onClick={onCancel}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Masukkan tanggal baru untuk reservasi ini:
        </p>
        <input
          ref={inputRef}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 mb-6"
          aria-label="Tanggal baru"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => date && onConfirm(date)}
            disabled={!date}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-sage-500 hover:bg-sage-700 disabled:opacity-50 transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </dialog>
  );
}
