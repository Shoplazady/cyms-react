import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Button,
} from '@material-tailwind/react';

const SortableTable = () => {


    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* ... Other content ... */}
            <div className="flex items-center justify-between flex-column p-2 md:flex-row flex-wrap bg-gray-700 dark:bg-gray-50">
                <Button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-100 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-gray-900  dark:text-gray-900 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-800 dark:bg-gray-50 rounded-md group-hover:bg-opacity-0">
                        Create order
                    </span>
                </Button>
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
                        />
                    </div>
                </div>
            </div>

            <div className='relative overflow-x-auto'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-200 dark:text-gray-700">
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
                        <tr className="bg-gray-800 border-b border-gray-500 dark:bg-gray-50 dark:border-gray-300 hover:bg-gray-900 dark:hover:bg-gray-100">
                            {/* ... Table row content ... */}
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
                            <td className="flex items-center px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">
                                <Avatar
                                    variant="circular"
                                    alt="Your Name"
                                    className="w-10 h-10 rounded-full"
                                    style={{ width: '40px', height: '40px' }}
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal">neil.sims@flowbite.com</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">React Developer</td>
                            <td className="px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit user
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-gray-800 border-b border-gray-500 dark:bg-gray-50 dark:border-gray-300 hover:bg-gray-900 dark:hover:bg-gray-100">
                            {/* ... Table row content ... */}
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
                            <td className="flex items-center px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">
                                <Avatar
                                    variant="circular"
                                    alt="Your Name"
                                    className="w-10 h-10 rounded-full"
                                    style={{ width: '40px', height: '40px' }}
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal">neil.sims@flowbite.com</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">React Developer</td>
                            <td className="px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit user
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-gray-800 border-b border-gray-500 dark:bg-gray-50 dark:border-gray-300 hover:bg-gray-900 dark:hover:bg-gray-100">
                            {/* ... Table row content ... */}
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
                            <td className="flex items-center px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">
                                <Avatar
                                    variant="circular"
                                    alt="Your Name"
                                    className="w-10 h-10 rounded-full"
                                    style={{ width: '40px', height: '40px' }}
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal">neil.sims@flowbite.com</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">React Developer</td>
                            <td className="px-6 py-4 text-gray-100 whitespace-nowrap dark:text-gray-900">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit user
                                </a>
                            </td>
                        </tr>
                        {/* ... Additional table rows ... */}
                    </tbody>
                </table>
            </div>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 pb-4 ml-2 mr-2" aria-label="Table navigation">
                <span className="text-sm font-medium text-gray-100 dark:text-gray-900 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing <span className='text-gray-300 dark:text-gray-500'>1-10</span> of <span className='text-gray-300 dark:text-gray-500'>1000</span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-100 bg-stone-800 border border-stone-700 rounded-s-lg hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black"
                        >
                            Previous
                        </a>
                    </li>
                    {/* ... Page links ... */}
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-100 bg-stone-800 border border-stone-700 hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-100 bg-stone-800 border border-stone-700 hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-gray-100 bg-stone-800 border border-stone-700 hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-100 bg-stone-800 border border-stone-700 hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black">4</a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-100 bg-stone-800 border border-stone-700 rounded-e-lg hover:bg-stone-900 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-black"
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
            {/* ... Edit user modal ... */}
        </div>

    );
}

export default SortableTable;