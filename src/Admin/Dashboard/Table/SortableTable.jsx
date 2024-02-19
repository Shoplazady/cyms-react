import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Avatar, Button } from '@material-tailwind/react';
import CreateuserModal from './../Modal/CreateuserModal';
import EdituserModal from './../Modal/EdituserModal';
import DeleteModal from '../Modal/DeleteModal';

const SortableTable = ({ usersPerPage, onPageChange, onSearchChange }) => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
    const [editUserModalOpen, setEditUserModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const openCreateUserModal = () => setCreateUserModalOpen(true);
    const closeCreateUserModal = () => setCreateUserModalOpen(false);

    const openEditUserModal = (user) => {
        setSelectedUser(user);
        setEditUserModalOpen(true);
    };

    const closeEditUserModal = () => {
        setSelectedUser(null);
        setEditUserModalOpen(false);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedUser(null);
        setDeleteModalOpen(false);
    };

    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/admin/users?page=${currentPage}&usersPerPage=${usersPerPage}&searchTerm=${searchTerm}`);

                const data = await response.json();
                setUsers(data.users);
                setTotalUsers(data.totalUsers);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUsers();
    }, [currentPage, usersPerPage, searchTerm, users]);


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
            const allRows = users.map((user) => user.id);
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
        
        const selectedUser = users.find((user) => user.id === rowId);
        setSelectedUser(selectedUser);
    };

    const handleDelete = async () => {
        try {
            if (!selectedUser) {
                console.error('No user selected for deletion');
                return;
            }

            // Show a confirmation modal here if needed

            const response = await fetch(`http://localhost:3001/api/admin/deleteuser/${selectedUser.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
               
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
                console.log('User deleted successfully.');
                closeDeleteModal();
            } else {
                console.error('Error deleting user:', response.statusText);
                
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            
        }
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
        <div className="relative shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column p-2 md:flex-row flex-wrap bg-gray-700 dark:bg-gray-50">
                <Button
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden 
                    text-sm font-medium text-gray-100 rounded-lg group bg-gradient-to-br
                     from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-gray-900 
                     dark:text-gray-900 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                    onClick={openCreateUserModal}
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-800 dark:bg-gray-50 rounded-md group-hover:bg-opacity-0">
                        Add user
                    </span>
                </Button>
                {/* Modal create user */}
                <CreateuserModal open={createUserModalOpen} onClose={closeCreateUserModal} />
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

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-200 dark:text-gray-700">
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
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Position
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr
                                    key={index}
                                    className="bg-gray-800 border-b border-gray-500 dark:bg-gray-50 dark:border-gray-300 hover:bg-gray-900 dark:hover:bg-gray-100"
                                >
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-table-search-${user.id}`}
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                onChange={() => handleRowSelect(user.id)}
                                            />
                                            <label htmlFor={`checkbox-table-search-${user.id}`} className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td className="flex items-center px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">
                                        <Avatar
                                            variant="circular"
                                            alt={`${user.first_name} ${user.last_name}`}
                                            className="w-10 h-10 rounded-full"
                                            style={{ width: '40px', height: '40px' }}
                                            src={require('./../../../Components/images/avatar.png')}
                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">
                                                {`${user.first_name} ${user.last_name}`}
                                            </div>
                                            <div className="font-normal">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">{user.position}</td>
                                    <td className="px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                <div className='flex items-center'>
                                    <Button
                                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-50 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-gray-900 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                                        onClick={() => openEditUserModal(user)}
                                    >
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-50 rounded-md group-hover:bg-opacity-0">
                                            Edit
                                        </span>
                                    </Button>
                                    <Button
                                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-50 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-gray-900 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                                        onClick={() => openDeleteModal(user)}
                                    >
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-50 rounded-md group-hover:bg-opacity-0">
                                            <RiDeleteBin6Fill className='w-5 h-5' />
                                        </span>
                                    </Button>
                                </div>
                                
                                <DeleteModal open={deleteModalOpen} onClose={closeDeleteModal} onConfirm={handleDelete} userId={selectedUser?.id} userName={selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : ''} />
                                <EdituserModal open={editUserModalOpen} onClose={closeEditUserModal} userId={selectedUser?.id} />
                            </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 dark:text-gray-400 py-4">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 pb-4 ml-2 mr-2">
                <span className="text-sm font-medium text-gray-100 dark:text-gray-900 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    <span className="text-gray-300 dark:text-gray-500">Total {totalUsers} user</span>
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
};

export default SortableTable;
