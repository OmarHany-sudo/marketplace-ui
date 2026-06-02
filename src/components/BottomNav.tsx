import { Grid2X2, Home, ShoppingCart, Store, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TABS = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'stores', label: 'Stores', Icon: Store },
  { key: 'categories', label: 'Categories', Icon: Grid2X2 },
  { key: 'cart', label: 'Cart', Icon: ShoppingCart },
  { key: 'profile', label: 'Profile', Icon: User },
];

export default function BottomNav({ hidden = false }: { hidden?: boolean }) {
  const { state, setTab } = useApp();

  const hiddenScreens = [
    'product',
    'checkout',
    'checkout-success',
    'chat',
    'sell-form',
    'order-success',
    'reviews',
    'notifications',
    'search',
    'seller-dashboard',
    'dashboard',
    'admin-dashboard',
    'inventory',
    'orders-mgmt',
    'theme-mgmt',
    'wallet',
    'employees',
    'bulk-import',
    'reports',
    'finance',
    'users-mgmt',
    'stores-mgmt',
    'categories-mgmt',
    'banners-mgmt',
  ];
  if (hiddenScreens.includes(state.screen)) return null;

  return (
    <nav
      className={`absolute inset-x-0 bottom-0 z-50 h-[76px] border-t border-gray-100 bg-white/95 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-14px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden ${
        hidden ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex h-full items-start justify-around select-none">
      {TABS.map((t) => {
        const isActive = state.activeTab === t.key;
        const cartCount = t.key === 'cart' ? state.cart.reduce((count, item) => count + item.quantity, 0) : 0;

        return (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="relative flex h-14 w-16 flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-200 active:scale-95"
          >
            <span className={`relative flex h-8 w-12 items-center justify-center rounded-full transition-colors duration-200 ${isActive ? 'bg-blue-50' : ''}`}>
              <t.Icon
                size={22}
                strokeWidth={isActive ? 2.7 : 2}
                className={isActive ? 'text-blue-600' : 'text-gray-400'}
              />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-black leading-none text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </span>
            <span className={`text-[10px] leading-tight transition-colors ${isActive ? 'font-black text-blue-600' : 'font-bold text-gray-400'}`}>
              {t.label}
            </span>
            {isActive && (
              <span className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-blue-600" />
            )}
          </button>
        );
      })}
      </div>
    </nav>
  );
}
