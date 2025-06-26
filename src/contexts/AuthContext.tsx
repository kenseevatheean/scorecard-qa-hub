
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'qa_officer' | 'manager' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'qa_officer',
    department: 'Quality Assurance'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'manager',
    department: 'Customer Support'
  },
  {
    id: '3',
    name: 'Jane Doe',
    email: 'jane.doe@company.com',
    role: 'employee',
    department: 'Asset Team'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('qa_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('qa_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock authentication - simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any password as long as the email exists
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && password.length > 0) {
        console.log('Login successful for:', foundUser.email);
        setUser(foundUser);
        localStorage.setItem('qa_user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('qa_user');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
