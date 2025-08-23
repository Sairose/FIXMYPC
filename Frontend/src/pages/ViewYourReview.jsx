import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const ViewYourReview = () => {
  const { id } = useParams(); // user ID (technician or client)
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/reviews/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReviews(res.data);
      } catch (err) {
        console.error(err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reviews & Ratings</h1>

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
                    ? `${review.from.firstName} ${review.from.lastName} (${review.role})`
                    : "Unknown User"}
                </p>
                <div className="text-yellow-500">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
              </div>

              <div className="flex justify-between items-start mt-2">
                <p className="text-gray-700 w-3/4">{review.comment}</p>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${review.sentiment === 'positive'
                      ? 'bg-green-100 text-green-800'
                      : review.sentiment === 'negative'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {review.sentiment}
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewYourReview;
