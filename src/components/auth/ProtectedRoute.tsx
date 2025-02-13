import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('[Route] Protected route check:', JSON.stringify({
      path: location.pathname,
      isAuthenticated,
      isLoading,
      user: user?.username || null,
      timestamp: new Date().toISOString()
    }, null, 2));

    if (isLoading) {
      console.log('[Route] Loading authentication state');
    } else if (!isAuthenticated) {
      console.log('[Route] Not authenticated, redirecting to login with return path:', JSON.stringify({
        from: location.pathname,
        state: location.state
      }, null, 2));
    } else {
      console.log('[Route] Authentication verified, rendering protected content:', JSON.stringify({
        path: location.pathname,
        user: user?.username,
        role: user?.role,
        timestamp: new Date().toISOString()
      }, null, 2));
    }
  }, [isAuthenticated, isLoading, location, user]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
