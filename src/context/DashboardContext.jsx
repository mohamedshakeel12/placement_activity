import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DashboardContext = createContext();

const MOCK_DATA = {
  stats: {
    year: 2024,
    totalStudents: 800,
    studentsPlaced: 450,
    companies: 85,
    offers: 520,
    students: 500,
    averageCTC: 8.5,
    packageDistribution: [
      { count: 200, range: "3-5 LPA", package: "3-5 LPA" },
      { count: 100, range: "5-9 LPA", package: "5-9 lpa" },
      { count: 75, range: "10-16 LPA", package: "10-16 lpa" },
      { count: 25, range: "16+ LPA", package: "16 lpa above" }
    ],
    upcomingCompanies: [
      {
        id: 1,
        name: 'Google',
        date: '2024-03-01',
        role: 'Software Engineer',
        package: '25-30 LPA'
      },
      {
        id: 2,
        name: 'Microsoft',
        date: '2024-03-05',
        role: 'Software Development Engineer',
        package: '20-25 LPA'
      },
      {
        id: 3,
        name: 'Amazon',
        date: '2024-03-10',
        role: 'SDE-1',
        package: '18-22 LPA'
      },
      {
        id: 4,
        name: 'Apple',
        date: '2024-03-15',
        role: 'iOS Developer',
        package: '30-35 LPA'
      },
      {
        id: 5,
        name: 'Meta',
        date: '2024-03-20',
        role: 'Software Engineer',
        package: '45-50 LPA'
      },
      {
        id: 6,
        name: 'Netflix',
        date: '2024-03-25',
        role: 'Software Engineer',
        package: '40-45 LPA'
      },
      {
        id: 7,
        name: 'Adobe',
        date: '2024-03-28',
        role: 'Software Development Engineer',
        package: '18-22 LPA'
      },
      {
        id: 8,
        name: 'Oracle',
        date: '2024-04-01',
        role: 'Associate Software Engineer',
        package: '15-18 LPA'
      },
      {
        id: 9,
        name: 'Intel',
        date: '2024-04-05',
        role: 'Software Engineer',
        package: '16-20 LPA'
      },
      {
        id: 10,
        name: 'Nvidia',
        date: '2024-04-10',
        role: 'CUDA Developer',
        package: '20-25 LPA'
      }
    ]
  }
};

export const DashboardProvider = ({ children }) => {
  const [stats, setStats] = useState(MOCK_DATA.stats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // For now, let's just use the mock data directly
        setStats(MOCK_DATA.stats);
        setError(null);
      } catch (err) {
        console.error('Dashboard Error:', err);
        setError(err.message || 'Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Add this console.log to verify the data being provided
  console.log('DashboardContext stats:', stats);

  return (
    <DashboardContext.Provider value={{ stats, loading, error }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}; 