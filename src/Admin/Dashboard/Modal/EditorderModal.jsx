import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import Select from 'react-select';
import { FaPlus, FaMinus, FaLink } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdAttachFile } from 'react-icons/md';

const EditOrderModal = ({ open, onClose, orderId, orderUid }) => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        fetchUsersForSelectOptions();
    }, []);

    useEffect(() => {
        // Fetch order details for the given orderId and orderUid
        if (orderId && orderUid) {
            fetchOrderDetails(orderId, orderUid);
        }
        // Set the selected user based on orderUid
        const user = users.find((user) => user.id === orderUid);
        if (user) {
            setSelectedUser({ value: user.id, label: `${user.first_name} ${user.last_name}` });
        }

        setOrders([]);

    }, [orderId, orderUid, users]);

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

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/admin/detail/${orderId}`);
            if (response.ok) {
                const data = await response.json();

                console.log(data.details);

                setOrderDetails(data.details);
            } else {
                console.error('Failed to fetch order details:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    useEffect(() => {
        // If orderDetails is available, map it to the structure of orders and add it
        if (orderDetails && orderDetails.length > 0) {
            const newOrders = orderDetails.map((detail, index) => ({
                id: orders.length + index + 1,
                detail_id: detail.detail_id,
                itemName: detail.detail_name,
                link: detail.detail_url || '',
                price: detail.detail_price.toString(),
                quantity: detail.detail_quantity,

            }));
            setOrders((prevOrders) => [...prevOrders, ...newOrders]);
        }
    }, [orderDetails]);

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

        setShowLinkInput((prevShowLinkInput) => !prevShowLinkInput);
        setSelectedOrderId(id);
    };

    const calculateTotal = () => {
        return orders.reduce((total, order) => total + (order.price || 0) * order.quantity, 0);
    };

    useEffect(() => {
        return () => {
            setOrderDetails(null);
        };
    }, [open]);

    const handleUpdateDetails = async () => {
        try {
            const formData = new FormData();

            // Append user-related data
            formData.append('user_id', selectedUser.value);
            formData.append('order_id', orderId);

            // Iterate through orders and append form data for each order
            orders.forEach((order) => {
                formData.append('detail_id[]', order.detail_id); // Include detail_id
                formData.append('detail_name[]', order.itemName);
                formData.append('detail_price[]', order.price);
                formData.append('detail_quantity[]', order.quantity);
                formData.append('detail_url[]', order.link);
    
                // Check if there's a picture file and append it
                if (order.picture) {
                    formData.append('picture[]', order.picture);
                }
                // Add other details as needed
            });

            const response = await fetch(`http://localhost:3001/api/admin/editdetailimages/${orderId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                console.log('Details updated successfully.');
                
            } else {
                console.error('Failed to update details:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating details:', error);
        }

        console.log('Updated Details:', orders);

        onClose();
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
                                onChange={(selected) => setSelectedUser(selected)}
                                value={selectedUser} // Set the selected user as the default value
                                placeholder="Select a user..."
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="orderAdd" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">
                                Order Add
                            </label>
                            {orders.map((order) => (
                                <div className="mb-6 space-y-4">
                                    <div key={`detailId-${order.id}`}>
                                        <input
                                            type="text"
                                            id={`detailId-${order.id}`}
                                            className="hidden"
                                            value={order.detail_id}
                                            readOnly
                                        />
                                    </div>
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
                        <Button onClick={handleUpdateDetails} color="green" ripple="light">
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </div>
        </Dialog>
    );
};

export default EditOrderModal;
