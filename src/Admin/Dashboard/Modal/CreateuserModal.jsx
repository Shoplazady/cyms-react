import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

const CreateuserModal = ({ open, onClose }) => {
    return (
        <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-8 rounded-md">
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900'>
                    The key to more success is to have a lot of pillows. Put it this way,
                    it took me twenty-five years to get these plants, twenty-five years of
                    blood, sweat, and tears, and I'm never giving up, I'm just getting started.
                    I'm up to something. Fan luv.
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

export default CreateuserModal;