import { useState } from 'react';
import { ChevronLeft, Camera, X, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mock';

export default function SellFormPage() {
  const { goBack, navigate, showToast } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [minOrder, setMinOrder] = useState(1);
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [variantStock, setVariantStock] = useState(12);
  const [variantPrice, setVariantPrice] = useState('');

  const handleCreate = () => {
    showToast('Product added successfully!');
    navigate('home');
  };

  const handleDraft = () => {
    showToast('Draft product saved');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 flex items-center gap-3 px-4 py-4 border-b border-gray-50">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center active:scale-95">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Add Product</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
        {/* Image Upload */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Product Photos</h3>
            <span className="text-[10px] font-bold text-gray-400">{images.length}/5</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => {
                if (images.length < 5) {
                  setImages([...images, `/product${images.length + 1}.jpg`]);
                  showToast('Photo attached');
                }
              }}
              className="shrink-0 w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 active:bg-gray-100 transition-colors"
            >
              <Camera size={24} className="text-gray-400" />
              <span className="text-[10px] font-bold text-gray-400">Add Photo</span>
            </button>
            {images.map((img, i) => (
              <div key={i} className="shrink-0 w-24 h-24 rounded-2xl overflow-hidden relative shadow-sm">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <X size={12} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-3">Product Title</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. iPhone 15 Pro Max"
            className="w-full h-14 px-5 bg-gray-50 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 border border-transparent focus:border-blue-500/30 transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-3">Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell buyers about your product..."
            rows={4}
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 border border-transparent focus:border-blue-500/30 transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-3">Price</h3>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-black text-gray-400">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full h-14 pl-10 pr-5 bg-gray-50 rounded-2xl text-sm font-black outline-none focus:ring-2 focus:ring-blue-500/20 border border-transparent focus:border-blue-500/30 transition-all"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-3">Quantity</h3>
            <div className="flex items-center justify-between h-14 px-3 bg-gray-50 rounded-2xl border border-transparent">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform"
              >
                <Minus size={18} className="text-gray-600" />
              </button>
              <span className="text-sm font-black text-gray-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform"
              >
                <Plus size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-gray-900">Category</h3>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-14 w-full rounded-2xl border border-transparent bg-gray-50 px-5 text-sm font-black outline-none focus:border-blue-500/30 focus:ring-2 focus:ring-blue-500/20"
          >
            {CATEGORIES.map((item) => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex h-14 items-center justify-between rounded-2xl bg-gray-50 px-4">
            <span className="text-sm font-black text-gray-900">Discount</span>
            <input type="checkbox" checked={discountEnabled} onChange={(event) => setDiscountEnabled(event.target.checked)} className="h-5 w-5 accent-blue-600" />
          </label>
          <div>
            <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-gray-900">Min Order</h3>
            <div className="flex h-14 items-center justify-between rounded-2xl bg-gray-50 px-3">
              <button onClick={() => setMinOrder(Math.max(1, minOrder - 1))} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <Minus size={18} />
              </button>
              <span className="text-sm font-black">{minOrder}</span>
              <button onClick={() => setMinOrder(minOrder + 1)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-blue-700">Live Preview</h3>
          <p className="mt-2 text-sm font-bold text-gray-900">{title || 'Product name'}</p>
          <p className="text-xs font-medium text-gray-500">Code: AUTO-{Math.max(1000, title.length + quantity + minOrder)}</p>
          <p className="text-xs font-medium text-gray-500">Category: {category}</p>
          <p className="mt-2 text-lg font-black text-gray-950">${price || '0.00'} {discountEnabled && <span className="text-xs text-blue-600">discount enabled</span>}</p>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-gray-900">Variants Management</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-400">Independent Price</label>
              <input
                type="number"
                value={variantPrice}
                onChange={(event) => setVariantPrice(event.target.value)}
                placeholder={price || '0.00'}
                className="h-12 w-full rounded-2xl bg-gray-50 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-400">Independent Stock</label>
              <div className="flex h-12 items-center justify-between rounded-2xl bg-gray-50 px-2">
                <button onClick={() => setVariantStock(Math.max(0, variantStock - 1))} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white"><Minus size={14} /></button>
                <span className="text-sm font-black">{variantStock}</span>
                <button onClick={() => setVariantStock(variantStock + 1)} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white"><Plus size={14} /></button>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-2xl bg-gray-50 p-3 text-xs font-bold text-gray-500">
            Internal SKU: VAR-{category.slice(0, 3).toUpperCase()}-{Math.max(100, variantStock + minOrder)}
            <span className="mt-1 block">Optional image inherits the first uploaded product photo.</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="shrink-0 p-5 bg-white border-t border-gray-50 flex items-center gap-4">
        <button
          onClick={handleDraft}
          className="flex-1 h-14 bg-gray-50 text-gray-700 font-bold rounded-2xl active:scale-[0.98] text-sm transition-transform"
        >
          Save Draft
        </button>
        <button
          onClick={handleCreate}
          className="flex-1 h-14 bg-blue-600 text-white font-black rounded-2xl active:scale-[0.98] shadow-lg shadow-blue-100 text-sm transition-transform"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
