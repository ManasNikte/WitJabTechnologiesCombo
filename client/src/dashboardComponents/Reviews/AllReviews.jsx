import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://witjabtechnologiescombo.onrender.com/api/getreviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleInviteClick = () => {
    const inviteLink = `${window.location.origin}/newreview`;
    navigator.clipboard.writeText(inviteLink)
      .then(() => {
        console.log('Invite link copied to clipboard:', inviteLink);
        toast.success('Invite link copied to clipboard!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error('Error copying invite link:', error);
        toast.error('Failed to copy invite link. Please try again.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const handleEditClick = (id) => {
    navigate(`/dashboard/editreview/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Reviews</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleInviteClick}>
          Invite to Review
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg">
          <div className="max-h-screen-half overflow-y-auto">
            <table className="min-w-full bg-gray-800 text-white border border-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 sm:px-6 border-b border-gray-700 text-left">Stars</th>
                  <th className="py-3 px-4 sm:px-6 border-b border-gray-700 text-left">Name</th>
                  <th className="py-3 px-4 sm:px-6 border-b border-gray-700 text-left">Post</th>
                  <th className="py-3 px-4 sm:px-6 border-b border-gray-700 text-left">Company</th>
                  <th className="py-3 px-4 sm:px-6 border-b border-gray-700 text-left">Text</th>
                  <th className="py-3 px-4 sm:px-6 border-b border-gray-700 text-left">Visibility</th>
                  <th className="py-3 px-4 sm:px-6 border-b border-gray-700 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id} className="hover:bg-gray-700">
                    <td className="py-3 px-4 sm:px-6 border-b border-gray-700">{review.stars}</td>
                    <td className="py-3 px-4 sm:px-6 border-b border-gray-700">{review.name}</td>
                    <td className="py-3 px-4 sm:px-6 border-b border-gray-700">{review.post}</td>
                    <td className="py-3 px-4 sm:px-6 border-b border-gray-700">{review.company}</td>
                    <td className="py-3 px-4 sm:px-6 border-b border-gray-700">{review.text}</td>
                    <td className="py-3 px-4 sm:px-6 border-b border-gray-700">{review.visibility}</td>
                    <td className="py-3 px-4 sm:px-6 border-b border-gray-700">
                      <button
                        className="bg-yellow-600 text-white px-4 py-2 rounded"
                        onClick={() => handleEditClick(review._id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllReviews;
