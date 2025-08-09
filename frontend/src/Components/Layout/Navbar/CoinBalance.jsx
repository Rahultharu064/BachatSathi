import React from 'react';
import { useCoins } from '../../contexts/CoinContext';
import styles from './Navbar.module.css'; // uncomment this

const CoinBalance = () => {
  const { coins } = useCoins();

  return (
    <div className={styles.coinBalance}>
      <span className={styles.coinIcon}>🪙</span>
      <span className={styles.coinAmount}>{coins || 0}</span>
      <span className={styles.coinLabel}>Coins</span>
    </div>
  );
};

export default CoinBalance;
