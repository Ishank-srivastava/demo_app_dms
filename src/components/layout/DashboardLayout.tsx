import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Log mount and navigation
  useEffect(() => {
    console.log('[Dashboard] Layout mounted:', JSON.stringify({
      user: user?.username,
      role: user?.role,
      timestamp: new Date().toISOString()
    }, null, 2));

    return () => {
      console.log('[Dashboard] Layout unmounted');
    };
  }, [user]);

  // Log route changes in protected area
  useEffect(() => {
    console.log('[Dashboard] Navigation:', JSON.stringify({
      path: location.pathname,
      user: user?.username,
      role: user?.role,
      timestamp: new Date().toISOString()
    }, null, 2));
  }, [location.pathname, user]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
