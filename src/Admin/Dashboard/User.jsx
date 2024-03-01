import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import SortableTable from './Table/SortableTable';

import { AiFillDashboard } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const UserManage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Define the function for handling page changes
    const handlePageChange = (page) => {
        // Add logic for updating the current page
        setCurrentPage(page);
    };

    return (
        <>
            <nav className="flex p-3">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to="/admin/" className="inline-flex items-center text-sm font-medium text-gray-50 hover:text-blue-600 dark:text-gray-900 dark:hover:text-blue-600">
                            <AiFillDashboard className='w-3 h-3 me-2.5' />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            < MdOutlineKeyboardArrowRight className='w-6 h-6 text-gray-300' />
                            <h6 className="ms-1 text-sm font-medium text-gray-50 hover:text-blue-600 md:ms-2 dark:text-gray-900 dark:hover:text-blue-600">User</h6>
                        </div>
                    </li>
                </ol>
            </nav>

            <Outlet />

            {/* Pass the handlePageChange function as a prop to SortableTable */}
            <SortableTable onPageChange={handlePageChange} />
        </>
    );
};

export default UserManage;
