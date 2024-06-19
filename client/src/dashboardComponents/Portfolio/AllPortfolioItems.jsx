import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AllPortfolioItems = () => {
  const navigate = useNavigate(); // Call useNavigate here

  const handleEditClick = (id) => {
    navigate(`/dashboard/editportfolio/${id}`);
  };
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://witjabtechnologiescombo.onrender.com/api/getallportfolio');
        setPortfolioItems(response.data);
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Portfolio Items</h1>
        <Link to="/dashboard/addportfolio" className="bg-green-500 text-white px-4 py-2 rounded">
          Add New Portfolio Item
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border border-gray-700">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">Title</th>
              <th className="py-2 px-4 border-b border-gray-700">Description</th>
              <th className="py-2 px-4 border-b border-gray-700">Visibility</th>
              <th className="py-2 px-4 border-b border-gray-700">Date</th>
              <th className="py-2 px-4 border-b border-gray-700">Status</th>
              <th className="py-2 px-4 border-b border-gray-700">Image</th>
              <th className="py-2 px-4 border-b border-gray-700">Colorful</th>
              <th className="py-2 px-4 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolioItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-700">
                <td className="py-2 px-4 border-b border-gray-700">{item.title}</td>
                <td className="py-2 px-4 border-b border-gray-700">{item.text}</td>
                <td className="py-2 px-4 border-b border-gray-700">{item.visibility}</td>
                <td className="py-2 px-4 border-b border-gray-700">{item.date}</td>
                <td className="py-2 px-4 border-b border-gray-700">{item.status}</td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <img src={item.file} alt={item.title} className="h-16 w-16 object-cover" />
                </td>
                <td className="py-2 px-4 border-b border-gray-700">{item.colorful ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <button
                    onClick={() => handleEditClick(item._id)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPortfolioItems;
