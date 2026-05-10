import { ChevronLeft, Search, Filter, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mock';

export default function InventoryPage() {
  const { goBack } = useApp();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="shrink-0 bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center active:scale-95">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Inventory</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search inventory..." 
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
          <button className="w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600">
            <Filter size={18} />
          </button>
        </div>

        {/* Inventory List */}
        <div className="space-y-3">
          {PRODUCTS.slice(0, 6).map((p, i) => (
            <div key={p.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden shrink-0">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-gray-900 line-clamp-1">{p.title}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">SKU: TV-{1000 + i}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase font-bold">Stock</span>
                    <span className={`text-xs font-black ${i === 2 ? 'text-rose-500' : 'text-gray-900'}`}>
                      {i === 2 ? '3 Left' : '24 Units'}
                    </span>
                  </div>
                  <div className="w-px h-6 bg-gray-100" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase font-bold">Price</span>
                    <span className="text-xs font-black text-gray-900">${p.price}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-rose-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
