import {
  Building2,
  FileText,
  Globe2,
  HelpCircle,
  Info,
  LogIn,
  MapPinned,
  MessageCircle,
  Shield,
  Store,
  UserPlus,
  X,
} from 'lucide-react';
import { useApp, type Screen } from '../context/AppContext';

const menuItems: Array<{ label: string; screen: Screen; icon: typeof LogIn }> = [
  { label: 'Login', screen: 'login', icon: LogIn },
  { label: 'Register as Merchant', screen: 'sell', icon: UserPlus },
  { label: 'Browse Stores', screen: 'stores', icon: Store },
  { label: 'Track Orders', screen: 'track-orders', icon: MapPinned },
  { label: 'Support Center', screen: 'support', icon: HelpCircle },
  { label: 'About Us', screen: 'about', icon: Info },
  { label: 'Contact Us', screen: 'contact', icon: MessageCircle },
  { label: 'Privacy Policy', screen: 'privacy', icon: Shield },
];

export default function MobileMenu() {
  const { state, navigate, closeMobileMenu, setLanguage } = useApp();

  return (
    <div
      className={`absolute inset-0 z-[90] lg:hidden ${state.showMobileMenu ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!state.showMobileMenu}
    >
      <button
        onClick={closeMobileMenu}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${state.showMobileMenu ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Close menu"
      />
      <aside
        className={`absolute bottom-0 left-0 top-0 flex w-[82%] max-w-[340px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          state.showMobileMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <button onClick={() => navigate('home')} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600">
              <span className="text-2xl font-black italic text-white">M</span>
            </span>
            <span className="text-lg font-black text-gray-950">MARKET</span>
          </button>
          <button onClick={closeMobileMenu} className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 no-scrollbar">
          <button
            onClick={() => setLanguage(state.language === 'en' ? 'ar' : 'en')}
            className="mb-5 flex w-full items-center justify-between rounded-2xl bg-blue-50 px-4 py-3 text-sm font-black text-blue-700"
          >
            <span className="flex items-center gap-2">
              <Globe2 size={18} />
              {state.language === 'en' ? 'English' : 'Arabic'}
            </span>
            <span>{state.language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.screen)}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-gray-800 transition-colors active:bg-gray-100"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                  <item.icon size={18} />
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={() => navigate('seller-dashboard')}
            className="flex w-full items-center gap-3 rounded-2xl bg-gray-950 px-4 py-3 text-left text-sm font-black text-white"
          >
            <Building2 size={18} />
            Merchant Dashboard
          </button>
          <button
            onClick={() => navigate('privacy')}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold text-gray-400"
          >
            <FileText size={14} />
            Policies & Terms
          </button>
        </div>
      </aside>
    </div>
  );
}
