import { useState } from 'react';
import { ChevronLeft, MessageCircle, UserCheck, Star, MapPin, Package, Users, MoreHorizontal, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STORES, PRODUCTS } from '../data/mock';
import ProductCard from '../components/ProductCard';

export default function StorePage() {
  const { state, goBack, selectConversation, showToast } = useApp();
  const [following, setFollowing] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const store = STORES.find((s) => s.id === state.selectedStoreId);
  if (!store) return null;

  const storeProducts = PRODUCTS.filter((p) => p.sellerId === store.id);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  const handleFollow = () => {
    if (!following) {
      setShowCheck(true);
      setTimeout(() => {
        setShowCheck(false);
        setFollowing(true);
      }, 1000);
    } else {
      setFollowing(false);
    }
  };

  // Animation values
  const heroOpacity = Math.max(0, 1 - scrollY / 250);
  
  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* Header Bar (Fixed) */}
      <header className="app-top-nav absolute top-0 left-0 right-0 h-16 px-4 flex items-center justify-between z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50 transition-all duration-300 ease-out lg:hidden">
        <button 
          onClick={goBack} 
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <div className="flex items-center gap-2">
          <h2 className={`text-sm font-black text-gray-900 transition-opacity duration-300 ${scrollY > 180 ? 'opacity-100' : 'opacity-0'}`}>
            {store.name}
          </h2>
        </div>
        <button onClick={() => showToast('Store actions opened')} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
          <MoreHorizontal size={20} strokeWidth={2.5} />
        </button>
      </header>

      {/* Main Scrollable Content */}
      <div 
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar pt-16 lg:bg-gray-50 lg:pt-0"
      >
        {/* Store Hero (Fixed-like behavior) */}
        <div className="relative h-[240px] w-full overflow-hidden bg-gray-900 lg:h-[320px]">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              transform: `translateY(${scrollY * 0.5}px)`, // Parallax
              opacity: heroOpacity 
            }}
          >
            <img src={store.cover} alt={store.name} className="w-full h-full object-cover scale-110" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          </div>
        </div>

        {/* Content Area (Starts below hero) */}
        <div className="relative bg-white z-10 min-h-full lg:bg-gray-50">
          {/* Store Branding & Details (Below Cover) */}
          <div className="px-6 pt-6 pb-4 flex flex-col gap-4 lg:mx-auto lg:max-w-7xl lg:-mt-16 lg:rounded-[32px] lg:bg-white lg:p-8 lg:shadow-sm lg:ring-1 lg:ring-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-[24px] border-2 border-gray-100 overflow-hidden bg-white shadow-lg shrink-0">
                <img src={store.avatar} alt={store.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">{store.name}</h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-[11px] font-black text-amber-700">{store.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-lg">
                    <Users size={12} className="text-blue-600" />
                    <span className="text-[11px] font-black text-blue-700">{store.followers.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Actions */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleFollow}
                className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                  showCheck ? 'bg-emerald-500 text-white' :
                  following ? 'bg-gray-100 text-gray-500' : 'bg-blue-600 text-white shadow-xl shadow-blue-100'
                }`}
              >
                {showCheck ? <Check size={18} strokeWidth={3} /> : <UserCheck size={18} strokeWidth={2.5} />}
                {showCheck ? 'Following' : following ? 'Unfollow' : 'Follow Store'}
              </button>
              <button
                onClick={() => selectConversation('c1')}
                className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-900 active:scale-95 transition-transform border border-gray-100"
              >
                <MessageCircle size={22} strokeWidth={2.5} />
              </button>
            </div>

            {/* About Store */}
            <div className="bg-gray-50/50 rounded-[28px] p-5 border border-gray-100 mt-2">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2.5">About Store</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">{store.description}</p>
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mt-5 pt-5 border-t border-gray-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <MapPin size={14} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-black text-gray-900">{store.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <Package size={14} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-black text-gray-900">{store.productsCount} Products</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="px-4 pb-28 mt-4 lg:mx-auto lg:max-w-7xl lg:px-8 lg:pb-12">
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex flex-col">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Store Listings</h2>
                <div className="h-1 w-8 bg-blue-600 rounded-full mt-1" />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{storeProducts.length} Items</span>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {storeProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
