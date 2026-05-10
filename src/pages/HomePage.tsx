import { useState, useRef, useEffect } from 'react';
import { Search, Bell, ShoppingCart, Menu, ChevronRight, Smartphone, Shirt, Home, Dumbbell, BookOpen, Gamepad2, Car, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES, PROMO_BANNERS, STORES } from '../data/mock';
import ProductCard from '../components/ProductCard';

const ICON_MAP: Record<string, React.ElementType> = { Smartphone, Shirt, Home, Dumbbell, BookOpen, Gamepad2, Car, Palette };

export default function HomePage() {
  const { selectStore, navigate } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  // Animation values
  const heroHeight = Math.max(80, 240 - scrollY);
  const heroOpacity = Math.max(0, 1 - scrollY / 150);
  const searchTranslateY = Math.min(0, -scrollY + 140); // Moves search up to header
  const isSticky = scrollY > 140;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Hero & Sticky Header Area */}
      <div 
        className="shrink-0 relative overflow-hidden transition-all duration-75 ease-out z-40"
        style={{ height: `${heroHeight}px` }}
      >
        {/* Hero Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ opacity: heroOpacity }}
        >
          <img 
            src="/banner1.jpg" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
        </div>

        {/* Top Bar (Logo, Menu, Icons) */}
        <div className={`absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between transition-colors duration-300 ${isSticky ? 'bg-white shadow-sm' : ''}`}>
          <div className="flex items-center gap-3">
            {!isSticky && (
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl italic">M</span>
              </div>
            )}
            {isSticky && (
              <button className="p-2 -ml-2 text-gray-800">
                <Menu size={24} />
              </button>
            )}
          </div>

          {/* Search Bar Container (Moves into this space when sticky) */}
          <div className={`flex-1 mx-4 transition-all duration-300 ${isSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isSticky && (
              <button className="p-2 text-white">
                <Menu size={24} />
              </button>
            )}
            {isSticky && (
              <div className="flex items-center gap-1">
                <button className="p-2 text-gray-600 relative">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
                </button>
                <button onClick={() => navigate('cart')} className="p-2 text-gray-600">
                  <ShoppingCart size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Search & Icons (Visible in Hero) */}
        {!isSticky && (
          <div 
            className="absolute bottom-6 left-0 right-0 px-4 flex items-center gap-3"
            style={{ opacity: heroOpacity }}
          >
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Bell size={20} />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                className="w-full bg-white/20 backdrop-blur-md border-none rounded-full py-3 pl-12 pr-4 text-white placeholder:text-white/70 focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button onClick={() => navigate('cart')} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <ShoppingCart size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar"
      >
        {/* Promo Banners (Now under Hero) */}
        <div className="px-4 py-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {PROMO_BANNERS.map((b) => (
              <div key={b.id} className="snap-start shrink-0 w-[85%] rounded-2xl overflow-hidden relative aspect-[21/9] shadow-sm">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-white font-bold text-sm">{b.title}</h3>
                  <p className="text-white/80 text-[10px]">{b.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Categories</h2>
            <button className="text-xs text-blue-600 font-semibold">See All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveCategory('All')}
              className="flex flex-col items-center gap-2 min-w-[64px]"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeCategory === 'All' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-500'}`}>
                <Menu size={22} />
              </div>
              <span className={`text-[10px] font-bold ${activeCategory === 'All' ? 'text-blue-600' : 'text-gray-500'}`}>All</span>
            </button>
            {CATEGORIES.map((cat) => {
              const IconComp = ICON_MAP[cat.icon] || Smartphone;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? 'All' : cat.name)}
                  className="flex flex-col items-center gap-2 min-w-[64px]"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-500'}`}>
                    <IconComp size={22} />
                  </div>
                  <span className={`text-[10px] font-bold ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Popular Stores (Moved up) */}
        <div className="px-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Popular Stores</h2>
            <button className="text-xs text-blue-600 font-semibold flex items-center gap-0.5">See All <ChevronRight size={14} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {STORES.map((store) => (
              <button
                key={store.id}
                onClick={() => selectStore(store.id)}
                className="snap-start shrink-0 w-40 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:scale-[0.98] transition-transform text-left"
              >
                <div className="h-16 relative">
                  <img src={store.cover} alt={store.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute -bottom-4 left-3 w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-sm">
                    <img src={store.avatar} alt={store.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="pt-5 pb-3 px-3">
                  <h3 className="text-[11px] font-bold text-gray-900 line-clamp-1">{store.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-[9px] text-gray-500 font-medium">{store.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid (Directly after stores) */}
        <div className="px-4 pb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Discover Products</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
