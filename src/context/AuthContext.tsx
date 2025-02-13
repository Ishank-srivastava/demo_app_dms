import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for stored user on mount
  useEffect(() => {
    console.log('[Auth] Initializing auth state');
    const storedUser = localStorage.getItem('user');
    console.log('[Auth] Checking stored user:', storedUser);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('[Auth] Restored user session:', JSON.stringify(parsedUser, null, 2));
      } catch (error) {
        console.error('[Auth] Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    } else {
      console.log('[Auth] No stored session found');
    }

    console.log('[Auth] Initialization complete, clearing loading state');
    setIsLoading(false);
  }, []);

  // Log state changes
  useEffect(() => {
    const timestamp = new Date().toISOString();
    console.log('[Auth] State updated:', JSON.stringify({
      isAuthenticated: !!user,
      user: user?.username || null,
      isLoading,
      timestamp
    }, null, 2));

    if (!user && !isLoading) {
      console.log('[Auth] No active session - redirecting to login');
    } else if (user) {
      console.log('[Auth] Active session detected:', JSON.stringify({
        user: user.username,
        role: user.role,
        timestamp
      }, null, 2));
    }
  }, [user, isLoading]);

  const login = async (username: string, password: string) => {
    const timestamp = new Date().toISOString();
    console.log('[Auth] Login attempt:', JSON.stringify({ username, timestamp }, null, 2));
    
    try {
      console.log('[Auth] Setting loading state');
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (username === 'admin' && password === 'password') {
        const newUser = { username, role: 'admin' };
        localStorage.setItem('user', JSON.stringify(newUser));
        
        console.log('[Auth] Login successful:', JSON.stringify({
          user: newUser,
          timestamp: new Date().toISOString()
        }, null, 2));
        
        setUser(newUser);
        setIsLoading(false);
        
        console.log('[Auth] Redirecting to dashboard');
        navigate('/', { replace: true });
      } else {
        console.log('[Auth] Login failed: Invalid credentials');
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('[Auth] Login error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    console.log('[Auth] Logging out user:', user?.username);
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
