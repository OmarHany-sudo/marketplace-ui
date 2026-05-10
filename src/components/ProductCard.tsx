import { Heart, ShoppingCart, Store, Plus, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Product } from '../data/mock';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { selectProduct, selectStore, toggleWishlist, addToCart, state } = useApp();
  const isWished = state.wishlist.includes(product.id);
  const isInCart = state.cart.some(item => item.product.id === product.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-all duration-200 border border-gray-100 shadow-sm hover:shadow-md group">
      {/* Image Area */}
      <div 
        onClick={() => selectProduct(product.id)}
        className="aspect-[4/5] relative bg-gray-50 overflow-hidden cursor-pointer"
      >
        <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        
        {product.badge && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full tracking-wide shadow-sm">
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-90 transition-transform"
        >
          <Heart size={15} className={isWished ? 'text-blue-600 fill-blue-600' : 'text-gray-400'} />
        </button>

        {/* Quick Action Overlay */}
        <div className="absolute bottom-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${isInCart ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'}`}
          >
            {isInCart ? <Check size={16} /> : <Plus size={18} />}
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-3">
        {/* Store Info & Follow */}
        <div className="flex items-center justify-between mb-1.5">
          <button 
            onClick={(e) => { e.stopPropagation(); selectStore(product.sellerId || 's1'); }}
            className="flex items-center gap-1.5 group/store"
          >
            <div className="w-4 h-4 rounded-full bg-gray-100 overflow-hidden">
              <img src="/avatar1.jpg" alt="Store" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] text-gray-500 font-bold group-hover/store:text-blue-600 transition-colors">{product.sellerName}</span>
          </button>
          <button className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full active:scale-95 transition-transform">
            Follow
          </button>
        </div>

        <h3 
          onClick={() => selectProduct(product.id)}
          className="text-xs font-bold text-gray-900 line-clamp-1 cursor-pointer hover:text-blue-600 transition-colors"
        >
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-black text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-[9px] text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[9px] text-gray-500 font-bold">{product.rating}</span>
          </div>
        </div>

        {/* Action Buttons (Non-distracting) */}
        <div className="grid grid-cols-2 gap-1.5 mt-3">
          <button 
            onClick={() => selectProduct(product.id)}
            className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-50 text-[9px] font-bold text-gray-700 active:bg-gray-100 transition-colors"
          >
            <Store size={10} /> Store
          </button>
          <button 
            onClick={() => { addToCart(product); navigate('cart'); }}
            className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-600 text-[9px] font-bold text-white active:bg-blue-700 transition-colors shadow-sm shadow-blue-100"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
