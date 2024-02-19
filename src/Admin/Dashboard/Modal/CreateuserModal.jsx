import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { useAlert } from './../../components/AlertContext';

const CreateuserModal = ({ open, onClose }) => {

    const { showAlert } = useAlert();

    const [selectedLevel, setSelectedLevel] = useState(1);
    const [fileInput, setFileInput] = useState(null);

    const handleFileChange = (e) => {
        setFileInput(e.target.files[0]);
    };

    const handleConfirm = async () => {

        try {

            const formData = new FormData();
            formData.append('first_name', document.getElementById('first_name').value);
            formData.append('last_name', document.getElementById('last_name').value);
            formData.append('position', document.getElementById('company').value);
            formData.append('agency', document.getElementById('website').value);
            formData.append('tel_num', document.getElementById('phone').value);
            formData.append('level', selectedLevel);
            formData.append('profilePic', fileInput);
            formData.append('email', document.getElementById('email').value);
            formData.append('password', document.getElementById('password').value);
            const response = await fetch('http://localhost:3001/api/admin/adduser', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log(data);

            onClose();

            showAlert('success', 'User created successfully!');

            // Handle success or display error messages
        } catch (error) {
            console.error('Error:', error);

        }

    };

    return (
        <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>สมัครสมาชิก</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900'>
                    <form>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">First name</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Last name</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="company" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Job position</label>
                                <input
                                    type="text"
                                    id="company"
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="Flowbite"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="website" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Agency</label>
                                <input
                                    type="url"
                                    id="website"
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="flowbite.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Phone number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="123-456-789"
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="level" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">
                                    User Level
                                </label>
                                <select
                                    id="level"
                                    name="level"
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                >
                                    <option value={1}>Level 1</option>
                                    <option value={2}>Level 2</option>
                                    <option value={3}>Level 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="Profilepic" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Profile</label>
                            <input
                                type="file"
                                id="file_input"
                                className="block w-full mb-5 text-sm  rounded-lg p-2.5 cursor-pointer"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Email address</label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                placeholder="john.doe@company.com"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                placeholder="•••••••••"
                                required
                            />
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={onClose} className="mr-1 bg-red-600 text-gray-100 font-medium hover:bg-red-700">
                        <span>Cancel</span>
                    </Button>
                    <Button onClick={handleConfirm} className='bg-green-500 font-medium text-gray-100 hover:bg-green-600'>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>
    );
};

export default CreateuserModal;