import React from 'react';
import { useAuth } from '../context/AuthContext';
import RequesterDashboard from './RequesterDashboard';
import ProviderDashboard from './ProviderDashboard';

function DashboardPage() {
  const { user } = useAuth();

  // Check the user's role and render the correct dashboard
  if (!user) {
    return <h1>Loading...</h1>; // Or a redirect
  }

  if (user.role === 'Requester') {
    return <RequesterDashboard />;
  }
  
  if (user.role === 'Provider') {
    return <ProviderDashboard />;
  }

  // Fallback in case user has no role (shouldn't happen)
  return <h1>Invalid user role.</h1>;
}

export default DashboardPage;   