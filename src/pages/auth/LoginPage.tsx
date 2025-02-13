import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const from = (location.state as LocationState)?.from?.pathname || '/documents';

  // Log mount and navigation
  useEffect(() => {
    const mountTime = new Date().toISOString();
    console.log('[Login] Component mounted at:', mountTime, JSON.stringify({
      from,
      state: location.state,
      authLoading,
      isAuthenticated
    }, null, 2));

    return () => {
      console.log('[Login] Component unmounted. Mount time was:', mountTime);
    };
  }, []);

  // Handle authentication state changes
  useEffect(() => {
    console.log('[Login] Auth state updated:', JSON.stringify({ 
      isAuthenticated, 
      from,
      state: location.state 
    }, null, 2));

    if (isAuthenticated) {
      console.log('[Login] Authentication successful, navigating to:', JSON.stringify({
        path: from,
        replace: true,
        timestamp: new Date().toISOString()
      }, null, 2));
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from, location.state]);

  // Log loading state changes
  useEffect(() => {
    if (authLoading) {
      console.log('[Login] Auth loading state active');
    }
  }, [authLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    console.log('[Login] Submitting form:', JSON.stringify({ 
      username: formData.username,
      returnPath: from,
      timestamp
    }, null, 2));

    setIsLoading(true);
    setError('');

    try {
      await login(formData.username, formData.password);
      console.log('[Login] Login successful, waiting for auth state update');
    } catch (err) {
      console.error('[Login] Login error:', err);
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            sx={{ color: 'primary.main' }}
          >
            DMS
          </Typography>
          <Typography component="h2" variant="h5" gutterBottom>
            Sign in to your account
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
            Use admin / password to login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleInputChange}
              error={!!error}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!error}
              disabled={isLoading}
              helperText={error}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link
                href="#"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Implement forgot password functionality
                }}
              >
                Forgot password?
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
