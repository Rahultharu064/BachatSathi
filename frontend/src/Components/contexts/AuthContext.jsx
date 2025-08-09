import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userData) => setCurrentUser(userData);
  const logout = () => setCurrentUser(null);
  const connectMetaMask = async () => {
    // MetaMask connection logic
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, connectMetaMask }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);