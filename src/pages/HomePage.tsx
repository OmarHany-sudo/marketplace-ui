import { useEffect, useMemo, useRef, useState, type ElementType, type UIEvent } from 'react';
import {
  Bell,
  BookOpen,
  Car,
  ChevronDown,
  ChevronRight,
  Dumbbell,
  Gamepad2,
  Grid2X2,
  Home,
  MapPin,
  Menu,
  Palette,
  Search,
  Shirt,
  ShoppingCart,
  Smartphone,
  Star,
  Store,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS, PROMO_BANNERS, STORES } from '../data/mock';
import ProductCard from '../components/ProductCard';

const ICON_MAP: Record<string, ElementType> = {
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Car,
  Palette,
};

const DELIVERY_TIMES: Record<string, string> = {
  s1: '24-48 min',
  s2: 'Today',
  s3: '1-2 days',
};

export default function HomePage() {
  const { state, selectStore, navigate, toggleSearch, toggleMobileMenu, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const scrollRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const storesRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => [{ id: 'all', name: 'All', icon: 'Grid2X2' }, ...CATEGORIES], []);
  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);
  const visibleProducts = filtered.slice(0, visibleCount);
  const heroOpacity = Math.max(0, 1 - scrollY / 240);

  useEffect(() => {
    const target = state.screen === 'categories' ? categoriesRef.current : state.screen === 'stores' ? storesRef.current : null;
    if (!target) return;

    window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, [state.screen]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    setScrollY(event.currentTarget.scrollTop);
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      <header className="app-top-nav absolute left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-white/10 px-4 backdrop-blur-md transition-all duration-300 ease-out lg:hidden">
        <div className="flex items-center gap-3">
          <button onClick={toggleMobileMenu} className="-ml-2 rounded-full p-2 text-white transition-transform active:scale-90" aria-label="Open menu">
            <Menu size={24} strokeWidth={2.5} />
          </button>
          <button onClick={() => navigate('home')} className="flex items-center gap-1.5 rounded-full pr-2 transition-transform active:scale-95" aria-label="Go home">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-900/20">
              <span className="text-xl font-black italic leading-none text-white">M</span>
            </div>
            <span className="hidden text-lg font-black tracking-tight text-white drop-shadow xs:block">MARKET</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={toggleSearch} className="rounded-full bg-black/15 p-2 text-white backdrop-blur-md transition-transform active:scale-90" aria-label="Search">
            <Search size={22} strokeWidth={2.5} />
          </button>
          <button onClick={() => navigate('cart')} className="relative rounded-full bg-black/15 p-2 text-white backdrop-blur-md transition-transform active:scale-90" aria-label="Cart">
            <ShoppingCart size={22} strokeWidth={2.5} />
            {state.cart.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[8px] font-black text-white ring-2 ring-white">
                {state.cart.reduce((count, item) => count + item.quantity, 0)}
              </span>
            )}
          </button>
          <button onClick={() => navigate('notifications')} className="relative rounded-full bg-black/15 p-2 text-white backdrop-blur-md transition-transform active:scale-90" aria-label="Notifications">
            <Bell size={22} strokeWidth={2.5} />
            <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
          </button>
        </div>
      </header>

      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto overscroll-contain no-scrollbar">
        <section className="relative h-[330px] w-full overflow-hidden bg-gray-950 lg:h-[420px]">
          <div
            className="absolute inset-0"
            style={{
              opacity: heroOpacity,
              transform: `translateY(${scrollY * 0.28}px) scale(1.05)`,
            }}
          >
            <img src="/banner1.jpg" alt="Marketplace hero" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/70" />
          </div>

          <div className="absolute bottom-7 left-0 right-0 px-4">
            <div className="mb-4 max-w-[290px]">
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-blue-200">June Picks</p>
              <h1 className="text-3xl font-black leading-[0.95] tracking-tight text-white">Shop local finds without slowing down.</h1>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-2xl shadow-black/20">
              <div className="relative flex-1">
                <Search
                  size={20}
                  strokeWidth={3}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    searchQuery ? 'scale-110 text-blue-600' : 'text-gray-400'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onFocus={() => {
                    if (!state.showSearch) toggleSearch();
                  }}
                  placeholder="Search for products..."
                  className="h-12 w-full border-none bg-transparent pl-12 pr-2 text-sm font-bold text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
                />
              </div>

              <div className="mx-1 h-8 w-px bg-gray-100" />

              <button onClick={() => showToast('Location selector opened')} className="flex h-11 items-center gap-1.5 rounded-xl bg-gray-50 px-3 transition-transform active:scale-95">
                <MapPin size={16} className="text-blue-600" />
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-900">New York</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
        </section>

        <div className="relative bg-white lg:bg-gray-50">
          <section ref={categoriesRef} className="scroll-mt-4 px-4 pb-7 pt-5 lg:mx-auto lg:max-w-7xl lg:px-8 lg:pt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight text-gray-900">Categories</h2>
                <div className="mt-1 h-1 w-8 rounded-full bg-blue-600" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">Swipe</span>
            </div>

            <div data-swipe-home-ignore="true" className="grid auto-cols-[76px] grid-flow-col grid-rows-2 gap-x-3 gap-y-4 overflow-x-auto overscroll-x-contain pb-2 no-scrollbar snap-x snap-mandatory lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-4 lg:grid-rows-none lg:gap-4 lg:overflow-visible xl:grid-cols-6">
              {categories.map((cat) => {
                const IconComp = cat.icon === 'Grid2X2' ? Grid2X2 : ICON_MAP[cat.icon] || Smartphone;
                const isActive = activeCategory === cat.name;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(isActive ? 'All' : cat.name);
                      setVisibleCount(8);
                    }}
                    className="snap-start flex min-h-[96px] flex-col items-center gap-2 rounded-2xl transition-transform active:scale-95"
                  >
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-[22px] transition-all duration-300 ${
                        isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-gray-50 text-gray-500'
                      }`}
                    >
                      <IconComp size={25} strokeWidth={2.5} />
                    </span>
                    <span className={`max-w-[72px] text-center text-[10px] font-black uppercase leading-tight tracking-wide ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section ref={storesRef} className="scroll-mt-4 px-4 pb-8 lg:mx-auto lg:max-w-7xl lg:px-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight text-gray-900">Featured Stores</h2>
                <div className="mt-1 h-1 w-8 rounded-full bg-blue-600" />
              </div>
              <button onClick={() => navigate('stores')} className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-blue-600">
                Explore <ChevronRight size={16} />
              </button>
            </div>

            <div data-swipe-home-ignore="true" className="flex gap-4 overflow-x-auto overscroll-x-contain pb-2 no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible">
              {STORES.map((store) => (
                <article
                  key={store.id}
                  className="snap-start w-[78%] shrink-0 overflow-hidden rounded-[24px] border border-gray-100 bg-white text-left shadow-sm transition-all duration-300 active:scale-[0.98] lg:w-full lg:hover:-translate-y-1 lg:hover:shadow-xl"
                >
                  <button onClick={() => selectStore(store.id)} className="relative block h-32 w-full text-left">
                    <img src={store.cover} alt={store.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/50" />
                    <img src={store.avatar} alt="" className="absolute bottom-3 left-3 h-12 w-12 rounded-2xl border-2 border-white object-cover shadow-lg" />
                  </button>
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <button onClick={() => selectStore(store.id)} className="min-w-0 text-left">
                        <h3 className="line-clamp-1 text-base font-black text-gray-900">{store.name}</h3>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-black text-amber-700">
                            <Star size={12} className="fill-amber-400 text-amber-400" /> {store.rating}
                          </span>
                          <span className="text-[11px] font-bold text-blue-600">{DELIVERY_TIMES[store.id] ?? 'Today'}</span>
                        </div>
                      </button>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          showToast(`${store.name} followed`);
                        }}
                        className="rounded-full bg-blue-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white transition-transform active:scale-95"
                      >
                        Follow
                      </button>
                    </div>
                    <p className="line-clamp-2 text-xs font-medium leading-relaxed text-gray-500">{store.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="px-4 pb-7 lg:mx-auto lg:max-w-7xl lg:px-8">
            <div data-swipe-home-ignore="true" className="flex gap-4 overflow-x-auto overscroll-x-contain no-scrollbar snap-x snap-mandatory">
              {PROMO_BANNERS.map((banner) => (
                <div key={banner.id} className="snap-start relative aspect-[21/10] w-[88%] shrink-0 overflow-hidden rounded-[24px] shadow-xl shadow-blue-900/5">
                  <img src={banner.image} alt={banner.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <span className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">Limited Offer</span>
                    <h3 className="text-xl font-black leading-tight text-white">{banner.title}</h3>
                    <p className="text-xs font-bold text-white/75">{banner.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="px-4 pb-28 lg:mx-auto lg:max-w-7xl lg:px-8 lg:pb-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight text-gray-900">Discover Products</h2>
                <p className="text-xs font-bold text-gray-400">{filtered.length} products available</p>
              </div>
              <Store size={20} className="text-blue-600" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {visibleCount < filtered.length && (
              <button
                onClick={() => {
                  setVisibleCount((count) => count + 4);
                  showToast('More products loaded');
                }}
                className="mt-6 h-12 w-full rounded-2xl bg-gray-950 text-sm font-black text-white transition-transform active:scale-[0.98] md:mx-auto md:block md:max-w-sm"
              >
                Load More
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
