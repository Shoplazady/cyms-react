import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { FaPlus, FaMinus, FaLink } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdAttachFile } from "react-icons/md";
import { useAlert } from './../../Admin/components/AlertContext';

const CreateorderModal = ({ open, onClose }) => {

    const { showAlert } = useAlert();

    const handleConfirm = () => {
        
        // Close the modal
        onClose();
    
        // Show the alert
        showAlert('success', 'Order created successfully!');
      };

    const [orders, setOrders] = useState([
        { id: 1, itemName: '', link: '', price: '', quantity: 1 },
    ]);

    const [showLinkInput, setShowLinkInput] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleIncrement = (id) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id ? { ...order, quantity: order.quantity + 1 } : order
            )
        );
    };

    const handleDecrement = (id) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id && order.quantity > 1
                    ? { ...order, quantity: order.quantity - 1 }
                    : order
            )
        );
    };

    const handleDeleteOrder = (id) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    };

    const handleAddOrder = () => {
        const newOrder = { id: orders.length + 1, itemName: '', link: '', price: '', quantity: 1 };
        setOrders([...orders, newOrder]);
    };

    const handleLinkLabelClick = (id) => {
        // Toggle the visibility of the URL input field
        setShowLinkInput((prevShowLinkInput) => !prevShowLinkInput);
        setSelectedOrderId(id);
    };

    const calculateTotal = () => {
        return orders.reduce((total, order) => total + order.price * order.quantity, 0);
    };

    return (
        <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="lg:w-1/2 md:w-full bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>Add new order</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900 overflow-y-auto max-h-lg'>
                    <form>
                        <div className="mb-6">
                            <label for="orderAdd" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Order Add</label>
                            {orders.map((order) => (
                                <div className="mb-6 space-y-4" key={order.id}>
                                    {/* Row 1: Item Name and Picture */}
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            id={`itemName-${order.id}`}
                                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                            placeholder="Enter item name"
                                            value={order.itemName}
                                            onChange={(e) =>
                                                setOrders((prevOrders) =>
                                                    prevOrders.map((o) =>
                                                        o.id === order.id ? { ...o, itemName: e.target.value } : o
                                                    )
                                                )
                                            }
                                            required
                                        />
                                        {/* Add Link URL */}
                                        <label
                                            htmlFor={`link-${order.id}`}
                                            className="ml-2 p-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                                            onClick={() => handleLinkLabelClick(order.id)}
                                        >
                                            <FaLink className="w-4 h-4" />
                                        </label>
                                        {showLinkInput && selectedOrderId === order.id && (
                                            <input
                                                type="text"
                                                id={`link-${order.id}`}
                                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 mt-2 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                                placeholder="Enter URL"
                                                value={order.link}
                                                onChange={(e) =>
                                                    setOrders((prevOrders) =>
                                                        prevOrders.map((o) =>
                                                            o.id === order.id ? { ...o, link: e.target.value } : o
                                                        )
                                                    )
                                                }
                                            />
                                        )}

                                        {/* Add  picture */}
                                        <label
                                            htmlFor={`file-${order.id}`}
                                            className="ml-2 p-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                                        >
                                            <MdAttachFile className="w-6 h-6" />
                                            <input
                                                type="file"
                                                id={`file-${order.id}`}
                                                className="hidden"
                                                onChange={(e) =>
                                                    setOrders((prevOrders) =>
                                                        prevOrders.map((o) =>
                                                            o.id === order.id ? { ...o, picture: e.target.files[0] } : o
                                                        )
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>

                                    {/* Row 2: Price and Quantity */}
                                    <div className="relative flex items-center space-x-1 max-w-[8rem]" >
                                        <input
                                            type="text"
                                            id={`price-${order.id}`}
                                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-24 p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                            placeholder="Enter price"
                                            value={order.price}
                                            onChange={(e) =>
                                                setOrders((prevOrders) =>
                                                    prevOrders.map((o) =>
                                                        o.id === order.id ? { ...o, price: e.target.value } : o
                                                    )
                                                )
                                            }
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleDecrement(order.id)}
                                            className="bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-200 dark:border-gray-300 hover:bg-gray-600 border border-gray-600 rounded-s-lg p-3 h-11 focus:ring-gray-700 dark:focus:ring-gray-100 focus:ring-2 focus:outline-none"
                                        >
                                            <FaMinus className="w-3 h-3 text-gray-50 dark:text-gray-900" />
                                        </button>
                                        <input
                                            type="text"
                                            id={`quantity-${order.id}`}
                                            className="bg-gray-700 border-gray-300 h-11 text-center text-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 block w-6 py-2.5 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Quantity"
                                            value={order.quantity}
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleIncrement(order.id)}
                                            className="bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-200 dark:border-gray-300 hover:bg-gray-600 border border-gray-600 rounded-e-lg p-3 h-11 focus:ring-gray-700 dark:focus:ring-gray-100 focus:ring-2 focus:outline-none"
                                        >
                                            <FaPlus className="w-3 h-3 text-gray-50 dark:text-gray-900" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className="ml-2 p-2 text-red-500 hover:text-red-700"
                                        >
                                            <RiDeleteBin6Fill className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mb-6">
                            <FaPlus className="w-6 h-6" onClick={handleAddOrder} />
                        </div>
                    </form>
                </DialogBody >
                <DialogFooter className='flex justify-between items-center'>
                    <div className="text-white dark:text-gray-900">
                        Total Price: {calculateTotal().toFixed(2)}
                    </div>
                    <div>
                        <Button onClick={onClose} className="mr-1 bg-red-600 text-gray-100 font-medium hover:bg-red-700">
                            <span>Cancel</span>
                        </Button>
                        <Button onClick={handleConfirm} className="bg-green-500 font-medium text-gray-100 hover:bg-green-600">
                            <span>Confirm</span>
                        </Button>
                    </div>
                </DialogFooter>
            </div >
        </Dialog >
    );
};

export default CreateorderModal;