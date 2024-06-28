"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';

const ReviewForm = () => {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session || session.user.role !== 'Customer') {
      alert('Only customers can submit reviews.');
      return;
    }


    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, rating, comment }),
      });

      if (response.ok) {
        setName('');
        setRating(1);
        setComment('');
        alert('Review submitted successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to submit review: ${errorData.error}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while submitting your review.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border border-gray-300 p-2 rounded-lg"
          required
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} Star{star > 1 && 's'}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-lg"
          rows={4}
          required
        ></textarea>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
