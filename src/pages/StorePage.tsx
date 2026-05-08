import { useState } from 'react';
import { ChevronLeft, Share2, MessageCircle, UserCheck, Star, MapPin, Package, Users, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STORES, PRODUCTS } from '../data/mock';
import ProductCard from '../components/ProductCard';

export default function StorePage() {
  const { state, goBack, selectConversation } = useApp();
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews' | 'about'>('listings');
  const [following, setFollowing] = useState(false);

  const store = STORES.find((s) => s.id === state.selectedStoreId);
  if (!store) return null;

  const storeProducts = PRODUCTS.filter((p) => p.sellerId === store.id);

  const handleMessage = () => {
    selectConversation('c1');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="relative shrink-0">
        <div className="h-32 bg-gray-200 overflow-hidden">
          <img src={store.cover} alt={store.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-95">
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-95">
            <Share2 size={18} className="text-gray-700" />
          </button>
        </div>
        <div className="absolute -bottom-10 left-4">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-md">
            <img src={store.avatar} alt={store.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Store Info */}
      <div className="pt-12 pb-3 px-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-gray-400" />
              <span className="text-xs text-gray-500">{store.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMessage}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-full active:scale-95 transition-transform"
            >
              <MessageCircle size={14} className="text-gray-700" />
              <span className="text-xs font-semibold text-gray-700">Message</span>
            </button>
            <button
              onClick={() => setFollowing(!following)}
              className={`flex items-center gap-1 px-3 py-2 rounded-full active:scale-95 transition-all text-xs font-semibold ${following ? 'bg-gray-100 text-gray-700' : 'bg-[#FD4D38] text-white'}`}
            >
              <UserCheck size={14} />
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-3 py-3 border-y border-gray-50">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-gray-900">{store.rating}</span>
            <span className="text-xs text-gray-400">({store.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-900">{store.followers.toLocaleString()}</span>
            <span className="text-xs text-gray-400">followers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Package size={14} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-900">{store.productsCount}</span>
            <span className="text-xs text-gray-400">products</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {store.badges.map((badge) => (
            <span key={badge} className="flex items-center gap-1 px-2 py-1 bg-[#FFF0EF] text-[#FD4D38] text-[10px] font-bold rounded-full">
              <Shield size={10} />
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="shrink-0 flex border-b border-gray-100 px-4">
        {(['listings', 'reviews', 'about'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors relative ${activeTab === tab ? 'text-[#FD4D38]' : 'text-gray-400'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#FD4D38] rounded-full" />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        {activeTab === 'listings' && (
          <div className="grid grid-cols-2 gap-3">
            {storeProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">Customer {i}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={10} className={j < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Great seller! Product was exactly as described and shipped quickly.</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'about' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">{store.description}</p>
            <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Joined</span>
                <span className="font-medium text-gray-900">{store.joinedDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location</span>
                <span className="font-medium text-gray-900">{store.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Response Time</span>
                <span className="font-medium text-gray-900">Under 1 hour</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
