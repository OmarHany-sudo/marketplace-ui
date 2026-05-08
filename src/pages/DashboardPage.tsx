import { ChevronLeft, TrendingUp, TrendingDown, Package, DollarSign, ShoppingBag, Eye, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DashboardPage() {
  const { goBack } = useApp();

  const stats = [
    { label: 'Total Revenue', value: '$12,450', change: '+12.5%', up: true, icon: DollarSign },
    { label: 'Total Orders', value: '284', change: '+8.2%', up: true, icon: ShoppingBag },
    { label: 'Products', value: '45', change: '+3', up: true, icon: Package },
    { label: 'Store Views', value: '3.2K', change: '-2.1%', up: false, icon: Eye },
  ];

  const recentOrders = [
    { id: '#ORD-001', product: 'AuraSound Pro Headphones', buyer: 'Sarah M.', amount: 149, status: 'completed' },
    { id: '#ORD-002', product: 'SwiftRunner Shoes', buyer: 'James K.', amount: 119, status: 'shipping' },
    { id: '#ORD-003', product: 'RGB Mechanical Keyboard', buyer: 'Emily R.', amount: 79, status: 'pending' },
    { id: '#ORD-004', product: 'FitTrack Pro Watch', buyer: 'Mike T.', amount: 199, status: 'completed' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="shrink-0 flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Seller Dashboard</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {/* Revenue Card */}
        <div className="p-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white">
          <p className="text-xs text-gray-400 font-medium">Total Revenue</p>
          <p className="text-3xl font-bold mt-1">$12,450.00</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-xs text-emerald-400 font-semibold">+12.5%</span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 bg-white rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
                  <stat.icon size={16} className="text-gray-600" />
                </div>
                <div className={`flex items-center gap-0.5 text-[10px] font-bold ${stat.up ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="flex gap-3">
            {['Add Product', 'View Analytics', 'Promote Store'].map((action) => (
              <button key={action} className="flex-1 p-3 bg-white rounded-2xl text-center active:scale-[0.98] transition-transform">
                <div className="w-10 h-10 rounded-xl bg-[#FFF0EF] flex items-center justify-center mx-auto mb-1.5">
                  <ArrowUpRight size={16} className="text-[#FD4D38]" />
                </div>
                <p className="text-[11px] font-semibold text-gray-900">{action}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Recent Orders</h3>
            <button className="text-xs text-[#FD4D38] font-semibold">View All</button>
          </div>
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 bg-white rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Package size={16} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">{order.id}</p>
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">{order.product}</p>
                  <p className="text-[10px] text-gray-400">{order.buyer}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">${order.amount}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : order.status === 'shipping' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="p-4 bg-white rounded-2xl">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Weekly Performance</h3>
          <div className="flex items-end justify-between h-24 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const heights = [40, 65, 45, 80, 55, 90, 70];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-[#FD4D38]/10 rounded-t-lg relative" style={{ height: `${heights[i]}%` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-[#FD4D38] rounded-t-lg" style={{ height: `${heights[i] * 0.6}%` }} />
                  </div>
                  <span className="text-[9px] text-gray-400">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
