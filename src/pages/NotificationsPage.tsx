import { ChevronLeft, Bell, ShoppingBag, MessageSquare, Tag, Star, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NOTIFICATIONS = [
  { id: 'n1', icon: ShoppingBag, title: 'Order Shipped', text: 'Your order #MK-8942 has been shipped and is on its way!', time: '2 min ago', color: 'text-blue-500 bg-blue-50' },
  { id: 'n2', icon: Tag, title: 'Special Offer', text: 'Get 20% off on all electronics this weekend only.', time: '1 hour ago', color: 'text-[#FD4D38] bg-[#FFF0EF]' },
  { id: 'n3', icon: MessageSquare, title: 'New Message', text: 'TechVault Store replied to your inquiry about the headphones.', time: '3 hours ago', color: 'text-emerald-500 bg-emerald-50' },
  { id: 'n4', icon: Star, title: 'Leave a Review', text: 'Your order has been delivered. Share your experience!', time: '1 day ago', color: 'text-amber-500 bg-amber-50' },
  { id: 'n5', icon: Info, title: 'Account Verified', text: 'Your seller account has been successfully verified.', time: '2 days ago', color: 'text-purple-500 bg-purple-50' },
  { id: 'n6', icon: Bell, title: 'Price Drop', text: 'An item in your wishlist is now 15% off!', time: '3 days ago', color: 'text-[#FD4D38] bg-[#FFF0EF]' },
];

export default function NotificationsPage() {
  const { goBack } = useApp();

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
        </div>
        <button className="text-xs text-[#FD4D38] font-semibold">Settings</button>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {NOTIFICATIONS.map((n) => (
          <button
            key={n.id}
            className="w-full flex items-start gap-3 px-4 py-3.5 text-left active:bg-gray-50 transition-colors border-b border-gray-50"
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${n.color}`}>
              <n.icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">{n.title}</h3>
                <span className="text-[10px] text-gray-400 shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.text}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
