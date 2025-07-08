import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const hasShownToast = useRef(false); // ✅ Prevent duplicate toasts

  useEffect(() => {
    if ((!user || !user.token) && !hasShownToast.current) {
      toast.error("You must be logged in to access the checkout page.");
      hasShownToast.current = true; // ✅ Set to true after showing
    }
  }, [user]);

  if (!user || !user.token) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
