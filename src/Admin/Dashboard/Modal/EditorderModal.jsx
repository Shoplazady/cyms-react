import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import Select from 'react-select';
import { FaPlus, FaMinus, FaLink } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdAttachFile } from 'react-icons/md';

const EditOrderModal = ({ open, onClose, orderId, orderUid }) => {

    const [users, setUsers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [orders, setOrders] = useState([{ id: 1, itemName: '', link: '', price: '', quantity: 1 }]);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        fetchUsersForSelectOptions();
        // Fetch order details for the given orderId and orderUid
        if (orderId && orderUid) {
            fetchOrderDetails(orderId, orderUid);
        }
    }, [orderId, orderUid]);

    const fetchUsersForSelectOptions = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/admin/users/options');
            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
            } else {
                console.error('Failed to fetch users for select options:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching users for select options:', error);
        }
    };

    const fetchOrderDetails = async (orderId, orderUid) => {
        try {
            const response = await fetch(`http://localhost:3001/api/admin/detail/${orderUid}`);
            if (response.ok) {
                const data = await response.json();
                // Handle the fetched order details
                console.log(data.details);
            } else {
                console.error('Failed to fetch order details:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const handleIncrement = (id) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => (order.id === id ? { ...order, quantity: order.quantity + 1 } : order))
        );
    };

    const handleDecrement = (id) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id && order.quantity > 1 ? { ...order, quantity: order.quantity - 1 } : order
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
        return orders.reduce((total, order) => total + (order.price || 0) * order.quantity, 0);
    };

    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="lg:w-1/2 md:w-full bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>Edit order ID: {orderId} and UID: {orderUid}</DialogHeader>
                <DialogBody className="text-gray-100 dark:text-gray-900 overflow-y-auto max-h-lg">
                    <form>
                        <div className="mb-6">
                            <label htmlFor="employee_name" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">
                                Employee name
                            </label>
                            <Select
                                className="text-black"
                                options={users.map((user) => ({ value: user.id, label: `${user.first_name} ${user.last_name}` }))}
                                onChange={(selected) => setSelectedOption(selected)}
                                value={selectedOption}
                                placeholder="Select a user..."
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="orderAdd" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">
                                Order Add
                            </label>
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
                                                    prevOrders.map((o) => (o.id === order.id ? { ...o, itemName: e.target.value } : o))
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
                                                        prevOrders.map((o) => (o.id === order.id ? { ...o, link: e.target.value } : o))
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
                                    <div className="relative flex items-center space-x-1 max-w-[8rem]">
                                        <input
                                            type="text"
                                            id={`price-${order.id}`}
                                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-24 p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                            placeholder="Enter price"
                                            value={order.price}
                                            onChange={(e) =>
                                                setOrders((prevOrders) =>
                                                    prevOrders.map((o) => (o.id === order.id ? { ...o, price: e.target.value } : o))
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
                </DialogBody>
                <DialogFooter className="flex justify-between items-center">
                    <div className="text-white dark:text-gray-900">Total Price: {calculateTotal().toFixed(2)}</div>
                    <div>
                        <Button onClick={onClose} color="red" ripple="light" className="mr-1">
                            Cancel
                        </Button>
                        <Button onClick={onClose} color="green" ripple="light">
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </div>
        </Dialog>
    );
};

export default EditOrderModal;
