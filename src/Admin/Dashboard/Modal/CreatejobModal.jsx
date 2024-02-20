import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { useAlert } from './../../components/AlertContext';

const CreateJobModal = ({ open, onClose }) => {
    const { showAlert } = useAlert();

    const [jobName, setJobName] = useState('');
    const [jobStatus, setJobStatus] = useState('Inactive');

    const handleJobStatusChange = (e) => {
        setJobStatus(e.target.value);
    };

    const handleConfirm = async () => {
        try {
            
            const jobData = {
                job_name: jobName,
                job_status: jobStatus,
            };

            const response = await fetch('http://localhost:3001/api/admin/addjob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });

            const data = await response.json();
            console.log(data);

            // Close the modal
            onClose();

            // Show the alert
            showAlert('success', 'Job Position added successfully!');
        } catch (error) {
            console.error('Error:', error);
            // Handle error and show appropriate message
        }
    };

    return (
        <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900">
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>เพิ่มตำแหน่ง</DialogHeader>
                <DialogBody className='text-gray-100 dark:text-gray-900'>
                    <form>
                        <div className="mb-6">
                            <label htmlFor="job_name" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Job Position</label>
                            <input
                                type="text"
                                id="job_name"
                                value={jobName}
                                onChange={(e) => setJobName(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                                placeholder="ตำแหน่งงาน..."
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="job_status" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Job Status</label>
                            <select
                                id="job_status"
                                value={jobStatus}
                                onChange={handleJobStatusChange}
                                className="bg-gray-700 border border-gray-600 text-white text-md rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </form>
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
}

export default CreateJobModal;
