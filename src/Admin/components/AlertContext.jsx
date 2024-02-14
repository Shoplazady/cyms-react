import React, { createContext, useContext, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => hideAlert(), 5000);
    };

    const hideAlert = () => {
        setAlert(null);
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alert && (
                <div
                    id="custom-alert"
                    className={`fixed top-4 right-4 z-50 flex items-center p-4 text-green-800 border-t-4 border-green-300 bg-green-50`}
                    role="alert"
                >
                    <div className="ms-3 text-sm font-medium">
                        {alert.message}
                    </div>
                    <button
                        type="button"
                        onClick={() => hideAlert()}
                        className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8"
                    >
                        <IoCloseSharp className='w-6 h-6' />
                    </button>
                </div>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);

    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }

    return context;
};
