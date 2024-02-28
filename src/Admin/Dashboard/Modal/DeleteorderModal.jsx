import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { IoClose } from "react-icons/io5";
import { useAlert } from './../../components/AlertContext';

const DeleteorderModal = ({ open, onClose, onConfirm, orderNo, orderId }) => {
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            // Close the modal
            onClose();

            // Set loading state to true
            setLoading(true);

            // Ensure orderId is set correctly before making the request
            if (!orderId) {
                showAlert('error', 'Order ID is missing.');
                return;
            }

            // Make the API call to delete the order
            const response = await fetch(`http://localhost:3001/api/admin/deleteorder/${orderId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete order: ${response.statusText}`);
            }

            // Order deleted successfully
            showAlert('success', `Delete ${orderNo} and Order ID ${orderId} successfully!`);
        } catch (error) {
            console.error('Error deleting order:', error);
            showAlert('error', `Failed to delete order: ${error.message}`);
        } finally {
            // Reset loading state
            setLoading(false);

            // Invoke the onConfirm callback
            if (typeof onConfirm === 'function') {
                onConfirm();
            }
        }
    };


    return (
        <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <div className="flex justify-end items-center">
                    <Button onClick={onClose} className="bg-gray-700 dark:bg-gray-100 text-red-500 hover:text-red-700 focus:outline-none">
                        <IoClose className='w-6 h-6' />
                    </Button>
                </div>
                <DialogHeader>Delete order</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900'>
                    Are you sure you want to delete {orderNo || 'this'} and Order ID {orderId}?
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={handleConfirm}
                        disabled={loading} // Disable the button if loading
                        className={`text-white ${loading ? 'bg-gray-400' : 'bg-red-600'} hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2`}
                    >
                        {loading ? 'Deleting...' : 'Yes, I\'m sure'}
                    </Button>
                    <Button
                        onClick={onClose}
                        disabled={loading} // Disable the button if loading
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        No, cancel
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>
    );
}

export default DeleteorderModal;
