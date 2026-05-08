import { useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { state, hideToast } = useApp();

  useEffect(() => {
    if (state.toast) {
      const timer = setTimeout(hideToast, 2500);
      return () => clearTimeout(timer);
    }
  }, [state.toast, hideToast]);

  if (!state.toast) return null;

  const isSuccess = state.toast.type === 'success';

  return (
    <div className="absolute top-4 left-4 right-4 z-[70] flex justify-center animate-in slide-in-from-top-2 fade-in duration-300">
      <div className="bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-sm w-full">
        {isSuccess ? <CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> : <XCircle size={18} className="text-red-400 shrink-0" />}
        <span className="text-sm font-medium">{state.toast.message}</span>
      </div>
    </div>
  );
}
