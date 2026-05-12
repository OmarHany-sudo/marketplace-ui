import { useState, useRef } from 'react';
import { Search, Bell, ShoppingCart, Menu, ChevronRight, Smartphone, Shirt, Home, Dumbbell, BookOpen, Gamepad2, Car, Palette, MapPin, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES, PROMO_BANNERS, STORES } from '../data/mock';
import ProductCard from '../components/ProductCard';

const ICON_MAP: Record<string, React.ElementType> = { Smartphone, Shirt, Home, Dumbbell, BookOpen, Gamepad2, Car, Palette };

export default function HomePage() {
  const { selectStore, navigate } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  // Animation values
  // The hero image will stay fixed at the top, and content will scroll over it
  const heroOpacity = Math.max(0, 1 - scrollY / 200);
  
  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* Fixed Header (Top Bar) */}
      <header className="absolute top-0 left-0 right-0 h-16 px-4 flex items-center justify-between z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="flex items-center gap-3">
          <button className="p-2 -ml-2 text-gray-900 active:scale-90 transition-transform">
            <Menu size={24} strokeWidth={2.5} />
          </button>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              <span className="text-white font-black text-xl italic leading-none">M</span>
            </div>
            <span className="text-lg font-black text-gray-900 tracking-tight hidden xs:block">MARKET</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Expanded Search Icon (Left of icons) */}
          <button className="p-2 text-gray-900 active:scale-90 transition-transform">
            <Search size={22} strokeWidth={2.5} />
          </button>
          <button onClick={() => navigate('cart')} className="p-2 text-gray-900 relative active:scale-90 transition-transform">
            <ShoppingCart size={22} strokeWidth={2.5} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">2</span>
          </button>
          <button className="p-2 text-gray-900 relative active:scale-90 transition-transform">
            <Bell size={22} strokeWidth={2.5} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar pt-16"
      >
        {/* Hero Section (Fixed-like behavior: content scrolls over it) */}
        <div className="relative h-[280px] w-full overflow-hidden bg-gray-900">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              transform: `translateY(${scrollY * 0.5}px)`, // Parallax effect
              opacity: heroOpacity 
            }}
          >
            <img 
              src="/banner1.jpg" 
              alt="Hero" 
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          </div>

          {/* Search Bar with City Dropdown (Inside Hero, scrolls with content) */}
          <div className="absolute bottom-8 left-0 right-0 px-4 space-y-4">
            <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-2xl shadow-black/20">
              {/* City Dropdown (Right side of bar) */}
              <div className="flex-1 relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${searchQuery ? 'text-blue-600 scale-110' : 'text-gray-400'}`}>
                  <Search size={20} strokeWidth={3} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..." 
                  className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:ring-0"
                />
              </div>
              
              <div className="h-8 w-px bg-gray-100 mx-1" />
              
              <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-xl active:scale-95 transition-transform">
                <MapPin size={16} className="text-blue-600" />
                <span className="text-[11px] font-black text-gray-900 uppercase tracking-wider">New York</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area (White background, scrolls over hero) */}
        <div className="relative bg-white rounded-t-[32px] -mt-6 z-10 shadow-[0_-12px_40px_rgba(0,0,0,0.08)]">
          {/* Promo Banners */}
          <div className="px-4 pt-8 pb-6">
            <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
              {PROMO_BANNERS.map((b) => (
                <div key={b.id} className="snap-start shrink-0 w-[88%] rounded-[24px] overflow-hidden relative aspect-[21/10] shadow-xl shadow-blue-900/5">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Limited Offer</span>
                    <h3 className="text-white font-black text-xl leading-tight mb-1">{b.title}</h3>
                    <p className="text-white/70 text-xs font-bold">{b.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Stores (Featured Stores) - NOW FIRST */}
          <div className="px-4 pb-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex flex-col">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Featured Stores</h2>
                <div className="h-1 w-8 bg-blue-600 rounded-full mt-1" />
              </div>
              <button className="flex items-center gap-1 text-xs font-black text-blue-600 uppercase tracking-wider">
                Explore <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {STORES.map((store) => (
                <button
                  key={store.id}
                  onClick={() => selectStore(store.id)}
                  className="snap-start shrink-0 w-44 bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm active:scale-[0.98] transition-all hover:shadow-md text-left"
                >
                  <div className="h-20 relative">
                    <img src={store.cover} alt={store.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute -bottom-5 left-4 w-10 h-10 rounded-2xl border-4 border-white overflow-hidden bg-gray-100 shadow-md">
                      <img src={store.avatar} alt={store.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="pt-7 pb-4 px-4">
                    <h3 className="text-xs font-black text-gray-900 line-clamp-1">{store.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded-md">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-[10px] text-amber-700 font-black">{store.rating}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">2.4k Followers</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Categories - NOW SECOND */}
          <div className="px-4 pb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Categories</h2>
            </div>
            <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
              <button
                onClick={() => setActiveCategory('All')}
                className="flex flex-col items-center gap-3 min-w-[72px]"
              >
                <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center transition-all duration-300 ${activeCategory === 'All' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-110' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                  <Menu size={26} strokeWidth={2.5} />
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${activeCategory === 'All' ? 'text-blue-600' : 'text-gray-400'}`}>All</span>
              </button>
              {CATEGORIES.map((cat) => {
                const IconComp = ICON_MAP[cat.icon] || Smartphone;
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(isActive ? 'All' : cat.name)}
                    className="flex flex-col items-center gap-3 min-w-[72px]"
                  >
                    <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-110' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                      <IconComp size={26} strokeWidth={2.5} />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-wider ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products Grid */}
          <div className="px-4 pb-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Discover Products</h2>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <div className="w-2 h-2 rounded-full bg-gray-200" />
                <div className="w-2 h-2 rounded-full bg-gray-200" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
