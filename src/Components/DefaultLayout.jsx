import React from 'react';
import Header from './Header'; // Import your default header component

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="bg-stone-900 dark:bg-gray-50">
        <div className="flex h-screen overflow-hidden">
          <div class="flex flex-1 flex-col w-full">
          <Header />
            <main className='flex-1 h-full shadow-inner bg-stone-800 dark:bg-stone-100 duration-300 ease-linear overflow-y-auto'>
              <div className="mx-auto p-2 md:p-4 2xl:p-6">
              {children}
              </div>
            </main>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default DefaultLayout;
