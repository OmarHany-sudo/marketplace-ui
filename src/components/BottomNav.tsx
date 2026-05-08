import { Home, MessageCircle, Heart, PlusCircle, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TABS = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'messages', label: 'Messages', Icon: MessageCircle },
  { key: 'wishlist', label: 'Wishlist', Icon: Heart },
  { key: 'sell', label: 'Sell', Icon: PlusCircle },
  { key: 'profile', label: 'Profile', Icon: User },
];

export default function BottomNav() {
  const { state, setTab } = useApp();

  const hiddenScreens = ['product', 'store', 'cart', 'checkout', 'checkout-success', 'chat', 'sell-form', 'order-success', 'reviews', 'notifications', 'search'];
  if (hiddenScreens.includes(state.screen)) return null;

  return (
    <nav className="shrink-0 h-16 bg-white/90 backdrop-blur-md border-t border-gray-100 z-50 flex items-center justify-around select-none">
      {TABS.map((t) => {
        const isActive = state.activeTab === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex flex-col items-center justify-center gap-0.5 w-16 h-full relative"
          >
            <t.Icon
              size={24}
              strokeWidth={isActive ? 2.5 : 1.5}
              className={isActive ? 'text-[#FD4D38]' : 'text-gray-400'}
            />
            <span className={`text-[10px] leading-tight ${isActive ? 'font-semibold text-[#FD4D38]' : 'text-gray-400'}`}>
              {t.label}
            </span>
            {isActive && (
              <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FD4D38]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
