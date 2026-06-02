import { useState } from 'react';
import { ChevronLeft, MapPin, CreditCard, Tag, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DELIVERY_OPTIONS } from '../data/mock';

export default function CheckoutPage() {
  const { state, goBack, navigate, clearCart, showToast } = useApp();
  const [selectedDelivery, setSelectedDelivery] = useState(DELIVERY_OPTIONS[0].id);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = state.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const delivery = DELIVERY_OPTIONS.find((d) => d.id === selectedDelivery);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + (delivery?.price || 0) - discount;

  const handlePlaceOrder = () => {
    clearCart();
    navigate('order-success');
    showToast('Order placed successfully!', 'success');
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setCouponApplied(true);
      showToast('Coupon applied!', 'success');
    } else {
      showToast('Invalid coupon code', 'error');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Checkout</h1>
        <span className="ml-auto text-sm text-gray-400">{state.cart.length} items</span>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 lg:bg-gray-50 lg:p-8">
        <div className="lg:mx-auto lg:grid lg:max-w-5xl lg:grid-cols-[1fr_360px] lg:gap-8">
        <div className="space-y-4">
        {/* Delivery Address */}
        <div className="p-4 bg-gray-50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#3b82f6]" />
              <h3 className="text-sm font-semibold text-gray-900">Delivery Address</h3>
            </div>
            <button onClick={() => showToast('Address editor opened')} className="text-xs text-[#3b82f6] font-semibold">Edit</button>
          </div>
          <p className="text-sm text-gray-600">123 Main Street, Apt 4B</p>
          <p className="text-sm text-gray-600">New York, NY 10001</p>
        </div>

        {/* Delivery Options */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Delivery Options</h3>
          <div className="space-y-2">
            {DELIVERY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDelivery(opt.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-colors ${selectedDelivery === opt.id ? 'border-[#3b82f6] bg-[#FFF0EF]' : 'border-gray-100 bg-white'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedDelivery === opt.id ? 'border-[#3b82f6]' : 'border-gray-300'}`}>
                  {selectedDelivery === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{opt.name}</p>
                  <p className="text-xs text-gray-400">{opt.estimated}</p>
                </div>
                <span className={`text-sm font-bold ${opt.price === 0 ? 'text-emerald-500' : 'text-gray-900'}`}>
                  {opt.price === 0 ? 'Free' : `$${opt.price.toFixed(2)}`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="p-4 bg-gray-50 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={16} className="text-[#3b82f6]" />
            <h3 className="text-sm font-semibold text-gray-900">Payment Method</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-gradient-to-r from-gray-700 to-gray-900 rounded-md" />
            <div>
              <p className="text-sm font-medium text-gray-900">**** **** **** 4242</p>
              <p className="text-xs text-gray-400">Expires 12/26</p>
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag size={16} className="text-[#3b82f6]" />
            <h3 className="text-sm font-semibold text-gray-900">Coupon Code</h3>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter code (try SAVE10)"
              className="flex-1 h-11 px-4 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]/20"
            />
            <button
              onClick={applyCoupon}
              className="h-11 px-4 bg-gray-900 text-white font-semibold rounded-xl text-sm active:scale-95"
            >
              Apply
            </button>
          </div>
          {couponApplied && (
            <div className="flex items-center gap-1 mt-2 text-emerald-600 text-xs font-medium">
              <Check size={12} /> 10% discount applied
            </div>
          )}
        </div>

        </div>
        {/* Order Summary */}
        <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span className="text-gray-900">${(delivery?.price || 0).toFixed(2)}</span>
          </div>
          {couponApplied && (
            <div className="flex justify-between text-sm">
              <span className="text-emerald-600">Discount</span>
              <span className="text-emerald-600">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
        </div>
      </div>

      {/* Place Order */}
      <div className="shrink-0 p-4 bg-white border-t border-gray-100 lg:px-8">
        <button
          onClick={handlePlaceOrder}
          className="w-full h-14 bg-[#3b82f6] text-white font-semibold rounded-full active:scale-[0.98] transition-transform shadow-lg shadow-[#3b82f6]/25"
        >
          Place Order - ${total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
