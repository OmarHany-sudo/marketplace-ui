import { useState } from 'react';
import { X, ChevronRight, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mock';

export default function SellPage() {
  const { goBack, navigate } = useApp();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleSelectCategory = () => {
    navigate('sell-form');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">Choose Category</h1>
        <button onClick={goBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isExpanded = expandedCategory === cat.id;
          return (
            <div key={cat.id} className="border-b border-gray-50">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                className="w-full flex items-center justify-between px-4 py-4 text-left active:bg-gray-50"
              >
                <span className="text-sm font-semibold text-gray-900">{cat.name}</span>
                {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </button>
              {isExpanded && cat.subcategories && (
                <div className="px-4 pb-3">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleSelectCategory()}
                      className="w-full text-left py-2.5 px-3 text-sm text-gray-600 rounded-xl active:bg-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
