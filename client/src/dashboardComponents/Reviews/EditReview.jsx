import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SideNav from '../SideNav/SideNav'; // Import SideNav component

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stars, setStars] = useState('');
  const [name, setName] = useState('');
  const [post, setPost] = useState('');
  const [company, setCompany] = useState('');
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState('private'); // Default visibility

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`https://witjabtechnologiescombo.onrender.com/api/getreview/${id}`);
        const { stars, name, post, company, text, visibility } = response.data;
        setStars(stars);
        setName(name);
        setPost(post);
        setCompany(company);
        setText(text);
        setVisibility(visibility);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchReview();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedReview = { stars, name, post, company, text, visibility };
      await axios.put(`https://witjabtechnologiescombo.onrender.com/api/updatereview/${id}`, updatedReview);
      navigate('/dashboard'); // Navigate back to dashboard after successful edit
    } catch (error) {
      console.error('Error updating review:', error);
      // Handle error scenarios, e.g., display an error message
    }
  };

  return (
    <div className="flex">
      <SideNav /> {/* Render the SideNav component */}
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-4">Edit Review</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="stars">
              Stars
            </label>
            <input
              className="input appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              id="stars"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="input appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="post">
              Post
            </label>
            <input
              className="input appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="company">
              Company
            </label>
            <input
              className="input appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="text">
              Text
            </label>
            <textarea
              className="input appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="visibility">
              Visibility
            </label>
            <select
              className="input appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              required
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReview;
