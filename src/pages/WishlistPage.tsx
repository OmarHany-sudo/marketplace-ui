import { Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mock';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { state, navigate } = useApp();
  const wishedProducts = PRODUCTS.filter((p) => state.wishlist.includes(p.id));

  if (wishedProducts.length === 0) {
    return (
      <div className="flex flex-col h-full bg-white">
        <header className="shrink-0 px-4 py-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">Wishlist</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-24">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Heart size={32} className="text-gray-300" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Your wishlist is empty</h2>
          <p className="text-sm text-gray-400 text-center mb-6">Save items you love and they'll appear here.</p>
          <button
            onClick={() => navigate('home')}
            className="h-12 px-8 bg-[#3b82f6] text-white font-semibold rounded-full active:scale-[0.98] shadow-lg shadow-[#3b82f6]/25 flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Wishlist</h1>
        <span className="text-sm text-gray-400">{wishedProducts.length} items</span>
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-28 lg:bg-gray-50 lg:p-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:mx-auto lg:max-w-7xl lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
          {wishedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
