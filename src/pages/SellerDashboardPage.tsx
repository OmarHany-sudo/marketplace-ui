import { LayoutDashboard, Package, ShoppingBag, BarChart3, Settings, Users, Plus, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const STATS = [
  { label: 'Total Sales', value: '$12,450', change: '+12.5%', up: true, icon: BarChart3, color: 'text-blue-600 bg-blue-50' },
  { label: 'New Orders', value: '24', change: '+4', up: true, icon: ShoppingBag, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Low Stock', value: '3', change: '-2', up: false, icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
  { label: 'Return Requests', value: '2', change: '0', up: true, icon: Package, color: 'text-rose-600 bg-rose-50' },
];

const RECENT_ORDERS = [
  { id: 'ORD-7721', customer: 'Ahmed Ali', status: 'Pending', amount: '$120.00', time: '2 mins ago' },
  { id: 'ORD-7720', customer: 'Sara Smith', status: 'Confirmed', amount: '$85.50', time: '15 mins ago' },
  { id: 'ORD-7719', customer: 'John Doe', status: 'Preparing', amount: '$210.00', time: '1 hour ago' },
];

export default function SellerDashboardPage() {
  const { navigate } = useApp();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="shrink-0 bg-white px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Merchant Dashboard</h1>
          <p className="text-xs text-gray-500">Welcome back, TechVault Store</p>
        </div>
        <button 
          onClick={() => navigate('sell-form')}
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 active:scale-95 transition-transform"
        >
          <Plus size={24} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={20} />
              </div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <div className="flex items-baseline justify-between mt-1">
                <h3 className="text-lg font-bold text-gray-900">{stat.value}</h3>
                <span className={`text-[10px] font-bold flex items-center ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-gray-900 px-1">Quick Management</h2>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => navigate('orders-mgmt')} className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100 active:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              <span className="text-[10px] font-semibold text-gray-700">Orders</span>
            </button>
            <button onClick={() => navigate('inventory')} className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100 active:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Package size={20} />
              </div>
              <span className="text-[10px] font-semibold text-gray-700">Inventory</span>
            </button>
            <button onClick={() => navigate('theme-mgmt')} className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100 active:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <Settings size={20} />
              </div>
              <span className="text-[10px] font-semibold text-gray-700">Theme</span>
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Recent Orders</h2>
            <button className="text-xs text-blue-600 font-semibold">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="px-4 py-3 flex items-center justify-between active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{order.id}</h4>
                    <p className="text-[10px] text-gray-500">{order.customer} • {order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900">{order.amount}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                    order.status === 'Confirmed' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Summary Chart Placeholder */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">Revenue Summary</h2>
            <select className="text-[10px] font-semibold bg-gray-50 border-none rounded-lg px-2 py-1">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-32 w-full bg-gray-50 rounded-xl flex items-end justify-around p-2 gap-1">
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm relative group">
                <div style={{ height: `${h}%` }} className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700" />
              </div>
            ))}
          </div>
          <div className="flex justify-around mt-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} className="text-[9px] text-gray-400 font-medium">{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
