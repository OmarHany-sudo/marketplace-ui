import { ShieldCheck, Users, Store, ShoppingCart, AlertTriangle, CreditCard, BarChart3, Layers, Image as ImageIcon, Plus } from 'lucide-react';

const ADMIN_STATS = [
  { label: 'Total Revenue', value: '$142,850', change: '+8.2%', up: true, icon: CreditCard, color: 'text-blue-600 bg-blue-50' },
  { label: 'Active Merchants', value: '156', change: '+12', up: true, icon: Store, color: 'text-purple-600 bg-purple-50' },
  { label: 'Total Orders', value: '1,240', change: '+156', up: true, icon: ShoppingCart, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Complaints', value: '5', change: '-2', up: false, icon: AlertTriangle, color: 'text-rose-600 bg-rose-50' },
];

const ADMIN_SECTIONS = [
  { id: 'users', label: 'User Management', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { id: 'stores', label: 'Store Management', icon: Store, color: 'bg-purple-50 text-purple-600' },
  { id: 'finance', label: 'Financials', icon: CreditCard, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'categories', label: 'Categories', icon: Layers, color: 'bg-amber-50 text-amber-600' },
  { id: 'banners', label: 'Banners', icon: ImageIcon, color: 'bg-rose-50 text-rose-600' },
  { id: 'reports', label: 'Reports', icon: BarChart3, color: 'bg-indigo-50 text-indigo-600' },
];

export default function AdminDashboardPage() {
  // const { navigate } = useApp();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="shrink-0 bg-white px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Admin Central</h1>
            <p className="text-[10px] text-gray-500">Platform Overview & Control</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-95">
            <Plus size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-3">
          {ADMIN_STATS.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={18} />
              </div>
              <p className="text-[10px] text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-base font-bold text-gray-900 mt-0.5">{stat.value}</h3>
              <p className={`text-[9px] font-bold mt-1 ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change} <span className="text-gray-400 font-normal">vs last month</span>
              </p>
            </div>
          ))}
        </div>

        {/* Management Sections */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-gray-900 px-1">Platform Control</h2>
          <div className="grid grid-cols-3 gap-3">
            {ADMIN_SECTIONS.map((section) => (
              <button 
                key={section.id}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100 active:scale-95 transition-transform"
              >
                <div className={`w-12 h-12 rounded-2xl ${section.color} flex items-center justify-center shadow-sm`}>
                  <section.icon size={24} />
                </div>
                <span className="text-[9px] font-bold text-gray-700 text-center leading-tight">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">System Alerts</h2>
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">3</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex gap-3 p-3 bg-rose-50 rounded-xl border border-rose-100">
              <AlertTriangle className="text-rose-500 shrink-0" size={18} />
              <div>
                <h4 className="text-xs font-bold text-rose-900">Subscription Expiring</h4>
                <p className="text-[10px] text-rose-700 mt-0.5">12 stores have subscriptions expiring in the next 48 hours.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
              <Store className="text-amber-500 shrink-0" size={18} />
              <div>
                <h4 className="text-xs font-bold text-amber-900">New Store Requests</h4>
                <p className="text-[10px] text-amber-700 mt-0.5">4 merchants are waiting for store approval.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <h2 className="text-sm font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { user: 'Admin Sarah', action: 'Approved Store: FashionHub', time: '10 mins ago' },
              { user: 'System', action: 'Processed 42 monthly payouts', time: '1 hour ago' },
              { user: 'Admin Mike', action: 'Updated Category: Electronics', time: '3 hours ago' },
            ].map((act, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-900">{act.action}</p>
                  <p className="text-[10px] text-gray-500">{act.user} • {act.time}</p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
