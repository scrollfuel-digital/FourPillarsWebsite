import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface ToastContextType {
  toasts: Toast[];
  showToast: (options: { type?: ToastType; title?: string; message: string; duration?: number }) => string;
  removeToast: (id: string) => void;
  toast: {
    success: (message: string, title?: string, duration?: number) => string;
    error: (message: string, title?: string, duration?: number) => string;
    info: (message: string, title?: string, duration?: number) => string;
    warning: (message: string, title?: string, duration?: number) => string;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      type = 'info',
      title,
      message,
      duration = 4500,
    }: {
      type?: ToastType;
      title?: string;
      message: string;
      duration?: number;
    }) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const newToast: Toast = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    []
  );

  const toast = {
    success: (message: string, title = 'Success', duration = 4500) =>
      showToast({ type: 'success', title, message, duration }),
    error: (message: string, title = 'Error', duration = 5000) =>
      showToast({ type: 'error', title, message, duration }),
    info: (message: string, title = 'Information', duration = 4000) =>
      showToast({ type: 'info', title, message, duration }),
    warning: (message: string, title = 'Warning', duration = 4500) =>
      showToast({ type: 'warning', title, message, duration }),
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast, toast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm sm:max-w-md w-full px-4 sm:px-0 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="sync">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const duration = toast.duration ?? 4500;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getTheme = () => {
    switch (toast.type) {
      case 'success':
        return {
          border: 'border-emerald-500/40',
          bg: 'bg-slate-900/95',
          accent: 'bg-emerald-500',
          iconBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          titleColor: 'text-emerald-400',
          Icon: CheckCircle2,
        };
      case 'error':
        return {
          border: 'border-rose-500/40',
          bg: 'bg-slate-900/95',
          accent: 'bg-rose-500',
          iconBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          titleColor: 'text-rose-400',
          Icon: AlertCircle,
        };
      case 'warning':
        return {
          border: 'border-amber-500/40',
          bg: 'bg-slate-900/95',
          accent: 'bg-amber-500',
          iconBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          titleColor: 'text-amber-400',
          Icon: AlertTriangle,
        };
      case 'info':
      default:
        return {
          border: 'border-blue-500/40',
          bg: 'bg-slate-900/95',
          accent: 'bg-blue-500',
          iconBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
          titleColor: 'text-blue-400',
          Icon: Info,
        };
    }
  };

  const theme = getTheme();
  const IconComponent = theme.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.85, x: 40, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`pointer-events-auto relative overflow-hidden rounded-2xl border ${theme.border} ${theme.bg} p-4 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-md text-white`}
    >
      <div className="flex items-start gap-3.5">
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${theme.iconBg}`}>
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="flex-1 pr-2">
          {toast.title && (
            <h5 className={`text-xs font-bold font-serif tracking-wide uppercase ${theme.titleColor} mb-0.5`}>
              {toast.title}
            </h5>
          )}
          <p className="text-xs text-slate-200 leading-relaxed font-sans">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Dismiss toast message"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar animation */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
            className={`h-full ${theme.accent}`}
          />
        </div>
      )}
    </motion.div>
  );
}
