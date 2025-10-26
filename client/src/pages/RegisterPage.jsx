// File: client/src/pages/RegisterPage.jsx

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
  const [role, setRole] = useState('Requester'); // Default role

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      navigate('/login'); // Redirect to login
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

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

// // File: client/src/pages/RegisterPage.jsx

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import for redirection

// function RegisterPage() {
//   // --- State for all form fields ---
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [role, setRole] = useState('Requester'); // Default to 'Requester'

//   // --- State for loading and errors ---
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // Hook for redirection

//   // --- Handle form submission ---
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form refresh
//     setLoading(true);
//     setError(null);

//     try {
//       // --- Send data to backend API ---
//       // We use '/api' because of the proxy we set in vite.config.js
//       await axios.post('/api/auth/register', {
//         name,
//         email,
//         password,
//         phone,
//         role,
//       });

//       // If successful:
//       setLoading(false);
//       alert('Registration successful! Please log in.');
//       navigate('/login'); // Redirect to login page
//     } catch (err) {
//       // If error:
//       setLoading(false);
//       // Get error message from the backend response
//       setError(err.response.data.message || 'Registration failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Register a New Account</h2>
//       <form onSubmit={handleSubmit}>
//         {/* --- Name Field --- */}
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         {/* --- Email Field --- */}
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         {/* --- Password Field --- */}
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         {/* --- Phone Field --- */}
//         <div>
//           <label>Phone:</label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>

//         {/* --- Role Field (Dropdown) --- */}
//         <div>
//           <label>I am a:</label>
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="Requester">Requester (Looking for help)</option>
//             <option value="Provider">Provider (Offering help)</option>
//           </select>
//         </div>

//         {/* --- Submit Button --- */}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>

//         {/* --- Error Message --- */}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default RegisterPage;