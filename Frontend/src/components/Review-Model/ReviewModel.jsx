// components/ReviewModal.jsx
import { useState } from 'react';
import axios from '../../api/axios';

const ReviewModal = ({ bookingId, to, role, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await axios.post('/api/reviews', {
        to,
        bookingId,
        rating,
        comment,
      });
      onClose(true); // Indicate review was submitted
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Submit Review</h3>

        {error && <p className="text-red-600">{error}</p>}

        <label className="block mb-2">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full border p-2 mb-4"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <label className="block mb-2">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <div className="flex justify-end">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 mr-2 border rounded"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
