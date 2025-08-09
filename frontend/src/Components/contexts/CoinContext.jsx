import { createContext, useContext, useState } from 'react';

const CoinContext = createContext();

export function CoinProvider({ children }) {
  const [coins, setCoins] = useState(0);

  return (
    <CoinContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinContext.Provider>
  );
}

export const useCoins = () => useContext(CoinContext);