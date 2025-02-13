import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const TasksPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log('[Tasks] Page rendered:', JSON.stringify({
      user: user?.username,
      role: user?.role,
      timestamp: new Date().toISOString()
    }, null, 2));
  }, [user]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Task management functionality will be implemented in Phase 2
      </Typography>
    </Box>
  );
};

export default TasksPage;
