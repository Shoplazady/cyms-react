import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoMdMail, IoIosCall } from "react-icons/io";
import { FaUserAlt, FaBuilding } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


const Register = () => {

    const SERVER_URL = 'http://localhost:3000';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            setPasswordMatch(false);
            return;
        }else {
            setPasswordMatch(true);
        }

        try {
            const response = await axios.post(`${SERVER_URL}/api/register`, formData);
            console.log(response.data);
      
            // Handle success, redirect, or show a success message
        } catch (error) {
            console.error('Error submitting registration:', error);
            // Handle error, show an error message, etc.
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-16 lg:py-0" >
            <div class="w-full max-w-md duration-300 ease-linear bg-stone-900 rounded-lg shadow-lg dark:bg-white border-gray-200 sm:w-full">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <img
                        src={require("../../Components/images/logo_full.png")}
                        alt="CYMS Logo"
                        style={{ width: "400px", height: "auto" }}
                    />
                    <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div class="flex flex-col lg:flex-row lg:space-x-4">
                            {/* first name Input */}
                            <div class="relative flex-1 mt-4 lg:mt-0">
                                <label for="firstname" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">First name</label>
                                <div class="flex">
                                    <span class="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <FaUserAlt class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        name="first_name"
                                        class="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                        placeholder="John"
                                        value={formData.first_name} onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* last name input */}
                            <div class="relative flex-1">
                                <label for="lastname" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Last name</label>
                                <div class="flex">
                                    <span class="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <FaUserAlt class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        name="last_name"
                                        class="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                        placeholder="Wick"
                                        value={formData.last_name} onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col lg:flex-row lg:space-x-4">
                            {/* Job Position Input */}
                            <div class="relative flex-1 mt-4 lg:mt-0">
                                <label for="job" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Job position</label>
                                <div class="flex">
                                    <span class="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <MdOutlineWork class="w-4 h-4 text-gray-500 dark:text-gray-400" />
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
                            <div class="relative flex-1">
                                <label for="agency" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Your agency</label>
                                <div class="flex">
                                    <span class="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <FaBuilding class="w-4 h-4 text-gray-500 dark:text-gray-400" />
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
                        <div class="relative">
                            <label for="tel" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Telephone number</label>
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                    <IoIosCall class="w-4 h-4 text-gray-500 dark:text-gray-400" />
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
                        <div class="relative">
                            <label for="email" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Your email</label>
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                    <IoMdMail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    class={`rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black`}
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
                        <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
                        <p class="text-sm font-medium text-gray-200 dark:text-gray-800">
                            Already have an account? <Link to="/login" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>



    );
};

export default Register;