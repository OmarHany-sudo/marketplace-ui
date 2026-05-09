import { useState } from 'react';
import { ChevronLeft, Share2, MoreHorizontal, Heart, Star, MessageCircle, Shield, Truck, RotateCcw, ChevronRight, Store } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, STORES, REVIEWS } from '../data/mock';

export default function ProductDetailPage() {
  const { state, goBack, toggleWishlist, addToCart, navigate, selectStore } = useApp();
  const [haggleOn, setHaggleOn] = useState(false);
  const [qty, setQty] = useState(1);

  const product = PRODUCTS.find((p) => p.id === state.selectedProductId);
  if (!product) return null;

  const isWished = state.wishlist.includes(product.id);
  const seller = STORES.find((s) => s.id === product.sellerId);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleBuyNow = () => {
    addToCart(product);
    navigate('checkout');
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    navigate('cart');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Gallery + Floating Header */}
      <div className="relative shrink-0">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-95">
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => toggleWishlist(product.id)} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-95">
              <Heart size={18} className={isWished ? 'text-[#3b82f6] fill-[#3b82f6]' : 'text-gray-700'} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-95">
              <Share2 size={18} className="text-gray-700" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-95">
              <MoreHorizontal size={18} className="text-gray-700" />
            </button>
          </div>
        </div>
        {discount > 0 && (
          <span className="absolute bottom-3 left-3 bg-[#3b82f6] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="p-4">
          {/* Price & Haggle */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>
            {product.isHaggling && (
              <button
                onClick={() => setHaggleOn(!haggleOn)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${haggleOn ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <MessageCircle size={13} />
                {haggleOn ? 'Haggle On' : 'Haggle'}
              </button>
            )}
          </div>

          {/* Title */}
          <h1 className="text-lg font-bold text-gray-900 leading-snug mb-2">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewCount} reviews)</span>
          </div>

          {/* Condition & Location */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${product.condition === 'new' ? 'bg-emerald-50 text-emerald-600' : product.condition === 'used' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
              {product.condition}
            </span>
            <span className="text-xs text-gray-400">{product.location}</span>
            <span className="text-xs text-gray-300">|</span>
            <span className="text-xs text-gray-400">{product.postedAt}</span>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 py-3 border-y border-gray-100 mb-4">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-500" />
              <span className="text-[10px] font-medium text-gray-600">Protected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck size={14} className="text-blue-500" />
              <span className="text-[10px] font-medium text-gray-600">Fast Shipping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw size={14} className="text-purple-500" />
              <span className="text-[10px] font-medium text-gray-600">30-Day Returns</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{product.description}</p>

          {/* Seller Card */}
          {seller && (
            <button
              onClick={() => selectStore(seller.id)}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-2xl text-left active:scale-[0.99] transition-transform mb-4"
            >
              <img src={seller.avatar} alt={seller.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">{seller.name}</h3>
                <div className="flex items-center gap-1">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-500">{seller.rating} ({seller.reviewCount})</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#3b82f6]">
                <Store size={14} />
                <span className="text-xs font-semibold">Visit Store</span>
                <ChevronRight size={14} />
              </div>
            </button>
          )}

          {/* Reviews Preview */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900">Reviews</h3>
              <button onClick={() => navigate('reviews')} className="text-xs text-[#3b82f6] font-semibold">See All</button>
            </div>
            {REVIEWS.slice(0, 2).map((r) => (
              <div key={r.id} className="flex gap-3 mb-3">
                <img src={r.avatar} alt={r.userName} className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{r.userName}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{r.text}</p>
                  <span className="text-[10px] text-gray-400">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="shrink-0 p-4 bg-white border-t border-gray-100 flex items-center gap-3 z-40">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 h-12">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm font-bold text-gray-700">-</button>
          <span className="text-sm font-semibold w-4 text-center">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm font-bold text-gray-700">+</button>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 h-12 bg-gray-900 text-white font-semibold rounded-full active:scale-[0.98] transition-transform text-sm"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 h-12 bg-[#3b82f6] text-white font-semibold rounded-full active:scale-[0.98] transition-transform shadow-lg shadow-[#3b82f6]/25 text-sm"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
