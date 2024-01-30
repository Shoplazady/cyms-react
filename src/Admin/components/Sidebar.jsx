import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IoSpeedometerOutline,
  IoPeopleOutline,
} from 'react-icons/io5';
import { FaPlus, FaList, FaAngleDown } from 'react-icons/fa';
import { FaClipboardCheck } from "react-icons/fa6";

const Sidebar = ({ isSidebarOpen }) => {

  const [isOrderListOpen, setIsOrderListOpen] = useState(false);

  return (
    <aside className={`left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? '' : '-translate-x-full lg:translate-x-0'}`} aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-stone-900 dark:bg-stone-50">
        <ul className="space-y-2 font-medium text-gray-50 dark:text-black">
          <li>
            <Link to="/admin/dashboard" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <IoSpeedometerOutline className="w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <FaPlus className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Create order</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <IoPeopleOutline className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            {/* Use state to toggle dropdown visibility */}
            <div className="relative">
              <div
                onClick={() => setIsOrderListOpen(!isOrderListOpen)}
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group cursor-pointer"
              >
                <FaList className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Order list</span>
                {/* Show a dropdown arrow when the list is open */}
                <FaAngleDown className={`w-4 h-4 transition-transform ${isOrderListOpen ? 'transform rotate-180' : ''}`} />
              </div>
              {/* Dropdown content */}
              {isOrderListOpen && (
                <ul className="pl-6">
                  {/* Add your dropdown items here */}
                  <li>
                    <Link to="/admin/" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
                      <FaClipboardCheck className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white" />
                      <span className="flex-1 ms-3 whitespace-nowrap">All Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
                      <IoPeopleOutline className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white" />
                      <span className="flex-1 ms-3 whitespace-nowrap">Pending Orders</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
