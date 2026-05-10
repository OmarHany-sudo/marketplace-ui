import { useState } from 'react';
import { ChevronLeft, Palette, Image as ImageIcon, Type, Layout, Check, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ThemeMgmtPage() {
  const { goBack, showToast } = useApp();
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');

  const handleSave = () => {
    showToast('Theme settings saved!');
    goBack();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="shrink-0 bg-white px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center active:scale-95">
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <h1 className="text-xl font-black text-gray-900">Store Theme</h1>
        </div>
        <button 
          onClick={handleSave}
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100 active:scale-95 transition-transform"
        >
          <Save size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        {/* Color Palette */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Palette size={18} />
            </div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Primary Color</h3>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map((color) => (
              <button
                key={color}
                onClick={() => setPrimaryColor(color)}
                className="aspect-square rounded-2xl flex items-center justify-center transition-transform active:scale-90"
                style={{ backgroundColor: color }}
              >
                {primaryColor === color && <Check size={20} className="text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Banner Upload */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <ImageIcon size={18} />
            </div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Store Banner</h3>
          </div>
          <div className="aspect-[21/9] rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
            <ImageIcon size={24} className="text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400">Upload New Banner</span>
          </div>
        </div>

        {/* Font Selection */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Type size={18} />
            </div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Typography</h3>
          </div>
          <div className="space-y-2">
            {['Inter (Default)', 'SF Pro Display', 'Roboto', 'Montserrat'].map((font) => (
              <button key={font} className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 text-sm font-bold text-gray-700 active:bg-gray-100">
                {font}
                {font.includes('Default') && <Check size={16} className="text-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Card Style */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Layout size={18} />
            </div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Card Style</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-600 text-center">
              <span className="text-xs font-black text-blue-600">Modern Grid</span>
            </button>
            <button className="p-4 rounded-2xl bg-gray-50 border-2 border-transparent text-center">
              <span className="text-xs font-black text-gray-400">Classic List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
