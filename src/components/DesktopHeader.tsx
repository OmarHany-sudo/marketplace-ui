import { Bell, Globe2, Search, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DesktopHeader({ hidden = false }: { hidden?: boolean }) {
  const { state, navigate, setTab, toggleSearch, setLanguage } = useApp();
  const cartCount = state.cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header
      className={`app-top-nav hidden h-[72px] shrink-0 items-center justify-between border-b border-gray-200 bg-white/95 px-8 backdrop-blur-xl transition-all duration-300 ease-out lg:flex ${
        hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <button onClick={() => setTab('home')} className="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-100">
          <span className="text-2xl font-black italic leading-none text-white">M</span>
        </span>
        <span className="text-xl font-black tracking-tight text-gray-950">MARKET</span>
      </button>

      <nav className="flex items-center gap-1" aria-label="Primary desktop navigation">
        {[
          { label: 'Home', action: () => setTab('home'), active: state.activeTab === 'home' },
          { label: 'Categories', action: () => setTab('categories'), active: state.activeTab === 'categories' },
          { label: 'Stores', action: () => setTab('stores'), active: state.activeTab === 'stores' },
          { label: 'Messages', action: () => navigate('messages'), active: state.screen === 'messages' },
          { label: 'Sell', action: () => navigate('sell'), active: state.screen === 'sell' || state.screen === 'sell-form' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className={`rounded-xl px-4 py-2 text-sm font-black transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
              item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex min-w-[360px] items-center gap-3">
        <button
          onClick={toggleSearch}
          className="relative flex h-11 flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-left text-sm font-bold text-gray-400 transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        >
          <Search size={18} />
          Search products, stores, categories...
        </button>

        <button
          onClick={() => setLanguage(state.language === 'en' ? 'ar' : 'en')}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition-transform active:scale-95"
          aria-label="Toggle language"
        >
          <Globe2 size={19} />
        </button>
        <button
          onClick={() => navigate('notifications')}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition-transform active:scale-95"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <button
          onClick={() => setTab('cart')}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition-transform active:scale-95"
          aria-label="Cart"
        >
          <ShoppingCart size={19} />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
              {cartCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab('profile')}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-100 transition-transform active:scale-95"
          aria-label="Profile"
        >
          <User size={19} />
        </button>
      </div>
    </header>
  );
}
