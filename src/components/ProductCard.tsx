import { useState, type MouseEvent } from 'react';
import { Check, Heart, ShoppingCart, Star, Store } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Product } from '../data/mock';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { selectProduct, selectStore, toggleWishlist, addToCart, state, showToast } = useApp();
  const [isFollowing, setIsFollowing] = useState(false);

  const isWished = state.wishlist.includes(product.id);
  const isInCart = state.cart.some((item) => item.product.id === product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const shortDescription = product.description.length > 92 ? `${product.description.slice(0, 89)}...` : product.description;

  const handleFollow = (event: MouseEvent) => {
    event.stopPropagation();
    setIsFollowing((current) => !current);
    showToast(isFollowing ? 'Store unfollowed' : 'Store followed');
  };

  const handleCart = (event: MouseEvent) => {
    event.stopPropagation();
    addToCart(product);
    showToast(isInCart ? 'Updated cart quantity' : 'Added to cart');
  };

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-gray-100 bg-white text-left shadow-sm transition-all duration-300 active:scale-[0.98] hover:shadow-xl lg:hover:-translate-y-1">
      <div onClick={() => selectProduct(product.id)} className="relative aspect-square cursor-pointer overflow-hidden bg-gray-50">
        <img loading="lazy" src={product.image} alt={product.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />

        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-black text-amber-700 shadow-sm backdrop-blur-md">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          {product.rating}
        </div>

        {discount > 0 && (
          <span className="absolute bottom-2 left-2 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-black text-white shadow-lg shadow-blue-900/20">
            {discount}% off
          </span>
        )}

        <button
          onClick={(event) => {
            event.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur-md transition-transform active:scale-90"
          aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} className={isWished ? 'fill-blue-600 text-blue-600' : 'text-gray-400'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3 lg:p-4">
        <div className="mb-3 flex items-center gap-2">
          <button
            onClick={(event) => {
              event.stopPropagation();
              selectStore(product.sellerId);
            }}
            className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
          >
            <img src={product.sellerAvatar} alt="" className="h-6 w-6 shrink-0 rounded-lg border border-blue-100 object-cover" />
            <span className="line-clamp-1 text-[11px] font-black text-blue-600">{product.sellerName}</span>
          </button>

          <button
            onClick={handleFollow}
            className={`h-7 shrink-0 rounded-full px-2.5 text-[9px] font-black uppercase tracking-wide transition-all active:scale-95 ${
              isFollowing ? 'bg-gray-100 text-gray-500' : 'bg-blue-600 text-white shadow-md shadow-blue-100'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>

        <button onClick={() => selectProduct(product.id)} className="flex flex-1 flex-col text-left">
          <span className="mb-1 inline-flex w-fit items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-gray-500">
            <Store size={10} /> {product.category}
          </span>
          <h3 className="line-clamp-2 min-h-[38px] text-sm font-black leading-snug text-gray-950 transition-colors group-hover:text-blue-600">
            {product.title}
          </h3>
          <p className="mt-1 line-clamp-2 min-h-[32px] text-[11px] font-medium leading-relaxed text-gray-500">{shortDescription}</p>
        </button>

        <div className="mt-3">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            {product.originalPrice && <span className="text-[11px] font-bold text-gray-400 line-through">${product.originalPrice}</span>}
            <span className="text-lg font-black leading-none text-gray-950">${product.price}</span>
            {discount > 0 && <span className="text-[10px] font-black text-blue-600">-{discount}%</span>}
          </div>

          <div className="grid grid-cols-[1fr_42px] gap-2">
            <button
              onClick={handleCart}
              className={`flex h-10 items-center justify-center gap-1.5 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all active:scale-95 ${
                isInCart ? 'border border-emerald-100 bg-emerald-50 text-emerald-600' : 'bg-gray-950 text-white shadow-lg shadow-gray-200'
              }`}
            >
              {isInCart ? <Check size={14} strokeWidth={3} /> : <ShoppingCart size={14} strokeWidth={3} />}
              {isInCart ? 'Added' : 'Add to cart'}
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`flex h-10 items-center justify-center rounded-xl border transition-all active:scale-95 ${
                isWished ? 'border-blue-100 bg-blue-50 text-blue-600' : 'border-gray-100 bg-gray-50 text-gray-500'
              }`}
              aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} className={isWished ? 'fill-blue-600' : ''} />
            </button>
          </div>
          <button
            onClick={() => selectProduct(product.id)}
            className="mt-2 flex h-10 w-full items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[10px] font-black uppercase tracking-wide text-blue-600 transition-transform active:scale-95"
          >
            View Product
          </button>
        </div>
      </div>
    </article>
  );
}
