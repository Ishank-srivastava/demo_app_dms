import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { theme } from './theme';

// Components
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import DocumentsPage from './pages/documents/DocumentsPage';
import TasksPage from './pages/tasks/TasksPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import SettingsPage from './pages/settings/SettingsPage';

const App = () => {
  const location = useLocation();

  // Log route changes at root level
  useEffect(() => {
    const timestamp = new Date().toISOString();
    console.log('[App] Navigation:', JSON.stringify({
      path: location.pathname,
      search: location.search,
      state: location.state,
      timestamp
    }, null, 2));

    // Log redirects
    if (location.pathname === '/') {
      console.log('[App] Root path accessed, redirecting to /documents at:', timestamp);
    } else if (location.pathname === '/documents') {
      console.log('[App] Documents page accessed at:', timestamp);
    }
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/documents" replace />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch all - redirect to documents */}
          <Route path="*" element={<Navigate to="/documents" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
