import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiCheckCircle, FiEdit } from "react-icons/fi";

const DetailorderModal = ({ open, onClose, detailId }) => {

    const [details, setDetail] = useState([]);
    const [editedDetails, setEditedDetails] = useState({});
    const [editedValues, setEditedValues] = useState({});

    useEffect(() => {
        const fetchDetailData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/admin/detail/${detailId}`);
                const detailData = await response.json();


                setDetail(detailData.details);
                setEditedDetails({});
                setEditedValues({});

                console.log('Detail Data:', detailData);
            } catch (error) {
                console.error('Error fetching detail data:', error);
            }
        };

        if (detailId) {
            fetchDetailData();
        }
    }, [detailId, open]);

    const handleEdit = (id) => {
        setEditedDetails((prev) => ({ ...prev, [id]: true }));
    };

    const handleCancelEdit = () => {
        setEditedDetails({});
        setEditedValues({});
    };

    const handleSaveEdit = (id) => {
        // Handle the logic to save the edited detail to the database
        // This is where you would send the updated detail to your backend API

        // After saving, you can reset the editing state
        setEditedDetails((prev) => ({ ...prev, [id]: false }));
        setEditedValues({});
    };

    const handleInputChange = (field, value) => {
        setEditedValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleConfirm = () => {
        // Handle the logic to confirm and update all details to the database
        // This is where you would send all the details to your backend API

        // After updating, you can reset the editing state
        setEditedDetails({});
        setEditedValues({});
        onClose();
    };

    return (
        <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-1 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>Edit Order {detailId} </DialogHeader>
                <DialogBody>
                    <div class="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-800">
                            <thead className="text-xs text-gray-50 uppercase bg-gray-900 dark:bg-gray-200 dark:text-gray-900">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product picture
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        URL
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price (฿)
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total price (฿)
                                    </th>
                                    <th scope="col" className="sr-only">
                                        Tool
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.length > 0 ? (
                                    details.map((detail, index) => (
                                        <tr className="bg-gray-800 dark:bg-gray-100" key={detail.id}>
                                            {editedDetails[detail.id] ? (
                                                <>
                                                    <td scope="row" className="px-6 py-4 whitespace-nowrap dark:text-gray-900">
                                                        <input
                                                            type="text"
                                                            className="border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500 dark:text-gray-100"
                                                            value={editedValues.detail_name || detail.detail_name}
                                                            onChange={(e) => handleInputChange('detail_name', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="text"
                                                            className="border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500 dark:text-gray-100"
                                                            value={editedValues.detail_url || detail.detail_url}
                                                            onChange={(e) => handleInputChange('detail_url', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="number"
                                                            className="border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500 dark:text-gray-100"
                                                            value={editedValues.detail_quantity || detail.detail_quantity}
                                                            onChange={(e) => handleInputChange('detail_quantity', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="number"
                                                            className="border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500 dark:text-gray-100"
                                                            value={editedValues.detail_price || detail.detail_price}
                                                            onChange={(e) => handleInputChange('detail_price', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {detail.detail_price * detail.detail_quantity}
                                                    </td>
                                                    <td className="flex items-center px-6 py-4 space-x-3">
                                                        <FiCheckCircle
                                                            className='w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer'
                                                            onClick={() => handleSaveEdit(detail.id)}
                                                        />
                                                        <RiDeleteBin6Fill
                                                            className='w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer'
                                                            onClick={handleCancelEdit}
                                                        />
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <div className="relative">
                                                            <img
                                                                src={require(`./../../..${detail.detail_path}`)}
                                                                alt={detail.detail_name}
                                                                className="w-16 h-16 object-cover rounded-md"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                                <img
                                                                    src={require(`./../../..${detail.detail_path}`)}
                                                                    alt={detail.detail_name}
                                                                    className="max-w-full max-h-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap dark:text-gray-900">
                                                        {detail.detail_name}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        URL
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {detail.detail_quantity}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {detail.detail_price}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {detail.detail_price * detail.detail_quantity}
                                                    </td>
                                                    <td className="flex items-center px-6 py-4 space-x-3">
                                                        <FiEdit
                                                            className='w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer'
                                                            onClick={() => handleEdit(detail.id)}
                                                        />
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-gray-500 dark:text-gray-400 py-4">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                {details.length > 0 ? (
                                    <tr className="font-semibold text-gray-100 dark:text-gray-900">
                                        <th scope="row" className="px-6 py-3 text-base">Total</th>
                                        <td className="px-6 py-3">{details.reduce((total, detail) => total + detail.detail_quantity, 0)}</td>
                                        <td className="px-6 py-3">{details.reduce((total, detail) => total + detail.detail_price, 0)}</td>
                                        <td className="px-6 py-3">{details.reduce((total, detail) => total + detail.detail_price * detail.detail_quantity, 0)}</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center text-gray-500 dark:text-gray-400 py-4">
                                            No details found.
                                        </td>
                                    </tr>
                                )}
                            </tfoot>
                        </table>
                    </div>
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

export default DetailorderModal;