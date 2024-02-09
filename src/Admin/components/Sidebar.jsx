import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IoSpeedometerOutline,
  IoPeopleOutline,
} from 'react-icons/io5';
import { FaPlus, FaList, FaAngleDown , FaShoppingCart } from 'react-icons/fa';
import { FaClipboardCheck } from "react-icons/fa6";
import Logo from '../../Components/images/logo_full.png';
import { Button } from "@material-tailwind/react";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {


  const [isOrderListOpen, setIsOrderListOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside className={`fixed top-0 left-0 z-30 flex h-screen w-64 flex-col overflow-y-hidden duration-300 ease-linear bg-gray-900 dark:bg-stone-50 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar" >
      <div className="h-full px-3 py-4 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <Link to="admin/">
            {/* Logo in the top-left corner */}
            <img src={Logo} alt="CYMS Logo" style={{ width: "200px", height: "auto" }} />
          </Link>
        </div>
        <div className="lg:hidden xl:hidden absolute top-5 -right-3 ml-4">
          <Button variant="text" className="p-2" onClick={handleToggleSidebar}>
            <IoIosArrowDropleftCircle className="mx-auto h-8 w-8 text-white dark:text-black" />
          </Button>
        </div>
        <ul className="space-y-2 font-medium text-gray-50 dark:text-black">
          <li>
            <Link to="admin/" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <IoSpeedometerOutline className="w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700" />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="admin/User" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <IoPeopleOutline className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700" />
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link to="admin/Order" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
              <FaShoppingCart className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700" />
              <span className="flex-1 ms-3 whitespace-nowrap">Order</span>
            </Link>
          </li>
          <li>
            {/* Use state to toggle dropdown visibility */}
            <div className="relative">
              <div
                onClick={() => setIsOrderListOpen(!isOrderListOpen)}
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group cursor-pointer"
              >
                <FaList className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700" />
                <span className="flex-1 ms-3 whitespace-nowrap">Add</span>
                {/* Show a dropdown arrow when the list is open */}
                <FaAngleDown className={`w-4 h-4 transition-transform ${isOrderListOpen ? 'transform rotate-180' : ''}`} />
              </div>
              {/* Dropdown content */}
              {isOrderListOpen && (
                <ul className="pl-6">
                  {/* Add your dropdown items here */}
                  <li>
                    <Link to="admin/category" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
                      <FaClipboardCheck className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700" />
                      <span className="flex-1 ms-3 whitespace-nowrap">Add category</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="admin/job" className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 group">
                      <IoPeopleOutline className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-700" />
                      <span className="flex-1 ms-3 whitespace-nowrap">Add job</span>
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
