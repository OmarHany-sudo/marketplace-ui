import { useState } from 'react';
import { ChevronLeft, MessageCircle, UserCheck, Star, MapPin, Package, Users, MoreHorizontal, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STORES, PRODUCTS } from '../data/mock';
import ProductCard from '../components/ProductCard';

export default function StorePage() {
  const { state, goBack, selectConversation } = useApp();
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
      <header className="absolute top-0 left-0 right-0 h-16 px-4 flex items-center justify-between z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
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
        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
          <MoreHorizontal size={20} strokeWidth={2.5} />
        </button>
      </header>

      {/* Main Scrollable Content */}
      <div 
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar pt-16"
      >
        {/* Store Hero (Fixed-like behavior) */}
        <div className="relative h-[260px] w-full overflow-hidden bg-gray-900">
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
          
          {/* Store Profile Info Overlay */}
          <div className="absolute bottom-8 left-4 right-4 flex items-end gap-4">
            <div className="w-22 h-22 rounded-[28px] border-4 border-white overflow-hidden bg-white shadow-2xl shrink-0">
              <img src={store.avatar} alt={store.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pb-1">
              <h1 className="text-2xl font-black text-white drop-shadow-lg tracking-tight">{store.name}</h1>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-black text-white">{store.rating}</span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <Users size={12} className="text-white" />
                  <span className="text-[11px] font-black text-white">{store.followers.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area (Scrolls over hero) */}
        <div className="relative bg-white rounded-t-[32px] -mt-6 z-10 shadow-[0_-12px_40px_rgba(0,0,0,0.08)]">
          {/* Store Actions & Description */}
          <div className="p-6 space-y-6">
            <div className="flex gap-3">
              <button
                onClick={handleFollow}
                className={`flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                  showCheck ? 'bg-emerald-500 text-white' :
                  following ? 'bg-gray-100 text-gray-500' : 'bg-blue-600 text-white shadow-xl shadow-blue-100'
                }`}
              >
                {showCheck ? <Check size={20} strokeWidth={3} /> : <UserCheck size={20} strokeWidth={2.5} />}
                {showCheck ? 'Following' : following ? 'Unfollow' : 'Follow Store'}
              </button>
              <button
                onClick={() => selectConversation('c1')}
                className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-900 active:scale-95 transition-transform border border-gray-100"
              >
                <MessageCircle size={24} strokeWidth={2.5} />
              </button>
            </div>

            {/* About Store */}
            <div className="bg-gray-50/50 rounded-[32px] p-6 border border-gray-100">
              <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">About Store</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">{store.description}</p>
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mt-6 pt-6 border-t border-gray-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <MapPin size={16} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-black text-gray-900">{store.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <Package size={16} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-black text-gray-900">{store.productsCount} Products</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="px-4 pb-20">
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex flex-col">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Store Listings</h2>
                <div className="h-1 w-8 bg-blue-600 rounded-full mt-1" />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{storeProducts.length} Items</span>
            </div>
            <div className="grid grid-cols-2 gap-5">
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
