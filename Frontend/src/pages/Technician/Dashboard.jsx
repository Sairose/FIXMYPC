import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Home } from '../../components/client-techHome/Home';


const TechnicianDashboard = () => {
  const { user } = useAuth();

  return (
    <Home/>
  );
};

export default TechnicianDashboard;
