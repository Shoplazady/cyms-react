import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { IoClose } from "react-icons/io5";
import { useAlert } from './../../components/AlertContext';

const ActivejobModal = ({ open, onClose , orderId , orderNo }) => {

    const { showAlert } = useAlert();

    const handleConfirm = async () => {
        try {
            
            const response = await fetch(`http://localhost:3001/api/admin/order/updateStatus/${orderId}`, {
                method: 'PUT',
            });

            if (response.ok) {
                showAlert('success', 'Order status updated successfully!');
                onClose();
            } else {
                const data = await response.json();
                showAlert('error', data.error || 'Failed to update order status.');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            showAlert('error', 'Internal server error.');
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
                <DialogHeader >Change status order</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900'>
                    Are you sure you want to change status {orderNo} ID: {orderId} ?
                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleConfirm} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                        Yes, I'm sure
                    </Button>
                    <Button onClick={onClose} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        No, cancel
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>
    );
}

export default ActivejobModal;