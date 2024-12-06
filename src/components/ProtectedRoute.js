import { React, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkSessionStatus = async () => {
      try{
        const response = await fetch('/api/sessionChecker', {
          method: 'POST',
          credentials: 'include',
        })
        if(response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.isAuthenticated);
        }
      } catch (e) {
        alert("Couldn't Check the user authenticity for some reason")
        console.log(e);
      }
    }
    checkSessionStatus();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;