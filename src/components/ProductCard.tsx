import { useState } from 'react';
import { Heart, Check, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Product } from '../data/mock';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { selectProduct, selectStore, toggleWishlist, addToCart, state, navigate, showToast } = useApp();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  
  const isWished = state.wishlist.includes(product.id);
  const isInCart = state.cart.some(item => item.product.id === product.id);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFollowing) {
      setShowCheck(true);
      setTimeout(() => {
        setShowCheck(false);
        setIsFollowing(true);
      }, 1000);
    } else {
      setIsFollowing(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] overflow-hidden text-left active:scale-[0.98] transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-xl group flex flex-col">
      {/* 1. Product Image */}
      <div 
        onClick={() => selectProduct(product.id)}
        className="aspect-square relative bg-gray-50 overflow-hidden cursor-pointer"
      >
        <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        
        {product.badge && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-wider shadow-lg shadow-blue-900/20 uppercase">
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-transform"
        >
          <Heart size={18} className={isWished ? 'text-blue-600 fill-blue-600' : 'text-gray-400'} />
        </button>
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-1">
        {/* 2. Store Info (Blue Bold) */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-lg bg-blue-50 overflow-hidden border border-blue-100">
            <img src="/avatar1.jpg" alt="Store" className="w-full h-full object-cover" />
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); selectStore(product.sellerId || 's1'); }}
            className="text-[11px] text-blue-600 font-black hover:underline decoration-2 underline-offset-2"
          >
            {product.sellerName}
          </button>
        </div>

        {/* 3. Follow Button */}
        <button 
          onClick={handleFollow}
          className={`w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 mb-3 flex items-center justify-center gap-2 ${
            showCheck ? 'bg-emerald-500 text-white' : 
            isFollowing ? 'bg-gray-100 text-gray-500' : 'bg-blue-600 text-white shadow-lg shadow-blue-100'
          }`}
        >
          {showCheck ? (
            <>
              <Check size={14} strokeWidth={3} /> Following
            </>
          ) : isFollowing ? (
            'Unfollow'
          ) : (
            'Follow'
          )}
        </button>

        {/* 4. Product Title */}
        <h3 
          onClick={() => selectProduct(product.id)}
          className="text-sm font-bold text-gray-900 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors leading-snug mb-2"
        >
          {product.title}
        </h3>

        {/* 5. Price */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="text-lg font-black text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-bold">${product.originalPrice}</span>
            )}
          </div>

          {/* 6. Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(product); showToast('Added to cart'); }}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                isInCart ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-50 text-gray-900 border border-gray-100 active:bg-gray-100'
              }`}
            >
              {isInCart ? <Check size={14} strokeWidth={3} /> : <ShoppingCart size={14} strokeWidth={3} />}
              {isInCart ? 'Added' : 'Cart'}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(product); navigate('cart'); }}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 text-[10px] font-black uppercase tracking-wider text-white active:scale-95 transition-transform shadow-lg shadow-blue-100"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
