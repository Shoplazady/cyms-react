import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaArrowsUpDown } from "react-icons/fa6";
import { MdLocalPrintshop } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Button } from '@material-tailwind/react';
import CreateorderModal from './../modal/CreateorderModal';
import EdituserModal from './../modal/EditorderModal';
import DetailorderModal from './../modal/DetailorderModal';
import DeleteModal from '../modal/DeleteModal';


const Createorder = () => {

    const [createOrderModalOpen, setCreateOrderModalOpen] = useState(false);
    const [editOrderModalOpen, setEditOrderModalOpen] = useState(false);
    const [detailOrderModalOpen, setDetailOrderModalOpen] = useState(false);
    const [deleteModalOpen , setDeleteModalOpen] = useState(false);

    const openCreateOrderModal = () => setCreateOrderModalOpen(true);
    const closeCreateOrderModal = () => setCreateOrderModalOpen(false);

    const openEditOrderModal = () => setEditOrderModalOpen(true);
    const closeEditOrderModal = () => setEditOrderModalOpen(false);

    const openDetailOrderModal = () => setDetailOrderModalOpen(true);
    const closeDetailOrderModal = () => setDetailOrderModalOpen(false);

    const openDeleteModal = () => setDeleteModalOpen(true);
    const closeDeleteModal = () => setDeleteModalOpen(false);

    return (
        <div>
            <div className="flex items-center justify-between flex-column p-2 md:flex-row flex-wrap bg-gray-700 dark:bg-gray-50">
                <Button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden 
                text-sm font-medium text-gray-100 rounded-lg group bg-gradient-to-br
                 from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-gray-900 
                 dark:text-gray-900 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                    onClick={openCreateOrderModal}
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-800 dark:bg-gray-50 rounded-md group-hover:bg-opacity-0">
                        Create order
                    </span>
                </Button>
                {/* Modal create user */}
                <CreateorderModal open={createOrderModalOpen} onClose={closeCreateOrderModal} />
                {/* Search input on the right */}
                <div className="flex items-center">
                    <label htmlFor="table-search" className="sr-only text-black">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center p-3 pointer-events-none">
                            <AiOutlineSearch className="w-4 h-4 text-gray-50 dark:text-gray-900" />
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            className="block p-2 pl-10 text-sm text-gray-50 border border-gray-700 rounded-lg w-80 bg-gray-800 dark:bg-gray-100 dark:border-gray-400 dark:text-black"
                            placeholder="Search for users"
                        />
                    </div>
                </div>
            </div>
            <div className='relative overflow-x-auto'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-400 dark:text-gray-700">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-50 dark:text-gray-700">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Employee name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div className="flex items-center">
                                    Order detail
                                    <FaArrowsUpDown className='w-3 h-3 ms-1.5' />
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div className="flex items-center">
                                    Date create
                                    <FaArrowsUpDown className='w-3 h-3 ms-1.5' />
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div className="flex items-center">
                                    Status
                                    <FaArrowsUpDown className='w-3 h-3 ms-1.5' />
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div className="flex items-center">
                                    Price
                                    <FaArrowsUpDown className='w-3 h-3 ms-1.5' />
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="sr-only">Tool</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-800 border-b border-gray-700 dark:bg-white dark:border-gray-200">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                10005578
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text-gray-900">
                                John wick
                            </th>
                            <td className="flex items-center justify-between px-6 py-4">
                                Order detail
                                <FiEdit
                                    className='hover:text-blue-500'
                                    onClick={openDetailOrderModal} />
                                <DetailorderModal open={detailOrderModalOpen} onClose={closeDetailOrderModal} />
                            </td>
                            <td className="px-6 py-4">
                                15/5/67
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="flex items-center space-x-3 px-6 py-4">
                                <Button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-50 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-gray-900 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                                    onClick={openEditOrderModal}>
                                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-50 rounded-md group-hover:bg-opacity-0">
                                        Edit
                                    </span>
                                </Button>
                                <EdituserModal open={editOrderModalOpen} onClose={closeEditOrderModal} />
                                <MdLocalPrintshop className='w-5 h-5' />
                                <RiDeleteBin6Fill className='w-5 h-5 text-red-500 hover:text-red-700' onClick={openDeleteModal} />
                                <DeleteModal open={deleteModalOpen} onClose={closeDeleteModal} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4 bg-gray-600 dark:bg-gray-50" aria-label="Table navigation">
                <span className="text-sm font-medium text-gray-100 dark:text-gray-900 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing <span className='text-gray-300 dark:text-gray-500'>1-10</span> of <span className='text-gray-300 dark:text-gray-500'>1000</span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-100 bg-gray-700 border border-stone-800 rounded-s-lg hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black"
                        >
                            Previous
                        </a>
                    </li>
                    {/* ... Page links ... */}
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-100 bg-gray-700 border border-gray-900 hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-100 bg-gray-700 border border-gray-900 hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-gray-100 bg-gray-700 border border-gray-900 hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-100 bg-gray-700 border border-gray-900 hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black">4</a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-100 bg-gray-700 border border-gray-900 rounded-e-lg hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black"
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Createorder;