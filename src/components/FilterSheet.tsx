import { X, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

const CONDITIONS = ['All', 'New', 'Used', 'Like New'];
const PRICE_RANGES = ['All', 'Under $50', '$50 - $100', '$100 - $200', 'Over $200'];
const SORT_OPTIONS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Newest First', 'Top Rated'];

export default function FilterSheet() {
  const { state, toggleFilterSheet } = useApp();
  const [condition, setCondition] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');

  if (!state.showFilterSheet) return null;

  return (
    <div className="absolute inset-0 z-[60] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={toggleFilterSheet} />
      <div className="relative bg-white rounded-t-3xl animate-in slide-in-from-bottom duration-300 max-h-[80%] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <button onClick={toggleFilterSheet} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${sortBy === opt ? 'bg-[#3b82f6] text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Condition</h3>
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCondition(c)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${condition === c ? 'bg-[#3b82f6] text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((p) => (
                <button
                  key={p}
                  onClick={() => setPriceRange(p)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${priceRange === p ? 'bg-[#3b82f6] text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white pb-8">
          <button
            onClick={toggleFilterSheet}
            className="w-full h-14 bg-[#3b82f6] text-white font-semibold rounded-full active:scale-[0.98] transition-transform shadow-lg shadow-[#3b82f6]/25"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
