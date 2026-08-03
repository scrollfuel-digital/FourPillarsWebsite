import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle } from "lucide-react";

type TabType = "inquiries" | "contacts" | "projects";

interface DeleteConfirmModalProps {
  deleteConfirmation: { type: TabType; id: string; title: string } | null;
  onCancel: () => void;
  onConfirm: (type: TabType, id: string) => void;
}

export default function DeleteConfirmModal({
  deleteConfirmation,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <AnimatePresence>
      {deleteConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Confirm Deletion
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete{" "}
                <span className="text-rose-300 font-semibold">
                  "{deleteConfirmation.title}"
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onCancel}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  onConfirm(deleteConfirmation.type, deleteConfirmation.id)
                }
                className="w-1/2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
