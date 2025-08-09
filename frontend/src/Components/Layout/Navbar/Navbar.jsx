import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { NavLinks, AuthButtons, CoinBalance } from './'; // This imports from index.js
import styles from './Navbar.module.css'; // Make sure this path is correct

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">SavingsPlatform</Link>
      </div>
      
      <NavLinks role={currentUser?.role} />
      
      <div className={styles.rightSection}>
        {currentUser?.role === 'user' && <CoinBalance />}
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navbar;