import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faBriefcase, faEnvelope, faStar, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-gray-800 text-white h-screen p-4 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
      <button onClick={toggleCollapse} className="text-white mb-8">
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
      <div className="mb-8">
        <h2 className={`text-xl font-bold text-center mb-4 ${isCollapsed ? 'hidden' : 'block'}`}>Admin Panel</h2>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-4" />
              <span className={isCollapsed ? 'hidden' : 'block'}>Dashboard</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/profile" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FontAwesomeIcon icon={faUser} className="mr-4" />
              <span className={isCollapsed ? 'hidden' : 'block'}>Profile</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/portfolio" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FontAwesomeIcon icon={faBriefcase} className="mr-4" />
              <span className={isCollapsed ? 'hidden' : 'block'}>Portfolio</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/allcontactformsubmissions" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FontAwesomeIcon icon={faEnvelope} className="mr-4" />
              <span className={isCollapsed ? 'hidden' : 'block'}>Contact Submissions</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/allreviews" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FontAwesomeIcon icon={faStar} className="mr-4" />
              <span className={isCollapsed ? 'hidden' : 'block'}>Reviews</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <hr className="border-t border-gray-700 mb-4" />
        <Link to="/logout" className="flex items-center py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-4" />
          <span className={isCollapsed ? 'hidden' : 'block'}>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
