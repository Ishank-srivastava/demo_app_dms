import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const SettingsPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log('[Settings] Page rendered:', JSON.stringify({
      user: user?.username,
      role: user?.role,
      timestamp: new Date().toISOString()
    }, null, 2));
  }, [user]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="textSecondary">
        System settings and configuration will be implemented in Phase 5
      </Typography>
    </Box>
  );
};

export default SettingsPage;
