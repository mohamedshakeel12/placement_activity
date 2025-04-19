import React, { createContext, useState, useContext, useEffect } from 'react';

// Sample user data for testing
const SAMPLE_USERS = [
  {
    id: 1,
    email: 'student@example.com',
    password: 'student123',
    role: 'student',
    name: 'John Doe',
    department: 'Computer Science',
    rollNo: '2021001',
    skills: ['React', 'JavaScript', 'Node.js'],
    cgpa: 8.7
  },
  {
    id: 2,
    email: 'placement@example.com',
    password: 'officer123',
    role: 'placement_officer',
    name: 'Jane Smith',
    department: 'Placement Cell',
    staffId: 'PO-2023-001'
  }
];

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    console.log('Stored user from localStorage:', storedUser); // Debug log
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed user:', parsedUser); // Debug log
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log('Login attempt with:', email); // Debug log
    
    // For testing purposes, we'll use the sample users
    return new Promise((resolve, reject) => {
      const user = SAMPLE_USERS.find(
        (u) => u.email === email && u.password === password
      );

      console.log('Found user:', user); // Debug log

      if (user) {
        // Create a copy without the password
        const { password: _, ...userWithoutPassword } = user;
        
        // Store user in state and localStorage
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        // Create a mock token (in real app, this would come from the server)
        const mockToken = btoa(JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', mockToken);

        console.log('User logged in successfully:', userWithoutPassword); // Debug log
        
        resolve(userWithoutPassword);
      } else {
        console.log('Login failed: Invalid credentials'); // Debug log
        reject(new Error('Invalid email or password'));
      }
    });
  };

  const logout = () => {
    console.log('Logging out user:', currentUser); // Debug log
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  const isStudent = () => {
    return currentUser?.role === 'student';
  };

  const isPlacementOfficer = () => {
    return currentUser?.role === 'placement_officer';
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    };
  };

  const value = {
    currentUser,
    login,
    logout,
    isStudent,
    isPlacementOfficer,
    getAuthHeaders
  };

  console.log('AuthContext current value:', { currentUser, loading }); // Debug log

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 