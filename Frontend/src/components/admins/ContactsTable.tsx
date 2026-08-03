import React from "react";
import { MessageSquare, Mail, Phone, Eye, Trash2 } from "lucide-react";
import { ContactSubmission } from "../../types";

interface ContactsTableProps {
  contacts: ContactSubmission[];
  hasActiveFilters: boolean;
  onStatusChange: (id: string, status: string) => void;
  onView: (contact: ContactSubmission) => void;
  onDelete: (id: string, title: string) => void;
}

export default function ContactsTable({
  contacts,
  hasActiveFilters,
  onStatusChange,
  onView,
  onDelete,
}: ContactsTableProps) {
  if (contacts.length === 0) {
    return (
      <div className="py-16 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8">
        <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-white">
          No contact messages found
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {hasActiveFilters
            ? "Try adjusting search filters to find messages."
            : "No contact messages have been submitted yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4">Sender</th>
              <th className="py-3.5 px-4">Contact Info</th>
              <th className="py-3.5 px-4">Subject</th>
              <th className="py-3.5 px-4">Message</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Submitted</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {contacts.map((contact) => {
              const cntId = contact._id || contact.id || "";
              const dateStr = contact.createdAt;
              const status = contact.status || "New";

              return (
                <tr
                  key={cntId}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="py-3.5 px-4 font-bold text-white">
                    {contact.name}
                  </td>
                  <td className="py-3.5 px-4 space-y-0.5 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-purple-400" />
                      <span>{contact.email}</span>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Phone className="w-3 h-3 text-emerald-400" />
                        <span>{contact.phone}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-200">
                    {contact.subject || "General Inquiry"}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">
                    {contact.message}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={status}
                      onChange={(e) => onStatusChange(cntId, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border focus:outline-none cursor-pointer ${
                        status.toLowerCase() === "new"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : status.toLowerCase() === "in progress"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      }`}
                    >
                      <option
                        value="New"
                        className="bg-slate-900 text-amber-300"
                      >
                        New
                      </option>
                      <option
                        value="In Progress"
                        className="bg-slate-900 text-blue-300"
                      >
                        In Progress
                      </option>
                      <option
                        value="Closed"
                        className="bg-slate-900 text-emerald-300"
                      >
                        Closed
                      </option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                    {dateStr
                      ? new Date(dateStr).toLocaleDateString()
                      : "Recent"}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onView(contact)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(cntId, contact.name)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
