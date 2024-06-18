import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center mb-4">Admin Panel</h2>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/profile" className="block py-2 px-4 rounded hover:bg-gray-700">Profile</Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/portfolio" className="block py-2 px-4 rounded hover:bg-gray-700">Portfolio</Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/allcontactformsubmissions" className="block py-2 px-4 rounded hover:bg-gray-700">Contact Submissions</Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/allreviews" className="block py-2 px-4 rounded hover:bg-gray-700">Reviews</Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <hr className="border-t border-gray-700 mb-4" />
        <Link to="/logout" className="block py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600 text-center">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
