import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPortfolioItem = () => {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [colorful, setColorful] = useState(false);
  const [weburl, setWeburl] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://witjabtechnologiescombo.onrender.com/api/getportfoliobyid/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.text);
        setImage(response.data.file);
        setWeburl(response.data.weburl || '');
        setVisibility(response.data.visibility || 'public');
        setDate(response.data.date || '');
        setStatus(response.data.status || '');
        setColorful(response.data.colorful || false);
      } catch (error) {
        console.error('Error fetching portfolio item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
        } else if (name === 'weburl') {
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
      formData.append('text', description);
      formData.append('date', date);
      formData.append('weburl', weburl);
      formData.append('status', status);
      formData.append('visibility', visibility);
      formData.append('colorful', colorful);
      if (file) {
        formData.append('file', file);
      }

      await axios.put(`https://witjabtechnologiescombo.onrender.com/api/updateportfolio/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Portfolio item updated successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        onClose: () => navigate('/dashboard/portfolio')
      });
    } catch (error) {
      console.error('Error updating portfolio item:', error);
      toast.error('Failed to update portfolio item. Please try again later.', {
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

  const handleDelete = async () => {
    try {
      await axios.delete(`https://witjabtechnologiescombo.onrender.com/api/deleteportfolio/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Portfolio item deleted successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        onClose: () => navigate('/dashboard/portfolio')
      });
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast.error('Failed to delete portfolio item. Please try again later.', {
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Portfolio Item</h1>
      <div className="mb-4 text-center">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover border border-gray-700"
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
          <label className="block text-gray-700 mb-2" htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            name="date"
            value={date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="weburl">Web URL</label>
          <input
            type="text"
            id="weburl"
            name="weburl"
            value={weburl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="done">Done</option>
            <option value="progress">Progress</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="visibility">Visibility</label>
          <select
            id="visibility"
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
          <label className="block text-gray-700 mb-2" htmlFor="file">Update Image</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="colorful">Colorful</label>
          <input
            type="checkbox"
            id="colorful"
            name="colorful"
            checked={colorful}
            onChange={handleChange}
            className="p-2"
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
      <ToastContainer />
    </div>
  );
};

export default EditPortfolioItem;
