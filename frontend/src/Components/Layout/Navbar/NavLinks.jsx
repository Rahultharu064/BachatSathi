import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = ({ role }) => {
  return (
    <ul className={styles.navLinks}>
      {/* Common Links */}
      <li><Link to="/about">About</Link></li>
      
      {/* User-specific Links */}
      {role === 'user' && (
        <>
          <li><Link to="/goals">My Goals</Link></li>
          <li><Link to="/spin-rewards">Spin Rewards</Link></li>
          <li><Link to="/vendors">Vendors</Link></li>
        </>
      )}
      
      {/* Vendor-specific Links */}
      {role === 'vendor' && (
        <li><Link to="/my-bids">My Bids</Link></li>
      )}
      
      {/* Admin-specific Links */}
      {role === 'admin' && (
        <li><Link to="/admin-dashboard">Admin</Link></li>
      )}
    </ul>
  );
};

export default NavLinks;