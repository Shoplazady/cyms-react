import React from 'react';
import { Link } from 'react-router-dom';
import {
  IoSpeedometerOutline,
  IoAlbumsOutline,
  IoPeopleOutline,
} from 'react-icons/io5';

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-stone-900 dark:bg-stone-50">
        <ul className="space-y-2 font-medium text-gray-50 dark:text-black">
          <li>
            <Link to="/admin" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <IoSpeedometerOutline className="w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/kanban" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <IoAlbumsOutline className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
            </Link>
          </li>
          <li>
            <Link to="/inbox" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
            </Link>
          </li>
          <li>
            <Link to="/users" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <IoPeopleOutline className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link to="/products" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <IoAlbumsOutline className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
