// File: client/src/App.jsx (Corrected)

import React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// --- Import MUI Components ---
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container, // <-- This import is needed
} from '@mui/material';

// Page Components
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateRequestPage from './pages/CreateRequestPage.jsx';
import AddBeneficiaryPage from './pages/AddBeneficiaryPage.jsx';

// --- THIS IS THE FIX: WRAP THE HOMEPAGE IN A CONTAINER ---
const HomePage = () => (
  <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
    <Typography variant="h4">Welcome to Parent Care</Typography>
    <Typography>The all-in-one solution for your family's needs.</Typography>
  </Container>
);

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div>
      <CssBaseline /> 

      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
          >
            ParentCare App
          </Typography>

          {isAuthenticated ? (
            <>
              <Button component={RouterLink} to="/dashboard" color="inherit">
                Dashboard
              </Button>
              <Button onClick={logout} color="inherit">
                Logout
              </Button>
              <Typography sx={{ ml: 2 }}>Hi, {user.name}</Typography>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit">
                Login
              </Button>
              <Button component={RouterLink} to="/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Page Content Area */}
      <Box component="main" sx={{ p: 0 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-request" element={<CreateRequestPage />} />
            <Route path="/add-beneficiary" element={<AddBeneficiaryPage />} />
          </Route>
        </Routes>
      </Box>
    </div>
  );
}

export default App;
