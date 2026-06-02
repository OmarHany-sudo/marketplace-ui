import {
  BarChart3,
  CreditCard,
  Grid2X2,
  Heart,
  Layers,
  MessageCircle,
  Package,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  Users,
} from 'lucide-react';
import { useApp, type Screen } from '../context/AppContext';
import { CATEGORIES } from '../data/mock';

const shortcuts: Array<{ label: string; screen: Screen; icon: typeof Heart }> = [
  { label: 'Wishlist', screen: 'wishlist', icon: Heart },
  { label: 'Messages', screen: 'messages', icon: MessageCircle },
  { label: 'Merchant Dashboard', screen: 'seller-dashboard', icon: Store },
  { label: 'Orders', screen: 'orders-mgmt', icon: Package },
  { label: 'Inventory', screen: 'inventory', icon: Layers },
  { label: 'Wallet', screen: 'wallet', icon: CreditCard },
  { label: 'Employees', screen: 'employees', icon: Users },
  { label: 'Admin', screen: 'admin-dashboard', icon: ShieldCheck },
  { label: 'Reports', screen: 'reports', icon: BarChart3 },
  { label: 'Theme', screen: 'theme-mgmt', icon: Settings },
];

export default function DesktopSidebar() {
  const { state, navigate, setTab, toggleFilterSheet } = useApp();

  return (
    <aside className="hidden w-[272px] shrink-0 overflow-y-auto border-r border-gray-200 bg-white px-4 py-5 no-scrollbar lg:block">
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-[0.18em] text-gray-400">Categories</h2>
          <Grid2X2 size={16} className="text-blue-600" />
        </div>
        <div className="space-y-1">
          {CATEGORIES.slice(0, 8).map((category) => (
            <button
              key={category.id}
              onClick={() => setTab('categories')}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
            >
              {category.name}
              <span className="text-[10px] text-gray-400">{category.subcategories?.length ?? 0}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-gray-400">Filters</h2>
        <button
          onClick={toggleFilterSheet}
          className="flex w-full items-center gap-3 rounded-2xl bg-gray-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-gray-200 transition-transform active:scale-[0.98]"
        >
          <SlidersHorizontal size={17} />
          Open Filters
        </button>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-gray-400">Shortcuts</h2>
        <div className="space-y-1">
          {shortcuts.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.screen)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-colors ${
                state.screen === item.screen ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
