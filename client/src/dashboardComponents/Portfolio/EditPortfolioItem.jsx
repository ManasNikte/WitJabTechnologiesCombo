import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPortfolioItem = () => {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [visibility, setVisibility] = useState('');
  const [file, setFile] = useState(null); // To track file changes
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [colorful, setColorful] = useState(false);
  const [weburl, setWeburl] = useState(''); // Added weburl state

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://witjabtechnologiescombo.onrender.com/api/getportfoliobyid/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.text);
        setImage(response.data.file);
        setWeburl(response.data.weburl); // Set weburl from API response
        setVisibility(response.data.visibility);
        setDate(response.data.date || ''); // Assuming date is returned from backend
        setStatus(response.data.status || ''); // Assuming status is returned from backend
        setColorful(response.data.colorful || false); // Assuming colorful is returned from backend
      } catch (error) {
        console.error('Error fetching portfolio item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update the 'file' state with the selected file
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    switch (type) {
      case 'checkbox':
        setColorful(checked);
        break;
      default:
        if (name === 'date') {
          setDate(value);
        } else if (name === 'status') {
          setStatus(value);
        } else if (name === 'weburl') { // Handle weburl change
          setWeburl(value);
        }
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', description); // Changed to 'text' to match backend
      formData.append('date', date);
      formData.append('weburl', weburl); // Append weburl to formData
      formData.append('status', status);
      formData.append('visibility', visibility);
      formData.append('colorful', colorful);
      if (file) {
        formData.append('file', file); // Append the new file if it's selected
      }

      await axios.put(`https://witjabtechnologiescombo.onrender.com/api/updateportfolio/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      // Redirect or show success message
      navigate('/dashboard/portfolio'); // Redirect to dashboard or another appropriate route
    } catch (error) {
      console.error('Error updating portfolio item:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://witjabtechnologiescombo.onrender.com/api/deleteportfolio/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Redirect to portfolio list or show success message
      navigate('/dashboard/portfolio'); // Redirect to dashboard or another appropriate route
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Portfolio Item</h1>
      <div className="mb-4 text-center">
        <img
          src={image}
          alt={title}
          className="max-w-full max-h-96 mx-auto border border-gray-700"
        />
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Date</label>
          <input
            type="text"
            name="date"
            value={date}
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
            value={weburl}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-700 rounded py-2 px-4 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Status</label>
          <select
            name="status"
            value={status}
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
          <label className="block text-gray-700 mb-2">Visibility</label>
          <select
            className="w-full p-2 border rounded"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            required
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">Update Image</label>
          <input
            className="w-full p-2 border rounded"
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange} // Handle file change to update state
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Colorful</label>
          <input
            type="checkbox"
            name="colorful"
            checked={colorful}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-700 rounded py-2 px-4"
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded mb-2" type="submit">Update Item</button>
      </form>
      <button
        className="w-full bg-red-500 text-white p-2 rounded"
        onClick={handleDelete}
      >
        Delete Item
      </button>
    </div>
  );
};

export default EditPortfolioItem;
