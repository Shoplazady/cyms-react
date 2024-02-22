import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { RiDeleteBin6Fill } from "react-icons/ri";

const DetailorderModal = ({ open, onClose, detailId }) => {

    const [details, setDetail] = useState([]);

    useEffect(() => {
        const fetchDetailData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/admin/detail/${detailId}`);
                const detailData = await response.json();


                setDetail(detailData.details);

                console.log('Detail Data:', detailData);
            } catch (error) {
                console.error('Error fetching detail data:', error);
            }
        };

        if (detailId) {
            fetchDetailData();
        }
    }, [detailId, open]);

    return (
        <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-1 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>Edit Order {detailId} </DialogHeader>
                <DialogBody>
                    <div class="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-800">
                            <thead class="text-xs text-gray-50 uppercase bg-gray-900 dark:bg-gray-200 dark:text-gray-900">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
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
                                        <tr className="bg-gray-800 dark:bg-gray-100">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap dark:text-gray-900">
                                                {detail.detail_name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {detail.detail_quantity}
                                            </td>
                                            <td className="px-6 py-4">
                                                {detail.detail_price}
                                            </td>
                                            <td className="px-6 py-4">
                                                {detail.detail_price * detail.detail_quantity}
                                            </td>
                                            <td className="px-6 py-4">
                                                <RiDeleteBin6Fill className='w-5 h-5 text-red-500 hover:text-red-700' />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center text-gray-500 dark:text-gray-400 py-4">
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
                                        <td className="px-6 py-3">{details.reduce((total, detail) => total + detail.detail_price*detail.detail_quantity, 0)}</td>
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
                    <Button onClick={onClose} className='bg-green-500 font-medium text-gray-100 hover:bg-green-600'>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>
    );
};

export default DetailorderModal;