import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

const Edituser = ({ open, onClose, userId }) => {

    const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/admin/getuser/${userId}`);
                const userData = await response.json();

                // Update the user state with fetched data
                setUser(userData);

                // Set the selected level
                setSelectedLevel(userData.level);

                // Set the selected picture file (if available)
                if (userData.profilePicture) {
                    setSelectedFile(userData.profilePicture);
                }

                console.log('User Data:', userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId, open]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleInputChange = (e) => {
        // Update the user state when input fields change
        setUser((prevUser) => ({
            ...prevUser,
            [e.target.id]: e.target.value,
        }));
    };

    const handleConfirmClick = async () => {

        try {
            const formData = new FormData();
            formData.append('first_name', user.first_name);
            formData.append('last_name', user.last_name);
            formData.append('position', user.position);
            formData.append('agency', user.agency);
            formData.append('tel_num', user.tel_num);
            formData.append('level', selectedLevel);

            if (selectedFile) {
                formData.append('profilePicture', selectedFile);
            } else {
                formData.append('profilePicture', user.profilePicture);
            }

            const response = await axios.put(`http://localhost:3001/api/admin/updateuser/${userId}`, formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
        console.log('Updated User Data:', user);

        onClose();
    };

    return (
        <Dialog
            open={open}
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900"
        >
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>Edit User ID {userId}</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900'>
                    <form>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">First name</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    value={user?.first_name || ''}
                                    onChange={handleInputChange}
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
                                    value={user?.last_name || ''}
                                    onChange={handleInputChange}
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg  w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="company" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Job position</label>
                                <input
                                    type="text"
                                    id="company"
                                    value={user?.position || ''}
                                    onChange={handleInputChange}
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
                                    value={user?.agency || ''}
                                    onChange={handleInputChange}
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
                                    value={user?.tel_num || ''}
                                    onChange={handleInputChange}
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    placeholder="123-456-789"
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="level" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Level</label>
                                <select
                                    id="level"
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                    required
                                >
                                    <option value="" disabled>Select level</option>
                                    <option value="1">User</option>
                                    <option value="3">Admin</option>

                                </select>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="Profilepic" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Profile</label>
                            <input
                                type="file"
                                id="file_input"
                                onChange={handleFileChange}
                                className="block w-full mb-5 text-sm  rounded-lg p-2.5 cursor-pointer bg-gray-700 border border-gray-600 text-white  dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                            />
                            {selectedFile ? (
                                <p className="text-gray-100 dark:text-gray-900">{selectedFile.name}</p>
                            ) : (
                                <p className="text-gray-100 dark:text-gray-900">Current Picture: {user?.profilePicture}</p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Email address</label>
                            <input
                                type="email"
                                id="email"
                                value={user?.email || ''}
                                onChange={handleInputChange}
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
                                value={user?.password || ''}
                                onChange={handleInputChange}
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
                    <Button onClick={handleConfirmClick} className='bg-green-500 font-medium text-gray-100 hover:bg-green-600'>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>
    );
};

export default Edituser;
