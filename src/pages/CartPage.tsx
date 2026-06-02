import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/mock';

export default function CartPage() {
  const { state, goBack, navigate, removeFromCart, updateCartQty } = useApp();

  const subtotal = state.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (state.cart.length === 0) {
    return (
      <div className="flex flex-col h-full bg-white">
        <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Shopping Cart</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-24">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Your cart is empty</h2>
          <p className="text-sm text-gray-400 text-center mb-6">Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => navigate('home')}
            className="h-12 px-8 bg-[#3b82f6] text-white font-semibold rounded-full active:scale-[0.98] shadow-lg shadow-[#3b82f6]/25"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Shopping Cart</h1>
        <span className="ml-auto text-sm text-gray-400">{state.cart.length} items</span>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-6 lg:bg-gray-50 lg:p-8">
        <div className="lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-[1fr_360px] lg:gap-8">
        <div>
        {state.cart.map((item) => (
          <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-2xl mb-3 lg:bg-white lg:shadow-sm lg:ring-1 lg:ring-gray-100">
            <img src={item.product.image} alt={item.product.title} className="w-20 h-20 rounded-xl object-cover bg-gray-100 shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.product.title}</h3>
              <p className="text-base font-bold text-gray-900 mt-0.5">${item.product.price}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow-sm">
                  <button onClick={() => updateCartQty(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateCartQty(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`Remove ${item.product.title} from cart?`)) {
                      removeFromCart(item.product.id);
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center"
                >
                  <Trash2 size={14} className="text-blue-400" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Recommended */}
        <h3 className="text-base font-bold text-gray-900 mt-4 mb-3">You Might Also Like</h3>
        <div className="grid grid-cols-2 gap-3">
          {PRODUCTS.filter((p) => !state.cart.find((c) => c.product.id === p.id)).slice(0, 2).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        </div>

      {/* Checkout Summary */}
      <div className="shrink-0 p-4 pb-24 bg-white border-t border-gray-100 lg:sticky lg:top-8 lg:h-fit lg:rounded-[24px] lg:border lg:border-gray-100 lg:pb-4 lg:shadow-sm">
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span className={`font-medium ${shipping === 0 ? 'text-emerald-500' : 'text-gray-900'}`}>
              {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-100">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={() => navigate('checkout')}
          className="w-full h-14 bg-[#3b82f6] text-white font-semibold rounded-full active:scale-[0.98] transition-transform shadow-lg shadow-[#3b82f6]/25"
        >
          Proceed to Checkout
        </button>
      </div>
        </div>
      </div>
    </div>
  );
}
