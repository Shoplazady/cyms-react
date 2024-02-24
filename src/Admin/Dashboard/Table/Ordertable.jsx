import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiFillDashboard } from 'react-icons/ai';
import { FaArrowsUpDown } from "react-icons/fa6";
import { MdLocalPrintshop, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Button } from '@material-tailwind/react';
import CreateorderModal from './../Modal/CreateorderModal';
import EdituserModal from './../Modal/EditorderModal';
import DetailorderModal from './../Modal/DetailorderModal';
import ActiveorderModal from '../Modal/ActiveorderModal';


const OrderTable = ({ ordersPerPage, onPageChange, onSearchChange }) => {
    const [createOrderModalOpen, setCreateOrderModalOpen] = useState(false);
    const [editOrderModalOpen, setEditOrderModalOpen] = useState(false);
    const [detailOrderModalOpen, setDetailOrderModalOpen] = useState(false);
    const [activeOrderModalOpen, setActiveOrderModalOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openCreateOrderModal = () => setCreateOrderModalOpen(true);
    const closeCreateOrderModal = () => setCreateOrderModalOpen(false);

    const openEditOrderModal = () => setEditOrderModalOpen(true);
    const closeEditOrderModal = () => setEditOrderModalOpen(false);

    const openDetailOrderModal = (order) => {
        setSelectedOrder(order);
        setDetailOrderModalOpen(true);
    };

    const closeDetailOrderModal = () => {
        setSelectedOrder(null);
        setDetailOrderModalOpen(false);
    };

    const openActiveOrderModal = (order) => {
        setSelectedOrder(order);
        setActiveOrderModalOpen(true);
    };

    const closeActiveOrderModal = () => {
        setSelectedOrder(null);
        setActiveOrderModalOpen(false);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/admin/orders?=${currentPage}&ordersPerPage=${ordersPerPage}&searchTerm=${searchTerm}`);

                const data = await response.json();
                setOrders(data.orders);
                setTotalOrders(data.totalOrders);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchOrders();
    }, [currentPage, ordersPerPage, searchTerm, orders]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            onPageChange(page);
        }
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        if (!selectAll) {
            // Select all rows
            const allRows = orders.map((order) => orders.id);
            setSelectedRows(allRows);
        } else {
            // Deselect all rows
            setSelectedRows([]);
        }
    };

    const handleRowSelect = (rowId) => {
        const updatedSelectedRows = [...selectedRows];

        if (updatedSelectedRows.includes(rowId)) {

            const index = updatedSelectedRows.indexOf(rowId);
            updatedSelectedRows.splice(index, 1);
        } else {

            updatedSelectedRows.push(rowId);
        }

        setSelectedRows(updatedSelectedRows);

        const selectedOrder = orders.find((order) => order.id === rowId);
        setSelectedOrder(selectedOrder);
    };

    const renderPageNumbers = () => {
        return Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index + 1}
                className={`flex items-center justify-center px-3 h-8 ${currentPage === index + 1
                    ? 'text-gray-100 bg-stone-800 border border-stone-700'
                    : 'text-gray-100 bg-stone-800 border border-stone-700 hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black'
                    }`}
                onClick={() => handlePageChange(index + 1)}
            >
                {index + 1}
            </button>
        ));
    };

    return (

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

            <nav className="flex p-3" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center">
                        <Link to="/admin/" class="inline-flex items-center text-sm font-medium text-gray-50 hover:text-blue-600 dark:text-gray-900 dark:hover:text-blue-600">
                            <AiFillDashboard className='w-3 h-3 me-2.5' />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <div class="flex items-center">
                            < MdOutlineKeyboardArrowRight className='w-6 h-6 text-gray-300' />
                            <h6 class="ms-1 text-sm font-medium text-gray-50 hover:text-blue-600 md:ms-2 dark:text-gray-900 dark:hover:text-blue-600">Order</h6>
                        </div>
                    </li>
                </ol>
            </nav>

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
                            className="block p-2 pl-10 text-sm text-gray-50 border border-stone-900 rounded-lg w-80 bg-stone-800 dark:bg-gray-100 dark:border-gray-400 dark:text-black"
                            placeholder="Search for users"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                        checked={selectAll}
                                        onChange={() => handleSelectAll()}
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
                                    State
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
                                    Price (฿)
                                    <FaArrowsUpDown className='w-3 h-3 ms-1.5' />
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="sr-only">Tool</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr className="bg-gray-800 border-b border-gray-700 dark:bg-white dark:border-gray-200">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-table-search-${order.id}`}
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                onChange={() => handleRowSelect(order.id)}
                                            />
                                            <label htmlFor={`checkbox-table-search-${order.id}`} className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.order_num}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text-gray-900">
                                        {order.first_name} {order.last_name}
                                    </th>
                                    <td className="flex items-center justify-between px-6 py-4">
                                        Order detail
                                        <FiEdit
                                            className='hover:text-blue-500'
                                            onClick={() => openDetailOrderModal(order)} />
                                        <DetailorderModal open={detailOrderModalOpen} onClose={closeDetailOrderModal} detailId={selectedOrder?.order_id} />
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.order_create}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.order_state}
                                    </td>
                                    <td className="flex items-center justify-between px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            {order.order_status === 'Active' ? (
                                                <span className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                </span>
                                            ) : (
                                                <span className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                </span>
                                            )}
                                            {order.order_status}
                                            <FiEdit
                                                className='hover:text-blue-500'
                                                onClick={() => openActiveOrderModal(order)} />
                                        </div>
                                        <ActiveorderModal open={activeOrderModalOpen} onClose={closeActiveOrderModal} orderId={selectedOrder?.order_id} orderNo={selectedOrder?.order_num} />
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.total_price}
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
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center text-gray-500 dark:text-gray-400 py-4">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 pb-4 ml-2 mr-2">
                <span className="text-sm font-medium text-gray-100 dark:text-gray-900 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    <span className="text-gray-300 dark:text-gray-500">Total {totalOrders} order</span>
                </span>
                <span className="text-sm font-medium text-gray-100 dark:text-gray-900 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <button
                        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-100 bg-stone-800 border border-stone-700 rounded-s-lg hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {totalPages > 0 && renderPageNumbers()}
                    <button
                        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-100 bg-stone-800 border border-stone-700 rounded-e-lg hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </nav>
        </div>


    );
}

export default OrderTable;