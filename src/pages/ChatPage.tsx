import { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Send, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CONVERSATIONS } from '../data/mock';

export default function ChatPage() {
  const { state, goBack } = useApp();
  const [text, setText] = useState('');

  const conv = CONVERSATIONS.find((c) => c.id === state.selectedConversationId);
  if (!conv) return null;

  const handleSend = () => {
    if (!text.trim()) return;
    setText('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="shrink-0 flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 z-10">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <ChevronLeft size={20} />
        </button>
        <img src={conv.userAvatar} alt={conv.userName} className="w-9 h-9 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">{conv.userName}</h3>
          <p className="text-xs text-emerald-500">Online</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <MoreHorizontal size={18} className="text-gray-700" />
        </button>
      </header>

      {/* Product Preview */}
      {conv.productPreview && (
        <div className="shrink-0 mx-4 mt-3 p-3 bg-white rounded-2xl flex items-center gap-3 shadow-sm">
          <img src={conv.productPreview.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 font-medium">About this product</p>
            <p className="text-sm font-semibold text-gray-900 line-clamp-1">{conv.productPreview.title}</p>
          </div>
          <span className="text-sm font-bold text-[#FD4D38]">${conv.productPreview.price}</span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
        {conv.messages.map((msg) => {
          const isMe = msg.senderId === 'user';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${isMe ? 'bg-[#FD4D38] text-white rounded-br-md' : 'bg-white text-gray-900 rounded-bl-md shadow-sm'}`}>
                {msg.content}
                <p className={`text-[10px] mt-1 ${isMe ? 'text-white/60' : 'text-gray-400'}`}>{msg.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="shrink-0 flex items-center gap-2 p-4 bg-white border-t border-gray-100">
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 active:scale-95">
          <Plus size={18} className="text-gray-500" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="w-full h-11 pl-4 pr-4 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#FD4D38]/20"
          />
        </div>
        <button
          onClick={handleSend}
          className="w-10 h-10 rounded-full bg-[#FD4D38] flex items-center justify-center shrink-0 active:scale-90 transition-transform"
        >
          <Send size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}
