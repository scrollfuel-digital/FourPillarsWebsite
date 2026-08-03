import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Inbox, MessageSquare, X } from "lucide-react";

type TabType = "inquiries" | "contacts" | "projects";

interface ViewDetailsModalProps {
  selectedItem: { type: TabType; data: any } | null;
  onClose: () => void;
}

export default function ViewDetailsModal({
  selectedItem,
  onClose,
}: ViewDetailsModalProps) {
  return (
    <AnimatePresence>
      {selectedItem && (
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
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                {selectedItem.type === "inquiries" ? (
                  <Inbox className="w-6 h-6" />
                ) : (
                  <MessageSquare className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {selectedItem.type === "inquiries"
                    ? "Lead Inquiry Record"
                    : "Contact Submission"}
                </h3>
                <p className="text-xs text-slate-400">
                  ID: {selectedItem.data._id || selectedItem.data.id}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Applicant / Sender
                </label>
                <p className="text-sm font-bold text-white mt-0.5">
                  {selectedItem.data.fullName || selectedItem.data.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-950/50 p-3 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Email
                  </label>
                  <p className="text-xs font-semibold text-blue-300 truncate">
                    {selectedItem.data.email}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Phone
                  </label>
                  <p className="text-xs font-semibold text-emerald-300">
                    {selectedItem.data.phone || "Not provided"}
                  </p>
                </div>
              </div>

              {selectedItem.data.project && (
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Target Project
                  </label>
                  <p className="text-xs font-bold text-amber-300 mt-0.5">
                    {selectedItem.data.project}
                  </p>
                </div>
              )}

              {selectedItem.data.subject && (
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Subject
                  </label>
                  <p className="text-xs font-bold text-purple-300 mt-0.5">
                    {selectedItem.data.subject}
                  </p>
                </div>
              )}

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Message Body
                </label>
                <div className="mt-1 p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedItem.data.message}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
