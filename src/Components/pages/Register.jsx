import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoMdMail, IoIosCall } from "react-icons/io";
import { FaUserAlt, FaBuilding } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAlert } from '../../Admin/components/AlertContext';


const Register = () => {

    const { showAlert } = useAlert();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        position: '',
        agency: '',
        tel_num: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (formData) => {
        if (formData.password !== formData.confirm_password) {
            setPasswordMatch(false);
            return;
        } else {
            setPasswordMatch(true);
        }
    
        try {
            // Make a request to add data to the database
            const response = await axios.post('http://localhost:3001/api/register', formData);
    
            // Check if the request was successful
            if (response.status === 201) {
                // Show success message
                showAlert('success', 'User registered successfully!');
            } else {
                // Show error message if request was not successful
                showAlert('error', response.data.error || 'Failed to add data to the database.');
            }
        } catch (error) {
            // Show error message if request failed
            showAlert('error', 'Email is already registered.');
            console.error('Error adding data to the database:', error);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        handleSubmit(formData);
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-16 lg:py-0" >
            <div className="w-full max-w-md duration-300 ease-linear bg-stone-900 rounded-lg shadow-lg dark:bg-white border-gray-200 sm:w-full">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <img
                        src={require("../../Components/images/logo_full.png")}
                        alt="CYMS Logo"
                        style={{ width: "400px", height: "auto" }}
                    />
                    <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                        <div className="flex flex-col lg:flex-row lg:space-x-4">
                            {/* first name Input */}
                            <div className="relative flex-1 mt-4 lg:mt-0">
                                <label for="firstname" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">First name</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <FaUserAlt className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        name="first_name"
                                        className="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                        placeholder="John"
                                        value={formData.first_name} onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* last name input */}
                            <div className="relative flex-1">
                                <label for="lastname" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Last name</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <FaUserAlt className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        name="last_name"
                                        className="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                        placeholder="Wick"
                                        value={formData.last_name} onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row lg:space-x-4">
                            {/* Job Position Input */}
                            <div className="relative flex-1 mt-4 lg:mt-0">
                                <label for="job" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Job position</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <MdOutlineWork className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        name="position"
                                        class="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                        placeholder="Job Position"
                                        value={formData.position} onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Job and agency */}
                            <div className="relative flex-1">
                                <label for="agency" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Your agency</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <FaBuilding className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        name="agency"
                                        class="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                        placeholder="Agency"
                                        value={formData.agency} onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Telephone Number Input */}
                        <div className="relative">
                            <label for="tel" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Telephone number</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                    <IoIosCall className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </span>
                                <input
                                    type="tel"
                                    name="tel_num"
                                    class="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                    placeholder="Telephone Number"
                                    value={formData.tel_num} onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* Email Input */}
                        <div className="relative">
                            <label for="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Your email</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                    <IoMdMail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    className={`rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black`}
                                    placeholder="Cyms@company.com"
                                    value={formData.email} onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row lg:space-x-4">
                            {/* Password Input */}
                            <div className="relative flex-1 mt-4 lg:mt-0">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Password</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <RiLockPasswordFill className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        className={`rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black`}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="relative flex-1">
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Confirm password</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <RiLockPasswordFill className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </span>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        className={`rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black`}
                                        placeholder="••••••••"
                                        value={formData.confirm_password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Show password mismatch error */}
                        {!passwordMatch && <p className="text-red-500">Passwords do not match.</p>}
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
                        <p className="text-sm font-medium text-gray-200 dark:text-gray-800">
                            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>



    );
};

export default Register;