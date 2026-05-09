import { CheckCircle2, Home, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OrderSuccessPage() {
  const { navigate } = useApp();

  return (
    <div className="flex flex-col h-full bg-white items-center justify-center px-8">
      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-emerald-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Order Placed!</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Your order has been successfully placed. You will receive a confirmation email shortly.</p>

      <div className="w-full p-4 bg-gray-50 rounded-2xl mb-8">
        <div className="flex items-center gap-3">
          <Package size={20} className="text-gray-500" />
          <div>
            <p className="text-xs text-gray-400">Order Number</p>
            <p className="text-sm font-bold text-gray-900">#MK-2026-8942</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('home')}
        className="w-full h-14 bg-[#3b82f6] text-white font-semibold rounded-full active:scale-[0.98] shadow-lg shadow-[#3b82f6]/25 flex items-center justify-center gap-2"
      >
        <Home size={18} />
        Back to Home
      </button>
    </div>
  );
}
