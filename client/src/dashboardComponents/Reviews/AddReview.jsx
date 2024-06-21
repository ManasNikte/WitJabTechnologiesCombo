import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddReview = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState(0); // Use 0 as the initial value
  const [hoverStars, setHoverStars] = useState(0); // State to track hovered stars
  const [name, setName] = useState('');
  const [post, setPost] = useState('');
  const [company, setCompany] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = { stars, name, post, company, text };
      await axios.post('https://witjabtechnologiescombo.onrender.com/api/addreview', newReview);
      toast.success('Review added successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate('/'); // Navigate back to the homepage after 3 seconds
      }, 3000);
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleStarClick = (index) => {
    setStars(index + 1); // Stars are 1-based, so add 1 to the index
  };

  const handleMouseEnter = (index) => {
    setHoverStars(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverStars(0);
  };

  return (
    <>
      <br /><br /><br /><br />
      <div className="container mx-auto p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Review</h1>
        <form onSubmit={handleSubmit} className="bg-gray-700 shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Stars</label>
            <div className="flex justify-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-6 h-6 cursor-pointer ${
                    index < (hoverStars || stars) ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                  onClick={() => handleStarClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <path d="M12 .587l3.668 7.568L24 9.763l-6 5.882 1.418 8.268L12 19.424l-7.418 4.489L6 15.645 0 9.763l8.332-1.608z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="input appearance-none border w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="post">
              Post
            </label>
            <input
              className="input appearance-none border w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="company">
              Company
            </label>
            <input
              className="input appearance-none border w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="text">
              Text
            </label>
            <textarea
              className="input appearance-none border w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline h-32"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit Review
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddReview;
