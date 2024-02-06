import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

const Edituser = ({ open, onClose }) => {
    
    return (
        <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>Edit User</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900'>
                    <form>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="first_name" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">First name</label>
                                <input type="text"
                                    id="first_name"
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="John" required />
                            </div>
                            <div>
                                <label for="last_name" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Last name</label>
                                <input type="text"
                                    id="last_name"
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg  w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="Doe" required />
                            </div>
                            <div>
                                <label for="company" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Job position</label>
                                <input type="text"
                                    id="company"
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="Flowbite" required />
                            </div>
                            <div>
                                <label for="website" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Agency</label>
                                <input type="url"
                                    id="website"
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="flowbite.com" required />
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Phone number</label>
                                <input type="tel"
                                    id="phone"
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="123-456-789" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                            </div>
                        </div>
                        <div class="mb-6">
                            <label for="Profilepic" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Profile</label>
                            <input type="file" id="file_input"
                                className="block w-full mb-5 text-sm  rounded-lg p-2.5 cursor-pointer bg-gray-700 border border-gray-600 text-white  dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                aria-describedby="file_input_help"
                            />
                        </div>
                        <div class="mb-6">
                            <label for="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Email address</label>
                            <input type="email" id="email"
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                placeholder="john.doe@company.com" required />
                        </div>
                        <div class="mb-6">
                            <label for="password" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Password</label>
                            <input type="password" id="password"
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                placeholder="•••••••••" required />
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={onClose} className="mr-1 bg-red-600 text-gray-100 font-medium hover:bg-red-700">
                        <span>Cancel</span>
                    </Button>
                    <Button onClick={onClose} className='bg-green-500 font-medium text-gray-100 hover:bg-green-600'>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>
    );
};

export default Edituser;