
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';
import Scorecard from '@/components/Scorecard';
import { useState } from 'react';

const Index = () => {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return user.role !== 'employee' ? <Dashboard /> : <Scorecard />;
      case 'scorecards':
        return <Scorecard />;
      default:
        return user.role !== 'employee' ? <Dashboard /> : <Scorecard />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default Index;
