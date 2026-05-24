import React from 'react';
import { useToastStore } from '../../store/useToastStore';
import { Info, CheckCircle, AlertTriangle } from 'lucide-react';

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          info: <Info className="w-5 h-5 text-blue-500" />,
          success: <CheckCircle className="w-5 h-5 text-green-500" />,
          error: <AlertTriangle className="w-5 h-5 text-red-500" />
        };

        const bgColors = {
          info: "bg-surface-container-high border-blue-500/20",
          success: "bg-surface-container-high border-green-500/20",
          error: "bg-surface-container-high border-red-500/20"
        };

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-3 rounded-md border backdrop-blur-md shadow-lg pointer-events-auto transition-all duration-300 animate-[slideInToast_0.35s_ease-out_forwards] ${bgColors[toast.type]}`}
          >
            {icons[toast.type]}
            <span className="text-sm font-medium text-on-surface">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
