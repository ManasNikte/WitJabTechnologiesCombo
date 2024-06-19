import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPortfolioItem = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    date: '',
    weburl: '',
    status: '',
    colorful: false,
    file: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before submission:', formData);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('text', formData.text);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('weburl', formData.weburl);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('colorful', formData.colorful);
      formDataToSend.append('file', formData.file);

      const response = await axios.post('https://witjabtechnologiescombo.onrender.com/api/addportfolio', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Portfolio item added successfully:', response.data);
      setFormData({
        title: '',
        text: '',
        date: '',
        weburl: '',
        status: '',
        colorful: false,
        file: null
      });
      navigate('/dashboard/portfolio');
    } catch (error) {
      console.error('Error adding portfolio item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Add New Portfolio Item</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto max-h-screen-half overflow-y-auto">
        <div className="mb-4">
          <label className="block text-white mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-700 rounded py-2 px-4 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Description</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-700 rounded py-2 px-4 w-full h-32 resize-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Date</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-700 rounded py-2 px-4 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Web URL</label>
          <input
            type="text"
            name="weburl"
            value={formData.weburl}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-700 rounded py-2 px-4 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-700 rounded py-2 px-4 w-full"
            required
          >
            <option value="">Select Status</option>
            <option value="done">Done</option>
            <option value="progress">Progress</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-2">File</label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="bg-gray-800 text-white border border-gray-700 rounded py-2 px-4 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Colorful</label>
          <input
            type="checkbox"
            name="colorful"
            checked={formData.colorful}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-700 rounded py-2 px-4"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          Add Portfolio Item
        </button>
      </form>
    </div>
  );
};

export default AddPortfolioItem;
