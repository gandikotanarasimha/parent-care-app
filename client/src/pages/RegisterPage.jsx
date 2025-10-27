// File: client/src/pages/RegisterPage.jsx (Corrected)

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// --- Import MUI Components ---
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link as MuiLink,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

function RegisterPage() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Requester');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // --- THIS IS THE UPDATED FUNCTION ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/auth/register', {
        name,
        email,
        password,
        phone,
        role,
      });

      setLoading(false);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setLoading(false);
      // --- THIS IS THE NEW, ROBUST ERROR HANDLING ---
      if (err.response) {
        // The server responded with a status code (e.g., 401, 500)
        setError(err.response.data.message || 'Registration failed');
      } else if (err.request) {
        // The request was made but no response was received
        setError('Server is not responding. Please try again in 30 seconds.');
      } else {
        // Something else happened
        setError(err.message || 'An unknown error occurred');
      }
    }
  };
  // --- END OF UPDATED FUNCTION ---

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone Number"
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">I am a...</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="I am a..."
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="Requester">Requester (Looking for help)</MenuItem>
              <MenuItem value="Provider">Provider (Offering help)</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          
          <MuiLink component={RouterLink} to="/login" variant="body2">
            {"Already have an account? Sign In"}
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;