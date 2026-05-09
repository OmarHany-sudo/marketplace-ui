import { Settings, ChevronRight, Package, Heart, MessageSquare, Star, HelpCircle, Shield, MapPin, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STORES } from '../data/mock';

export default function ProfilePage() {
  const { navigate, selectStore } = useApp();
  const myStore = STORES[0];

  const menuItems = [
    { icon: Package, label: 'My Orders', badge: '3 active', screen: 'home' as const },
    { icon: Heart, label: 'Wishlist', badge: null, screen: 'wishlist' as const },
    { icon: MessageSquare, label: 'Messages', badge: '2 new', screen: 'messages' as const },
    { icon: Star, label: 'My Reviews', badge: null, screen: 'reviews' as const },
    { icon: Shield, label: 'Security', badge: null, screen: 'home' as const },
    { icon: MapPin, label: 'Addresses', badge: null, screen: 'home' as const },
    { icon: HelpCircle, label: 'Help Center', badge: null, screen: 'home' as const },
    { icon: Settings, label: 'Settings', badge: null, screen: 'home' as const },
    { icon: LayoutDashboard, label: 'Merchant Dashboard', badge: 'Pro', screen: 'seller-dashboard' as const },
    { icon: ShieldCheck, label: 'Admin Dashboard', badge: 'Staff', screen: 'admin-dashboard' as const },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Profile Header */}
      <div className="shrink-0 px-4 pt-4 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
            <img src="/avatar1.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Alex Johnson</h1>
            <p className="text-sm text-gray-400">alex.johnson@email.com</p>
            <button
              onClick={() => selectStore(myStore.id)}
              className="mt-1 text-xs text-[#3b82f6] font-semibold"
            >
              View My Store
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 mt-4 p-4 bg-gray-50 rounded-2xl">
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-gray-900">12</p>
            <p className="text-[10px] text-gray-400">Orders</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-gray-900">8</p>
            <p className="text-[10px] text-gray-400">Reviews</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-gray-900">$1,240</p>
            <p className="text-[10px] text-gray-400">Spent</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-4 pb-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Account</h3>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {menuItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => navigate(item.screen)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50 ${idx < menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                  <item.icon size={16} className="text-gray-600" />
                </div>
                <span className="flex-1 text-sm font-medium text-gray-900">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-semibold text-[#3b82f6] bg-[#FFF0EF] px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Quick Link */}
        <div className="px-4 py-4">
          <button
            onClick={() => navigate('dashboard')}
            className="w-full p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-left active:scale-[0.99] transition-transform"
          >
            <p className="text-xs text-gray-400 font-medium">For Sellers</p>
            <p className="text-lg font-bold text-white mt-0.5">Seller Dashboard</p>
            <p className="text-xs text-gray-400 mt-1">Manage your store, analytics, and inventory</p>
          </button>
        </div>

        {/* Logout */}
        <div className="px-4 pb-8">
          <button className="w-full flex items-center justify-center gap-2 py-3 text-blue-500 text-sm font-semibold active:bg-blue-50 rounded-2xl">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
