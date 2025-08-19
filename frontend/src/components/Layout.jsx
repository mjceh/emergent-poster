import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;