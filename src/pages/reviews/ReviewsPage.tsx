import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const ReviewsPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log('[Reviews] Page rendered:', JSON.stringify({
      user: user?.username,
      role: user?.role,
      timestamp: new Date().toISOString()
    }, null, 2));
  }, [user]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Review management functionality will be implemented in Phase 4
      </Typography>
    </Box>
  );
};

export default ReviewsPage;
