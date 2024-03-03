import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { FaPlus, FaMinus, FaLink } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useAlert } from '../../Admin/components/AlertContext';

const EditorderModal = ({ open, onClose, orderId, orderUid }) => {

    const { showAlert } = useAlert();

    const [orders, setOrders] = useState([]);

    const [showLinkInput, setShowLinkInput] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);

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

    useEffect(() => {
        // Fetch order details for the given orderId and orderUid
        if (orderId && orderUid) {
            fetchOrderDetails(orderId, orderUid);
        }
        setOrders([]);

    }, [orderId, orderUid ]);

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
        if (orderDetails && orderDetails.length > 0) {
            const newOrders = orderDetails.map((detail, index) => ({
                id: detail.detail_id,
                itemName: detail.detail_name,
                link: detail.detail_url || '',
                price: detail.detail_price.toString(),
                quantity: detail.detail_quantity,
            }));
            setOrders((prevOrders) => [...prevOrders, ...newOrders]);
        }
    }, [orderDetails]);

    const handleConfirm = async () => {
        try {

            if (orders.length === 0) {
                showAlert('error', 'Please add at least one order.');
                return;
            }

            const formData = new FormData();
            
            formData.append('orderId', orderId);


            formData.append('orders', JSON.stringify(orders));


            orders.forEach((order, index) => {
                if (order.picture) {
                    formData.append('picture', order.picture || null);
                }
            });

            const editOrderResponse = await fetch(`http://localhost:3001/api/user/editdetailimages/${orderUid}`, {
                method: 'PUT',
                body: formData,
            });

            if (editOrderResponse.ok) {
                showAlert('success', 'Order updated successfully!');
                onClose();
            } else {
                showAlert('error', `Failed to update order: ${editOrderResponse.statusText}`);
            }
        } catch (error) {
            showAlert('error', `Error updating order: ${error.message}`);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="lg:w-1/2 md:w-full bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>Edit order ID: {orderId} and UID: {orderUid}</DialogHeader>
                <DialogBody className="text-gray-100 dark:text-gray-900 overflow-y-auto max-h-lg">
                    <form>
                        <div className="mb-6">
                            <label htmlFor="orderAdd" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">
                                Order Add
                            </label>
                            {orders.map((order, index) => (
                                <div className="mb-6 space-y-4" key={order.id}>
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
                                    </div>
                                    <div className="relative flex items-center space-x-1 max-w-[8rem]">
                                        <label
                                            htmlFor={`file-${order.id}`}
                                            className="ml-2 p-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                                        >
                                            <input
                                                type="file"
                                                id={`file-${order.id}`}
                                                className="w-auto"
                                                onChange={(e) => {
                                                    const selectedFile = e.target.files[0];
                                                    setOrders((prevOrders) =>
                                                        prevOrders.map((o) =>
                                                            o.id === order.id ? { ...o, picture: selectedFile } : o
                                                        )
                                                    );
                                                }}
                                            />
                                        </label>
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
                                        <Button
                                            onClick={() => handleDecrement(order.id)}
                                            className="bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-200 dark:border-gray-300 hover:bg-gray-600 border border-gray-600 w-6 h-11"
                                        >
                                            <FaMinus className="text-gray-50 dark:text-gray-900" />
                                        </Button>
                                        <input
                                            type="text"
                                            id={`quantity-${order.id}`}
                                            className="bg-gray-700 border-gray-300 h-11 text-center text-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 block w-6 py-2.5 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-200 dark:text-black"
                                            placeholder="Quantity"
                                            value={order.quantity}
                                            readOnly
                                        />
                                        <Button
                                            onClick={() => handleIncrement(order.id)}
                                            className="bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-200 dark:border-gray-300 hover:bg-gray-600 border border-gray-600 w-6 h-11 focus:ring-gray-700 dark:"
                                        >
                                            <FaPlus className="text-gray-50 dark:text-gray-900" />
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className="ml-2 p-2 text-red-500 hover:text-red-700"
                                        >
                                            <RiDeleteBin6Fill className="w-6 h-6" />
                                        </Button>
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
                    <div className='space-x-1'>
                        <Button onClick={onClose} className="bg-red-500">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} className="bg-green-500">
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </div>
        </Dialog>
    );
};

export default EditorderModal;