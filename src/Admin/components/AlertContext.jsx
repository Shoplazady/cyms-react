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
                // Render your alert component here using the alert state
                <div
                    id="custom-alert"
                    className={`fixed top-4 right-4 z-50 flex items-center p-4 text-green-800 border-t-4 border-green-300 bg-green-50`}
                    role="alert"
                >
                    {alert.message}
                    <button
                        type="button"
                        onClick={() => hideAlert()}
                        className="ml-auto p-2 text-green-500 hover:text-green-700 hover:bg-green-100"
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
