import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { IoClose } from "react-icons/io5";
import { useAlert } from '../../Admin/components/AlertContext';

const CommentorderModal = ({ open, onClose , orderId , orderNo }) => {

    const { showAlert } = useAlert();

    const handleConfirm = async () => {
        try {
            
            const response = await fetch(`http://localhost:3001/api/inspector/order/updateState/${orderId}`, {
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
        <Dialog open={open} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <div className="flex justify-end items-center">
                    <Button onClick={onClose} className="bg-gray-700 dark:bg-gray-100 text-red-500 hover:text-red-700 focus:outline-none">
                        <IoClose className='w-6 h-6' />
                    </Button>
                </div>
                <DialogHeader >Change state order</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900'>
                    Are you sure you want to change state {orderNo} ID: {orderId} ?

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

export default CommentorderModal;