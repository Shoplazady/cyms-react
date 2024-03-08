import React, { useRef, useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { useAlert } from '../../Admin/components/AlertContext';
import SignatureCanvas from 'react-signature-canvas';

const Esignature = ({ open, onClose, userId }) => {
    const { showAlert } = useAlert();
    const signatureRef = useRef();
    const [hasSignature, setHasSignature] = useState(false);
    const [fetchingSignature, setFetchingSignature] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [signaturePath, setSignaturePath] = useState("");

    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/getSignature/${userId}`);

                if (response.status === 404) {
                    // User signature not found
                    setHasSignature(false);
                    setFetchingSignature(false);
                    setEditMode(true);
                    return;
                }

                const result = await response.json();

                if (response.ok) {
                    setSignaturePath(result.sigPath);
                    setHasSignature(true);
                } else {
                    console.error(`Error fetching signature: ${result.error}`);
                    showAlert('error', `Error fetching signature: ${result.error}`);
                }
            } catch (error) {
                console.error('Error fetching signature:', error.message);
                showAlert('error', `Error fetching signature: ${error.message}`);
            } finally {
                setFetchingSignature(false);
            }
        };

        if (userId) {
            fetchSignature();
        }
    }, [userId, showAlert]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleConfirm = async () => {
        try {
            const signatureData = signatureRef.current.toDataURL();
            onClose();
            const blob = await (await fetch(signatureData)).blob();
            const formData = new FormData();
            formData.append('signature', blob, 'signature.png');

            const endpoint = hasSignature
                ? `http://localhost:3001/api/user/editSignature/${userId}`
                : `http://localhost:3001/api/user/saveSignature/${userId}`;

            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to ${hasSignature ? 'edit' : 'save'} signature: ${response.statusText}`);
            }

            showAlert('success', `Signature ${hasSignature ? 'edited' : 'saved'} successfully!`);
        } catch (error) {
            console.error(`Error ${hasSignature ? 'editing' : 'saving'} signature:`, error.message);
            showAlert('error', `Error ${hasSignature ? 'editing' : 'saving'} signature: ${error.message}`);
        }
    };

    return (
        <Dialog
            open={open}
            handler={onClose}
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-5 text-gray-100 dark:text-gray-900"
        >
            <div className="max-w-xl bg-gray-700 dark:bg-gray-100 p-8 rounded-md overflow-y-auto max-h-screen">
                <DialogHeader>{hasSignature ? 'Edit' : 'Create'} Signature user ID: {userId}</DialogHeader>
                <DialogBody className="text-gray-100 dark:text-gray-900">
                    {editMode ? (
                        <div>
                            <SignatureCanvas
                                ref={signatureRef}
                                canvasProps={{ className: 'signature-canvas', width: 500, height: 300 }}
                            />
                        </div>
                    ) : (
                        <div>
                            <img className="w-64 h-64" src={signaturePath} alt="User Signature" />
                            {hasSignature && (
                                <Button
                                    onClick={handleEdit}
                                    className="bg-blue-500 text-white font-medium hover:bg-blue-600 mt-2"
                                >
                                    <span>Edit Signature</span>
                                </Button>
                            )}
                        </div>
                    )}
                </DialogBody>
                <DialogFooter className="space-x-1">
                    <Button onClick={onClose} className="bg-red-600 text-gray-100 font-medium hover:bg-red-700">
                        <span>Cancel</span>
                    </Button>
                    <Button onClick={() => signatureRef.current.clear()} className="bg-red-500 text-white">
                        Clear
                    </Button>
                    {editMode && (
                        <Button onClick={() => setEditMode(false)} className="bg-gray-500 text-white">
                            <span>Cancel Edit</span>
                        </Button>
                    )}
                    {!hasSignature && !editMode && (
                        <Button
                            onClick={handleEdit}
                            className="bg-blue-500 text-white font-medium hover:bg-blue-600"
                        >
                            <span>Edit Signature</span>
                        </Button>
                    )}
                    <Button onClick={handleConfirm} className="bg-green-600 font-medium text-gray-100 hover:bg-green-600">
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>
    );
}

export default Esignature;
