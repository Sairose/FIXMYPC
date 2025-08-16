
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const ReviewPage = () => {
  const { id } = useParams(); // user ID (client or technician)
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true); // start loading
      try {
        const res = await axios.get(`/api/reviews/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setReviews(res.data);
      } catch (err) {
        console.error(err);
        setReviews([]);
      } finally {
        setLoading(false); // done loading
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Reviews</h1>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">
  {review.from
    ? `${review.from.firstName} ${review.from.lastName} (${review.from.role})`
    : "Deleted User"}
</p>
                <div className="text-yellow-500">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
