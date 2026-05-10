import { useState } from 'react';
import { ChevronLeft, Search, Filter, Package, Clock, CheckCircle2, Truck, XCircle, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const STATUSES = ['All', 'Pending', 'Confirmed', 'Shipping', 'Delivered'];

export default function OrdersMgmtPage() {
  const { goBack } = useApp();
  const [activeStatus, setActiveStatus] = useState('All');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="shrink-0 bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center active:scale-95">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Orders Management</h1>
      </header>

      {/* Status Tabs */}
      <div className="shrink-0 bg-white border-b border-gray-100 flex overflow-x-auto no-scrollbar px-4">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`shrink-0 px-4 py-3 text-xs font-bold transition-all relative ${activeStatus === status ? 'text-blue-600' : 'text-gray-400'}`}
          >
            {status}
            {activeStatus === status && <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {[
          { id: 'ORD-9921', customer: 'Sarah Ahmed', items: 2, total: '$145.00', status: 'Pending', time: '10 mins ago' },
          { id: 'ORD-9920', customer: 'John Smith', items: 1, total: '$89.00', status: 'Confirmed', time: '1 hour ago' },
          { id: 'ORD-9919', customer: 'Mike Ross', items: 3, total: '$210.50', status: 'Shipping', time: '3 hours ago' },
          { id: 'ORD-9918', customer: 'Emma Watson', items: 1, total: '$45.00', status: 'Delivered', time: 'Yesterday' },
        ].map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  order.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                  order.status === 'Confirmed' ? 'bg-blue-50 text-blue-600' :
                  order.status === 'Shipping' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {order.status === 'Pending' ? <Clock size={20} /> :
                   order.status === 'Confirmed' ? <CheckCircle2 size={20} /> :
                   order.status === 'Shipping' ? <Truck size={20} /> : <Package size={20} />}
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-900">{order.id}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{order.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-gray-900">{order.total}</p>
                <p className="text-[10px] text-gray-400 font-medium">{order.items} items</p>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                  <img src="/avatar1.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-gray-700">{order.customer}</span>
              </div>
              <button className="flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase tracking-wider">
                Details <ChevronRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
