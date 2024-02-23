import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { FaLink, FaPlus, FaMinus } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdAttachFile } from 'react-icons/md';
import { useAlert } from './../../components/AlertContext';

const CreateOrderModal = ({ open, onClose }) => {
    const [users, setUsers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [orders, setOrders] = useState([
        { id: 1, itemName: '', link: '', price: '', quantity: 1 },
    ]);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const { showAlert } = useAlert();

    useEffect(() => {
        fetchUsersForSelectOptions();
    }, []);

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

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

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
        setShowLinkInput((prevShowLinkInput) => !prevShowLinkInput);
        setSelectedOrderId(id);
    };

    const calculateTotal = () => {
        return orders.reduce((total, order) => total + order.price * order.quantity, 0);
    };

    const handleConfirm = async () => {
        try {
            if (!selectedOption) {
                showAlert('error', 'Please select a user.');
                return;
            }

            if (orders.length === 0) {
                showAlert('error', 'Please add at least one order.');
                return;
            }

            const userId = selectedOption.value;

            const ordersData = orders.map((order) => {
                // Extracting file name from the File object
                const fileName = order.picture ? order.picture.name : null;
            
                return {
                    detailName: order.itemName,
                    detailQuantity: order.quantity,
                    detailPrice: order.price,
                    detailUrl: order.link || null,
                    detailPath: fileName ? `images_order/${fileName}` : null,
                };
            });

            console.log('Orders Data:', ordersData);

            const response = await fetch('http://localhost:3001/api/admin/addorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, orders: ordersData }),
            });

            if (response.ok) {
                showAlert('success', 'Order created successfully!');

                setSelectedOption(null);
                setOrders([{ id: 1, itemName: '', link: '', price: '', quantity: 1 }]);
                setShowLinkInput(false);

                onClose();
            } else {
                showAlert('error', `Failed to create order: ${response.statusText}`);
            }
        } catch (error) {
            showAlert('error', `Error creating order: ${error.message}`);
        }
    };

    return (
        <Dialog
            open={open}
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900"
        >
            <div className="lg:w-1/2 md:w-full bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>Add new order</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900 overflow-y-auto max-h-lg'>
                    <form>
                        <div className="mb-6">
                            <label htmlFor="employee_name" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Employee name</label>
                            <Select
                                className='text-black'
                                options={users.map(user => ({ value: user.id, label: `${user.first_name} ${user.last_name}` }))}
                                onChange={selected => setSelectedOption(selected)}
                                value={selectedOption}
                                placeholder="Select a user..."
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="orderAdd" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Order Add</label>
                            {orders.map((order) => (
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
                                                    prevOrders.map((o) =>
                                                        o.id === order.id ? { ...o, itemName: e.target.value } : o
                                                    )
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
                                                        prevOrders.map((o) =>
                                                            o.id === order.id ? { ...o, link: e.target.value } : o
                                                        )
                                                    )
                                                }
                                            />
                                        )}
                                        <label
                                            htmlFor={`file-${order.id}`}
                                            className="ml-2 p-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                                        >
                                            <MdAttachFile className="w-6 h-6" />
                                            <input
                                                type="file"
                                                id={`file-${order.id}`}
                                                className="hidden"
                                                onChange={(e) => {
                                                    const selectedFile = e.target.files[0];
                                                    console.log('Selected File:', selectedFile);

                                                    setOrders((prevOrders) =>
                                                        prevOrders.map((o) =>
                                                            o.id === order.id ? { ...o, picture: selectedFile } : o
                                                        )
                                                    );
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <div className="relative flex items-center space-x-1 max-w-[8rem]">
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
                </DialogBody>
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
            </div>
        </Dialog>
    );
};

export default CreateOrderModal;
