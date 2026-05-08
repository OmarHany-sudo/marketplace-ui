import { useState } from 'react';
import { ChevronLeft, Camera, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CONDITIONS = ['New', 'Used', 'Like New'];

export default function SellFormPage() {
  const { goBack, navigate, showToast } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('New');
  const [images, setImages] = useState<string[]>([]);

  const handleCreate = () => {
    showToast('Listing created successfully!');
    navigate('home');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Create New Listing</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-5">
        {/* Image Upload */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Photos</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button className="shrink-0 w-20 h-20 rounded-xl bg-gray-100 flex flex-col items-center justify-center gap-1 active:bg-gray-200">
              <Camera size={20} className="text-gray-400" />
              <span className="text-[10px] text-gray-400">Add Photo</span>
            </button>
            {images.map((img, i) => (
              <div key={i} className="shrink-0 w-20 h-20 rounded-xl overflow-hidden relative">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center">
                  <X size={10} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Title</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you selling?"
            className="w-full h-12 px-4 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FD4D38]/20"
          />
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your item..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FD4D38]/20 resize-none"
          />
        </div>

        {/* Condition */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Condition</h3>
          <div className="flex gap-2">
            {CONDITIONS.map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`flex-1 h-11 rounded-xl text-sm font-semibold transition-colors ${condition === c ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Price</h3>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full h-12 pl-8 pr-4 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#FD4D38]/20"
            />
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="shrink-0 p-4 bg-white border-t border-gray-100 flex items-center gap-3">
        <button
          onClick={goBack}
          className="flex-1 h-12 bg-gray-100 text-gray-700 font-semibold rounded-full active:scale-[0.98] text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          className="flex-1 h-12 bg-[#FD4D38] text-white font-semibold rounded-full active:scale-[0.98] shadow-lg shadow-[#FD4D38]/25 text-sm"
        >
          Create Listing
        </button>
      </div>
    </div>
  );
}
