import React from "react";
import { Link } from 'react-router-dom';
import { IoMdMail, IoIosCall } from "react-icons/io";
import { FaUserAlt, FaBuilding } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


const Register = () => {

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-16 lg:py-0" >
            <div class="w-full max-w-md duration-300 ease-linear bg-stone-900 rounded-lg shadow-lg dark:bg-white border-gray-200 sm:w-full">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <img
                        src={require("../../Components/images/logo_full.png")}
                        alt="CYMS Logo"
                        style={{ width: "400px", height: "auto" }}
                    />
                    <form class="space-y-4 md:space-y-6" action="#">
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
                                        id="first_n"
                                        class="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                        placeholder="John"
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
                                        id="last_n"
                                        class="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                        placeholder="Wick"
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
                                        id="job"
                                        class="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                        placeholder="Job Position"
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
                                        id="agency"
                                        class="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                        placeholder="Agency"
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
                                    id="tel"
                                    class="rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black"
                                    placeholder="Telephone Number"
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
                                    id="email"
                                    class={`rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black`}
                                    placeholder="Cyms@company.com"
                                    required
                                />
                            </div>
                        </div>
                        <div class="flex flex-col lg:flex-row lg:space-x-4">
                            {/* Job Position Input */}
                            <div class="relative flex-1 mt-4 lg:mt-0">
                                <label for="password" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Password</label>
                                <div class="flex">
                                    <span class="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <RiLockPasswordFill className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        class={`rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black`}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Password and confirmpass */}
                            <div class="relative flex-1">
                                <label for="confirm-password" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Confirm password</label>
                                <div class="flex">
                                    <span class="inline-flex items-center px-3 text-sm bg-stone-800 rounded-l-md dark:bg-gray-200 dark:text-gray-400">
                                        <RiLockPasswordFill className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </span>
                                    <input
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        class={`rounded-none rounded-r-md bg-stone-800 text-stone-100 flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-black`}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
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