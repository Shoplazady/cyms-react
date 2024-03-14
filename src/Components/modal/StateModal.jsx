import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { IoClose } from "react-icons/io5";
import { useAlert } from '../../Admin/components/AlertContext';

const StateModal = ({ open, onClose, orderId, orderNo }) => {
    const { showAlert } = useAlert();

    const [selectedState, setSelectedState] = useState('pending');
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchOrderState = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/order/getState/${orderId}`);
                const result = await response.json();
    
                console.log('Response:', response);
                console.log('Result:', result);
    
                if (response.ok) {
                    setSelectedState(result.orderState);
                    setComment(result.comment || '');
                } else {
                    console.error(`Error fetching order state: ${result.error}`);
                    showAlert('error', `Error fetching order state: ${result.error}`);
                }
            } catch (error) {
                console.error('Error fetching order state:', error.message);
                showAlert('error', `Error fetching order state: ${error.message}`);
            }
        };
    
        if (open) {
            fetchOrderState();
        }
    }, [open, orderId, showAlert]);

    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/order/updateState/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderState: selectedState,
                    comment: selectedState === 'not_approved' ? comment : null,
                }),
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
                <DialogHeader>Change state order ID:{orderId} and NO:{orderNo}</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900'>
                    <div className="mb-4">
                        <label htmlFor="orderState" className="block text-sm font-medium text-gray-300 dark:text-gray-700">
                            Order State
                        </label>
                        <select
                            id="orderState"
                            name="orderState"
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="mt-1 block w-full p-2.5 bg-gray-600 dark:bg-gray-100 dark:border-gray-300 dark:text-black"
                        >
                            <option value="pending">Pending</option>
                            <option value="not_approved">Not Approve</option>
                        </select>
                    </div>
                    {selectedState === 'not_approved' && (
                        <div className="mb-4">
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-100 dark:text-gray-900">
                                Comment
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3}
                                className="mt-1 block w-full p-2.5 bg-gray-600 dark:bg-gray-100 dark:border-gray-300 dark:text-black"
                            ></textarea>
                        </div>
                    )}
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

export default StateModal;
