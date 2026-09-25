import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileCheck, ShieldCheck } from 'lucide-react';

interface UploadModalProps {
  docName: string | null;
  onClose: () => void;
  onSuccess: (docName: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  docName,
  onClose,
  onSuccess,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  if (!docName) return null;

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onSuccess(docName);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl z-10 border border-slate-200 overflow-hidden flex flex-col p-6 gap-6"
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Compliance Repository
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Upload {docName}
              </h3>
              <p className="text-xs text-slate-500">
                Attach valid PDF or scanned document to complete your BPP readiness verification.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSimulateUpload} className="flex flex-col gap-4">
            {/* Drag and Drop Zone */}
            <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-emerald-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-900">
                  {fileName ? fileName : 'Click to select or drag and drop document'}
                </span>
                <span className="text-[11px] text-slate-500">
                  Supports PDF, PNG, JPG (Max 15MB)
                </span>
              </div>

              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFileName(e.target.files[0].name);
                  }
                }}
                className="hidden"
                id="doc-file-input"
              />
              <label
                htmlFor="doc-file-input"
                className="mt-2 px-4 py-2 bg-white text-emerald-800 font-bold rounded-xl text-xs border border-emerald-200 shadow-xs cursor-pointer hover:bg-emerald-50"
              >
                Browse Files
              </label>
            </div>

            {/* Submit CTA */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 h-11 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUploading}
                className="px-6 h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
              >
                {isUploading ? (
                  <span>Verifying Document...</span>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    <span>Upload & Verify Document</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
