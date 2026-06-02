import { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Heart, Star, MessageCircle, RotateCcw, Store, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, STORES, REVIEWS } from '../data/mock';
import ProductCard from '../components/ProductCard';

const VARIANTS = ['Standard', 'Premium', 'Limited'];

export default function ProductDetailPage() {
  const { state, goBack, toggleWishlist, addToCart, navigate, selectStore, selectConversation, showToast } = useApp();
  const [qty, setQty] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ productId: string; image: string } | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(VARIANTS[0]);

  const product = PRODUCTS.find((p) => p.id === state.selectedProductId);

  if (!product) return null;

  const isWished = state.wishlist.includes(product.id);
  const seller = STORES.find((s) => s.id === product.sellerId);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const activeImage = selectedImage?.productId === product.id ? selectedImage.image : product.image;
  const sameStoreProducts = PRODUCTS.filter((item) => item.sellerId === product.sellerId && item.id !== product.id).slice(0, 4);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  // Animation values
  const imageSize = Math.max(120, 400 - scrollY);
  const imageOpacity = Math.max(0.5, 1 - scrollY / 300);

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header Bar (Fixed) */}
      <div className={`app-top-nav absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between z-50 transition-all duration-300 ease-out lg:hidden ${scrollY > 100 ? 'bg-white shadow-sm' : ''}`}>
        <button 
          onClick={goBack} 
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${scrollY > 100 ? 'bg-gray-100 text-gray-800' : 'bg-black/20 backdrop-blur-md text-white'}`}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleWishlist(product.id)} 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${scrollY > 100 ? 'bg-gray-100 text-gray-800' : 'bg-black/20 backdrop-blur-md text-white'}`}
          >
            <Heart size={20} className={isWished ? 'fill-blue-500 text-blue-500' : ''} />
          </button>
          <button onClick={() => showToast('More product actions opened')} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${scrollY > 100 ? 'bg-gray-100 text-gray-800' : 'bg-black/20 backdrop-blur-md text-white'}`}>
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Hero Image (Animated) */}
      <div 
        className="shrink-0 relative bg-gray-50 overflow-hidden flex items-center justify-center lg:hidden"
        style={{ height: `${imageSize}px`, opacity: imageOpacity }}
      >
        <img src={activeImage} alt={product.title} className="w-full h-full object-cover" />
        {discount > 0 && (
          <span className="absolute bottom-4 left-4 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
            -{discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div 
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar lg:bg-gray-50"
      >
        <div className="p-5 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-8 lg:p-8">
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <div className="overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-gray-100">
                <img loading="lazy" src={activeImage} alt={product.title} className="aspect-square w-full object-cover" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {(product.images ?? [product.image]).slice(0, 3).map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage({ productId: product.id, image })}
                    className={`overflow-hidden rounded-2xl bg-white ring-2 transition-all hover:ring-blue-500 ${activeImage === image ? 'ring-blue-600' : 'ring-transparent'}`}
                  >
                    <img loading="lazy" src={image} alt={`${product.title} view ${index + 1}`} className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-none bg-white lg:rounded-[32px] lg:p-6 lg:shadow-sm lg:ring-1 lg:ring-gray-100">
          {/* Price & Title */}
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-base text-gray-400 line-through font-medium">${product.originalPrice}</span>
            )}
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-3">{product.title}</h1>

          {/* Rating & Stats */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold text-gray-900">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviewCount})</span>
            </div>
            <div className="w-px h-3 bg-gray-200" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{product.condition}</span>
            <div className="w-px h-3 bg-gray-200" />
            <span className="text-xs text-gray-500 font-medium">{product.location}</span>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-blue-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">Purchase Count</p>
              <p className="mt-1 text-lg font-black text-gray-950">{product.reviewCount + 120}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">Product Code</p>
              <p className="mt-1 text-lg font-black text-gray-950">SKU-{product.id.toUpperCase()}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-bold text-gray-900">Variants</h3>
            <div className="grid grid-cols-3 gap-2">
              {VARIANTS.map((variant) => (
                <button
                  key={variant}
                  onClick={() => {
                    setSelectedVariant(variant);
                    showToast(`${variant} variant selected`);
                  }}
                  className={`h-11 rounded-2xl text-xs font-black transition-colors ${
                    selectedVariant === variant ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Badge (Simplified) */}
          <div className="flex items-center gap-3 py-4 border-y border-gray-50 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <RotateCcw size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">30-Day Returns</h4>
              <p className="text-[10px] text-gray-500">Hassle-free exchange or refund</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Seller Card */}
          {seller && (
            <div className="bg-gray-50 rounded-3xl p-4 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <img src={seller.avatar} alt={seller.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900">{seller.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">Verified Merchant</p>
                </div>
                <button onClick={() => showToast(`${seller.name} followed`)} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-100 active:scale-95 transition-transform">
                  Follow
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => selectStore(seller.id)}
                  className="flex items-center justify-center gap-2 py-3 bg-white rounded-2xl text-xs font-bold text-gray-700 shadow-sm active:bg-gray-50"
                >
                  <Store size={16} /> Visit Store
                </button>
                <button onClick={() => selectConversation('c1')} className="flex items-center justify-center gap-2 py-3 bg-white rounded-2xl text-xs font-bold text-gray-700 shadow-sm active:bg-gray-50">
                  <MessageCircle size={16} /> Message
                </button>
              </div>
            </div>
          )}

          <div className="mb-8 hidden rounded-[24px] border border-gray-100 bg-gray-50 p-4 lg:block">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-black text-gray-900">Quantity</span>
              <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-lg font-black">-</button>
                <span className="w-5 text-center text-sm font-black">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-lg font-black">+</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { for(let i=0; i<qty; i++) addToCart(product); navigate('cart'); }}
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gray-950 text-sm font-black text-white transition-transform active:scale-[0.98]"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button
                onClick={() => { addToCart(product); navigate('checkout'); }}
                className="h-14 rounded-2xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-100 transition-transform active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Customer Reviews</h3>
              <button onClick={() => navigate('reviews')} className="text-xs text-blue-600 font-bold">See All</button>
            </div>
            <div className="space-y-4">
              {REVIEWS.slice(0, 2).map((r) => (
                <div key={r.id} className="bg-white border border-gray-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img src={r.avatar} alt={r.userName} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-xs font-bold text-gray-900">{r.userName}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          {sameStoreProducts.length > 0 && (
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">More from this store</h3>
                {seller && <button onClick={() => selectStore(seller.id)} className="text-xs font-bold text-blue-600">Visit Store</button>}
              </div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-2">
                {sameStoreProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="shrink-0 p-4 bg-white border-t border-gray-50 flex items-center gap-4 z-40 lg:hidden">
        <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-3 h-14">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-lg font-black text-gray-700 shadow-sm">-</button>
          <span className="text-sm font-black w-4 text-center">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-lg font-black text-gray-700 shadow-sm">+</button>
        </div>
        <button
          onClick={() => { for(let i=0; i<qty; i++) addToCart(product); navigate('cart'); }}
          className="flex-1 h-14 bg-gray-900 text-white font-bold rounded-2xl active:scale-[0.98] transition-transform text-sm flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} /> Add to Cart
        </button>
        <button
          onClick={() => { addToCart(product); navigate('checkout'); }}
          className="flex-1 h-14 bg-blue-600 text-white font-bold rounded-2xl active:scale-[0.98] transition-transform shadow-lg shadow-blue-100 text-sm"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
