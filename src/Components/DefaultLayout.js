import React from 'react';
import Header from './Header'; // Import your default header component

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default DefaultLayout;
