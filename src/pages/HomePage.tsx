import { useState, useRef } from 'react';
import { Search, Bell, MapPin, SlidersHorizontal, ChevronRight, Smartphone, Shirt, Home, Dumbbell, BookOpen, Gamepad2, Car, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES, PROMO_BANNERS, STORES } from '../data/mock';
import ProductCard from '../components/ProductCard';

const ICON_MAP: Record<string, React.ElementType> = { Smartphone, Shirt, Home, Dumbbell, BookOpen, Gamepad2, Car, Palette };

export default function HomePage() {
  const { selectStore, toggleSearch, toggleFilterSheet } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [bannerIdx, setBannerIdx] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleBannerScroll = () => {
    if (!bannerRef.current) return;
    const scrollLeft = bannerRef.current.scrollLeft;
    const width = bannerRef.current.clientWidth;
    setBannerIdx(Math.round(scrollLeft / width));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="shrink-0 bg-white px-4 pt-3 pb-2 z-40">
        <div className="flex items-center justify-between mb-3">
          <button className="w-9 h-9 rounded-full overflow-hidden bg-gray-100">
            <img src="/avatar1.jpg" alt="Profile" className="w-full h-full object-cover" />
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-700">
            <MapPin size={14} className="text-[#FD4D38]" />
            <span className="font-medium">New York, NY</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={toggleSearch} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center active:scale-95">
              <Search size={18} className="text-gray-700" />
            </button>
            <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center relative active:scale-95">
              <Bell size={18} className="text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FD4D38] rounded-full text-[9px] text-white font-bold flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Promo Banners */}
        <div className="px-4 pt-2 pb-4">
          <div
            ref={bannerRef}
            onScroll={handleBannerScroll}
            className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          >
            {PROMO_BANNERS.map((b) => (
              <div key={b.id} className="snap-start shrink-0 w-[85%] rounded-2xl overflow-hidden relative aspect-[16/9]">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-lg">{b.title}</h3>
                  <p className="text-white/80 text-xs">{b.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            {PROMO_BANNERS.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === bannerIdx ? 'w-4 bg-[#FD4D38]' : 'w-1.5 bg-gray-300'}`} />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Categories</h2>
            <button className="text-xs text-[#FD4D38] font-semibold flex items-center gap-0.5">See All <ChevronRight size={14} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1">
            <button
              onClick={() => setActiveCategory('All')}
              className={`snap-start shrink-0 flex flex-col items-center gap-1.5 w-16 ${activeCategory === 'All' ? '' : ''}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${activeCategory === 'All' ? 'bg-[#FD4D38] text-white' : 'bg-gray-100 text-gray-500'}`}>
                <SlidersHorizontal size={22} />
              </div>
              <span className={`text-[10px] font-medium ${activeCategory === 'All' ? 'text-[#FD4D38]' : 'text-gray-500'}`}>All</span>
            </button>
            {CATEGORIES.map((cat) => {
              const IconComp = ICON_MAP[cat.icon] || Smartphone;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? 'All' : cat.name)}
                  className="snap-start shrink-0 flex flex-col items-center gap-1.5 w-16"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isActive ? 'bg-[#FD4D38] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <IconComp size={22} />
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? 'text-[#FD4D38]' : 'text-gray-500'}`}>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-4 pb-3 flex items-center gap-2">
          <button
            onClick={toggleFilterSheet}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-100 text-xs font-medium text-gray-600 active:scale-95 transition-transform"
          >
            <SlidersHorizontal size={13} />
            Filters
          </button>
          <button className="px-3 py-2 rounded-full bg-gray-100 text-xs font-medium text-gray-600 active:scale-95 transition-transform">
            Brand New
          </button>
          <button className="px-3 py-2 rounded-full bg-gray-100 text-xs font-medium text-gray-600 active:scale-95 transition-transform">
            Max. Price
          </button>
        </div>

        {/* Featured Section */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Featured</h2>
            <button className="text-xs text-[#FD4D38] font-semibold flex items-center gap-0.5">View All <ChevronRight size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filtered.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Trending Stores */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Trending Stores</h2>
            <button className="text-xs text-[#FD4D38] font-semibold flex items-center gap-0.5">See All <ChevronRight size={14} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1">
            {STORES.map((store) => (
              <button
                key={store.id}
                onClick={() => selectStore(store.id)}
                className="snap-start shrink-0 w-48 bg-white rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform text-left"
              >
                <div className="h-20 relative">
                  <img src={store.cover} alt={store.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute -bottom-5 left-3 w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                    <img src={store.avatar} alt={store.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="pt-6 pb-3 px-3">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{store.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < Math.round(store.rating) ? 'bg-amber-400' : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">{store.rating}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{store.productsCount} products</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended For You */}
        <div className="px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Recommended</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filtered.slice(4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
