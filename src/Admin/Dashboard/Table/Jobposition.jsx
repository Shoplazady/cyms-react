import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiFillDashboard } from 'react-icons/ai';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Button } from '@material-tailwind/react';
import CreatejobModal from './../Modal/CreatejobModal';
import EditjobModal from './../Modal/EditjobModal';
import DeletejobModal from '../Modal/DeletejobModal';
import ActivejobModal from '../Modal/ActivejobModal';

const JobTable = () => {

    const [jobs, setJobs] = useState([])
    const [totalJobs, setTotalJobs] = useState(0);
    const [createJobModalOpen, setCreateJobModalOpen] = useState(false);
    const [editJobModalOpen, setEditJobModalOpen] = useState(false);
    const [deleteJobModalOpen, setDeleteJobModalOpen] = useState(false);
    const [activeJobModalOpen, setActiveJobModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);


    const openCreateJobModal = () => setCreateJobModalOpen(true);
    const closeCreateJobModal = () => setCreateJobModalOpen(false);

    const openEditJobModal = () => setEditJobModalOpen(true);
    const closeEditJobModal = () => setEditJobModalOpen(false);

    const openDeleteJobModal = () => setDeleteJobModalOpen(true);
    const closeDeleteJobModal = () => setDeleteJobModalOpen(false);

    const openActiveJobModal = (job) => {
        setSelectedJob(job);
        setActiveJobModalOpen(true);
    };

    const closeActiveJobModal = () => {
        setSelectedJob(null);
        setActiveJobModalOpen(false);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/admin/job`);

                const data = await response.json();
                setJobs(data.jobs);
                setTotalJobs(data.totalJobs);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchJobs();
    }, [jobs]);

    const handleRowSelect = (rowId) => {
        const updatedSelectedRows = [...selectedRows];
    
        if (updatedSelectedRows.includes(rowId)) {
            
            const index = updatedSelectedRows.indexOf(rowId);
            updatedSelectedRows.splice(index, 1);
        } else {
            
            updatedSelectedRows.push(rowId);
        }
    
        setSelectedRows(updatedSelectedRows);
        
        const selectedJob = jobs.find((job) => job.id === rowId);
        setSelectedJob(selectedJob);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg" >

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
                            <h6 className="ms-1 text-sm font-medium text-gray-50 hover:text-blue-600 md:ms-2 dark:text-gray-900 dark:hover:text-blue-600">Job position</h6>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="flex items-center justify-between flex-column p-2 md:flex-row flex-wrap bg-gray-700 dark:bg-gray-50">
                <Button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden 
                text-sm font-medium text-gray-100 rounded-lg group bg-gradient-to-br
                 from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-gray-900 
                 dark:text-gray-900 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                    onClick={openCreateJobModal}
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-800 dark:bg-gray-50 rounded-md group-hover:bg-opacity-0">
                        Add Job
                    </span>
                </Button>
                {/* Modal create user */}
                <CreatejobModal open={createJobModalOpen} onClose={closeCreateJobModal} />
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
                            placeholder="Search for category"
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
                                Position name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date create
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="sr-only">Tool</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.length > 0 ? (
                            jobs.map((job, index) => (
                                <tr className="bg-gray-800 border-b border-gray-700 dark:bg-white dark:border-gray-200">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-table-search-${job.id}`}
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                onChange={() => handleRowSelect(job.id)}
                                            />
                                            <label htmlFor={`checkbox-table-search-${job.id}`} className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center ">
                                            {job.job_name}
                                            <FiEdit
                                                className='hover:text-blue-500 ms-1.5'
                                                onClick={openEditJobModal} />
                                        </div>
                                        <EditjobModal open={editJobModalOpen} onClose={closeEditJobModal} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {job.job_status === 'Active' ? (
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                                            ) : (
                                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                                            )}
                                            {job.job_status}
                                            <FiEdit
                                                className='hover:text-blue-500 ms-1.5'
                                                onClick={() => openActiveJobModal(job)}
                                            />
                                            <ActivejobModal open={activeJobModalOpen} onClose={closeActiveJobModal} jobId={selectedJob?.job_id} jobName={selectedJob?.job_name}  />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center ">
                                            {job.job_create}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-50 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-gray-900 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                                            onClick={openDeleteJobModal}
                                        >
                                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-50 rounded-md group-hover:bg-opacity-0">
                                                <RiDeleteBin6Fill />
                                            </span>
                                        </Button>
                                        <DeletejobModal open={deleteJobModalOpen} onClose={closeDeleteJobModal} />
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
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4 bg-gray-600 dark:bg-gray-50">
                <span className="text-sm font-medium text-gray-100 dark:text-gray-900 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing job total <span className='text-gray-300 dark:text-gray-500'>{totalJobs}</span>
                </span>
            </nav>
        </div>
    );
}

export default JobTable;