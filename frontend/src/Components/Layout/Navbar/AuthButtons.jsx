import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const AuthButtons = () => {
  const { currentUser, logout, connectMetaMask } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleLogout = () => logout().then(() => navigate('/'));

  return (
    <div className={styles.authButtons}>
      {currentUser ? (
        <button onClick={handleLogout} className={styles.button}>
          Logout
        </button>
      ) : (
        <>
          <button onClick={handleLogin} className={styles.button}>
            Login
          </button>
          <button 
            onClick={connectMetaMask} 
            className={`${styles.button} ${styles.metaMaskButton}`}
          >
            <img src="/metamask-icon.png" alt="MetaMask" width={20} />
            Connect Wallet
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;