import { useState } from 'react';
import { Search, X, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, STORES } from '../data/mock';
import ProductCard from '../components/ProductCard';

const RECENT_SEARCHES = ['wireless headphones', 'leather bag', 'running shoes', 'smart watch'];
const POPULAR_SEARCHES = ['denim jacket', 'mechanical keyboard', 'sunglasses', 'earbuds', 'fitness tracker'];

export default function SearchPage() {
  const { toggleSearch, toggleFilterSheet, selectStore } = useApp();
  const [query, setQuery] = useState('');

  const results = query.length > 0
    ? PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  const storeResults = query.length > 0
    ? STORES.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <button onClick={toggleSearch} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands..."
            className="w-full h-11 pl-9 pr-9 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]/20"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>
        <button onClick={toggleFilterSheet} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <SlidersHorizontal size={16} className="text-gray-600" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {query.length === 0 ? (
          <div className="p-4">
            {/* Recent Searches */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {RECENT_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-2 bg-gray-100 rounded-full text-xs font-medium text-gray-600 active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Now</h3>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full text-xs font-medium text-gray-600 active:scale-95"
                  >
                    <span className="text-[#3b82f6] font-bold">{i + 1}</span>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-xs text-gray-400 mb-3">{results.length + storeResults.length} results for &quot;{query}&quot;</p>
            {storeResults.length > 0 && (
              <div className="mb-5">
                <h3 className="mb-3 text-sm font-black text-gray-900">Stores</h3>
                <div className="space-y-2">
                  {storeResults.map((store) => (
                    <button key={store.id} onClick={() => selectStore(store.id)} className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm">
                      <img src={store.avatar} alt={store.name} className="h-11 w-11 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-1 text-sm font-black text-gray-900">{store.name}</h4>
                        <p className="line-clamp-1 text-xs font-medium text-gray-500">{store.description}</p>
                      </div>
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-600">{store.rating}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {results.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {results.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : storeResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-sm text-gray-400">No products found</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
