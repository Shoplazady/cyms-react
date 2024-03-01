import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    const { first_name, last_name, email, id, level } = userData;

    let role;
    if (level === 1) {
      role = 'user';
    } else if (level === 3) {
      role = 'admin';
    } else {
      
      role = 'guest';
    }

    setUser({ first_name, last_name, email, role });

    Cookies.set('user', JSON.stringify({ first_name, last_name, email, role, id }), { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
