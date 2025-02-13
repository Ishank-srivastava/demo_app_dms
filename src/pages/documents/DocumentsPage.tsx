import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const DocumentsPage = () => {
  const { user } = useAuth();

  // Log mount and navigation
  useEffect(() => {
    const mountTime = new Date().toISOString();
    console.log('[Documents] Page mounted:', JSON.stringify({
      user: user?.username,
      role: user?.role,
      timestamp: mountTime
    }, null, 2));

    return () => {
      console.log('[Documents] Page unmounted. Mount time was:', mountTime);
    };
  }, [user]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Document management functionality will be implemented in Phase 3
      </Typography>
    </Box>
  );
};

export default DocumentsPage;
