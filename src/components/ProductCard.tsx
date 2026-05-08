import { Heart, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Product } from '../data/mock';

interface Props {
  product: Product;
  variant?: 'grid' | 'list';
}

export default function ProductCard({ product, variant = 'grid' }: Props) {
  const { selectProduct, toggleWishlist, state } = useApp();
  const isWished = state.wishlist.includes(product.id);

  if (variant === 'list') {
    return (
      <button
        onClick={() => selectProduct(product.id)}
        className="flex gap-3 p-3 bg-white rounded-2xl text-left active:scale-[0.98] transition-transform duration-150 w-full"
      >
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          {product.badge && (
            <span className="absolute top-1.5 left-1.5 bg-[#FD4D38] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">{product.title}</h3>
          <p className="text-lg font-bold text-gray-900 mt-1">${product.price}</p>
          {product.originalPrice && (
            <p className="text-xs text-gray-400 line-through">${product.originalPrice}</p>
          )}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i < Math.round(product.rating) ? 'bg-amber-400' : 'bg-gray-200'}`} />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="shrink-0 self-start mt-1"
        >
          <Heart size={18} className={isWished ? 'text-[#FD4D38] fill-[#FD4D38]' : 'text-gray-300'} />
        </button>
      </button>
    );
  }

  return (
    <button
      onClick={() => selectProduct(product.id)}
      className="bg-white rounded-2xl overflow-hidden text-left active:scale-[0.96] transition-transform duration-150 shadow-sm hover:shadow-md w-full"
    >
      <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#FD4D38] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart size={16} className={isWished ? 'text-[#FD4D38] fill-[#FD4D38]' : 'text-gray-500'} />
        </button>
        {product.isHaggling && (
          <span className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <MessageCircle size={10} /> HAGGLE
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 font-medium">{product.sellerName}</p>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mt-0.5">{product.title}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[10px] text-gray-500 font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
