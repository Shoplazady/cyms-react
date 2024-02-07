import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

const DetailorderModal = ({ open, onClose }) => {
    return (
        <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-1 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>Edit Order</DialogHeader>
                <DialogBody>
                    <div class="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-800">
                            <thead class="text-xs text-gray-50 uppercase bg-gray-900 dark:bg-gray-200 dark:text-gray-900">
                                <tr>
                                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-800 dark:bg-gray-100">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap dark:text-gray-900">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="px-6 py-4">
                                        1
                                    </td>
                                    <td className="px-6 py-4">
                                        $2999
                                    </td>
                                </tr>
                                <tr className="bg-gray-800 dark:bg-gray-100">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap dark:text-gray-900">
                                        Microsoft Surface Pro
                                    </th>
                                    <td className="px-6 py-4">
                                        1
                                    </td>
                                    <td className="px-6 py-4">
                                        $1999
                                    </td>
                                </tr>
                                <tr className="bg-gray-800 dark:bg-gray-100">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap dark:text-gray-900">
                                        Magic Mouse 2
                                    </th>
                                    <td className="px-6 py-4">
                                        1
                                    </td>
                                    <td className="px-6 py-4">
                                        $99
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="font-semibold text-gray-100 dark:text-gray-900">
                                    <th scope="row" className="px-6 py-3 text-base">Total</th>
                                    <td className="px-6 py-3">3</td>
                                    <td className="px-6 py-3">21,000</td>
                                </tr>
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