import { useState } from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CONVERSATIONS } from '../data/mock';

export default function MessagesPage() {
  const { selectConversation } = useApp();
  const [search, setSearch] = useState('');

  const filtered = CONVERSATIONS.filter((c) =>
    c.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 px-4 pt-4 pb-3">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Messages</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full h-11 pl-9 pr-4 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FD4D38]/20"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {filtered.map((conv) => (
          <button
            key={conv.id}
            onClick={() => selectConversation(conv.id)}
            className="w-full flex items-start gap-3 px-4 py-3 text-left active:bg-gray-50 transition-colors border-b border-gray-50"
          >
            <div className="relative shrink-0">
              <img src={conv.userAvatar} alt={conv.userName} className="w-12 h-12 rounded-full object-cover bg-gray-100" />
              {conv.unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#FD4D38] rounded-full text-[9px] text-white font-bold flex items-center justify-center">
                  {conv.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">{conv.userName}</h3>
                <span className="text-[10px] text-gray-400">{conv.timestamp}</span>
              </div>
              {conv.productPreview && (
                <p className="text-[10px] text-[#FD4D38] font-medium mt-0.5">Re: {conv.productPreview.title}</p>
              )}
              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{conv.lastMessage}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
