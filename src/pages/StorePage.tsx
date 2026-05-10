import { useState } from 'react';
import { ChevronLeft, MessageCircle, UserCheck, Star, MapPin, Package, Users, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STORES, PRODUCTS } from '../data/mock';
import ProductCard from '../components/ProductCard';

export default function StorePage() {
  const { state, goBack, selectConversation } = useApp();
  const [following, setFollowing] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const store = STORES.find((s) => s.id === state.selectedStoreId);
  if (!store) return null;

  const storeProducts = PRODUCTS.filter((p) => p.sellerId === store.id);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  // Animation values
  const heroHeight = Math.max(100, 280 - scrollY);
  const heroOpacity = Math.max(0.6, 1 - scrollY / 200);

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header Bar (Fixed) */}
      <div className={`absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between z-50 transition-colors duration-300 ${scrollY > 150 ? 'bg-white shadow-sm' : ''}`}>
        <button 
          onClick={goBack} 
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${scrollY > 150 ? 'bg-gray-100 text-gray-800' : 'bg-black/20 backdrop-blur-md text-white'}`}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${scrollY > 150 ? 'bg-gray-100 text-gray-800' : 'bg-black/20 backdrop-blur-md text-white'}`}>
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Store Hero (Animated) */}
      <div 
        className="shrink-0 relative overflow-hidden"
        style={{ height: `${heroHeight}px`, opacity: heroOpacity }}
      >
        <img src={store.cover} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        
        {/* Store Profile Info Overlay */}
        <div className="absolute bottom-6 left-4 right-4 flex items-end gap-4">
          <div className="w-20 h-20 rounded-3xl border-4 border-white overflow-hidden bg-white shadow-xl shrink-0">
            <img src={store.avatar} alt={store.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-xl font-black text-white drop-shadow-md">{store.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                <Star size={10} className="text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-bold text-white">{store.rating}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                <Users size={10} className="text-white" />
                <span className="text-[10px] font-bold text-white">{store.followers.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar"
      >
        {/* Store Actions & Description */}
        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFollowing(!following)}
              className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl font-bold text-sm transition-all ${following ? 'bg-gray-100 text-gray-700' : 'bg-blue-600 text-white shadow-lg shadow-blue-100'}`}
            >
              <UserCheck size={18} />
              {following ? 'Following' : 'Follow Store'}
            </button>
            <button
              onClick={() => selectConversation('c1')}
              className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-2xl text-gray-700 active:scale-95 transition-transform"
            >
              <MessageCircle size={20} />
            </button>
          </div>

          {/* About & Reviews (Re-formatted) */}
          <div className="bg-gray-50 rounded-3xl p-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">About Store</h3>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{store.description}</p>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200/50">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-700">{store.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package size={14} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-700">{store.productsCount} Products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid (Directly) */}
        <div className="px-4 pb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-gray-900">Store Listings</h2>
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
              <span>{storeProducts.length} ITEMS</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {storeProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
