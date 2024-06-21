import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Edit Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="stars">
            Stars
          </label>
          <input
            className="input"
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
            className="input"
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
            className="input"
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
            className="input"
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
            className="input h-32"
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
            className="input"
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReview;
