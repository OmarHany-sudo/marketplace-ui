import { useState } from 'react';
import { Check, ChevronLeft, Image as ImageIcon, Layout, Palette, Save, Type } from 'lucide-react';
import { useApp } from '../context/AppContext';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
const FONTS = ['Inter (Default)', 'SF Pro Display', 'Roboto', 'Montserrat'];
const CARD_STYLES = ['Modern Grid', 'Classic List'];

export default function ThemeMgmtPage() {
  const { goBack, showToast } = useApp();
  const [primaryColor, setPrimaryColor] = useState(COLORS[0]);
  const [secondaryColor, setSecondaryColor] = useState(COLORS[1]);
  const [font, setFont] = useState(FONTS[0]);
  const [cardStyle, setCardStyle] = useState(CARD_STYLES[0]);

  const handleSave = () => {
    showToast('Theme settings saved!');
    goBack();
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <header className="shrink-0 border-b border-gray-100 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={goBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 transition-transform active:scale-95">
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <h1 className="text-xl font-black text-gray-900">Store Theme</h1>
          </div>
          <button onClick={handleSave} className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-100 transition-transform active:scale-95">
            <Save size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 no-scrollbar lg:p-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Palette size={18} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">Primary Color</h3>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {COLORS.map((color) => (
                <button key={color} onClick={() => setPrimaryColor(color)} className="flex aspect-square items-center justify-center rounded-2xl transition-transform active:scale-90" style={{ backgroundColor: color }}>
                  {primaryColor === color && <Check size={20} className="text-white" />}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Palette size={18} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">Secondary Color</h3>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {COLORS.map((color) => (
                <button key={color} onClick={() => setSecondaryColor(color)} className="flex aspect-square items-center justify-center rounded-2xl transition-transform active:scale-90" style={{ backgroundColor: color }}>
                  {secondaryColor === color && <Check size={20} className="text-white" />}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <ImageIcon size={18} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">Store Banner & Logo</h3>
            </div>
            <button onClick={() => showToast('Store banner image selected')} className="flex aspect-[21/9] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
              <ImageIcon size={24} className="text-gray-400" />
              <span className="text-[10px] font-bold text-gray-400">Upload New Banner</span>
            </button>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Type size={18} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">Typography</h3>
            </div>
            <div className="space-y-2">
              {FONTS.map((option) => (
                <button key={option} onClick={() => setFont(option)} className="flex w-full items-center justify-between rounded-xl bg-gray-50 p-3 text-sm font-bold text-gray-700 active:bg-gray-100">
                  {option}
                  {font === option && <Check size={16} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Layout size={18} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">Card Style & Product Order</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CARD_STYLES.map((style) => (
                <button
                  key={style}
                  onClick={() => setCardStyle(style)}
                  className={`rounded-2xl border-2 p-4 text-center transition-colors ${
                    cardStyle === style ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-transparent bg-gray-50 text-gray-400'
                  }`}
                >
                  <span className="text-xs font-black">{style}</span>
                </button>
              ))}
            </div>
            <button onClick={() => showToast('Product order arrangement saved')} className="mt-3 h-11 w-full rounded-2xl bg-gray-950 text-xs font-black uppercase tracking-wider text-white">
              Arrange Product Order
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
