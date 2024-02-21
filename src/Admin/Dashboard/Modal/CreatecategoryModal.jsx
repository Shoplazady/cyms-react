import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { useAlert } from './../../components/AlertContext';

const CreatecategoryModal = ({ open, onClose }) => {

    const { showAlert } = useAlert();

    const [categoryName, setCategoryName] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('Inactive');


    const handleCategoryStatusChange = (e) => {
        setCategoryStatus(e.target.value);
    };


    const handleConfirm = async () => {

        try {

            const categoryData = {
                category_name: categoryName,
                category_status: categoryStatus,
            };

            const response = await fetch('http://localhost:3001/api/admin/addcategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            const data = await response.json();
            console.log(data);


            onClose();


            showAlert('success', 'Category added successfully!');

        } catch (error) {
            console.error('Error:', error);

        }
    };

    return (
        <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>เพิ่มหมวดหมู่</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900'>
                    <form>
                        <div class="mb-6">
                            <label for="categoryName" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Category</label>
                            <input type="text" id="categoryName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                placeholder="หมวดหมู่..." required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="categoryStatus" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Category Status</label>
                            <select
                                id="categoryStatus"
                                value={categoryStatus}
                                onChange={handleCategoryStatusChange}
                                className="bg-gray-700 border border-gray-600 text-white text-md rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
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
}

export default CreatecategoryModal;