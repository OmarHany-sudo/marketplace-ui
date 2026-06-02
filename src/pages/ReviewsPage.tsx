import { useState } from 'react';
import { ChevronLeft, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { REVIEWS } from '../data/mock';

export default function ReviewsPage() {
  const { goBack, showToast } = useApp();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    showToast('Review submitted');
    setRating(0);
    setReview('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Write a Review</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        {/* Star Rating */}
        <div className="text-center py-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">How would you rate this product?</h3>
          <div className="flex items-center justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform active:scale-110"
              >
                <Star
                  size={36}
                  className={`transition-colors ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                />
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Good'}
            {rating === 4 && 'Very Good'}
            {rating === 5 && 'Excellent'}
          </p>
        </div>

        {/* Review Text */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Your Review</h3>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={6}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]/20 resize-none"
          />
        </div>

        {/* Existing Reviews */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Reviews</h3>
          <div className="space-y-3">
            {REVIEWS.map((r) => (
              <div key={r.id} className="flex gap-3 p-3 bg-gray-50 rounded-2xl">
                <img src={r.avatar} alt={r.userName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{r.userName}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{r.text}</p>
                  <span className="text-[10px] text-gray-400">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="shrink-0 p-4 bg-white border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full h-14 bg-[#3b82f6] text-white font-semibold rounded-full active:scale-[0.98] transition-transform shadow-lg shadow-[#3b82f6]/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
