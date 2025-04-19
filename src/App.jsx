import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { DashboardProvider } from './context/DashboardContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Company from './pages/Company';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import './App.css'
import CompanyList from './components/companies/CompanyList';
import ErrorBoundary from './components/ErrorBoundary';
import CompanyDetails from './pages/CompanyDetails';
import Companies from './pages/Companies';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NotificationProvider>
          <DashboardProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Protected routes that require authentication */}
                <Route element={<ProtectedRoute allowedRoles={['student', 'placement_officer']} />}>
                  <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/companies/:id" element={<CompanyDetails />} />
                  </Route>
                </Route>
                
                {/* Student-only routes */}
                <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                  <Route element={<Layout />}>
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                </Route>
                
                {/* Default redirect */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Router>
          </DashboardProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
