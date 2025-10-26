import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';

function RequesterDashboard() {
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/requester/service-requests');
      setMyRequests(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch requests');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        Requester Dashboard
      </Typography>

      <Box style={{ display: 'flex', gap: '10px', margin: '10px 0 20px 0' }}>
        <Button
          component={Link}
          to="/create-request"
          variant="contained"
          color="primary"
          style={{ fontSize: '1em', padding: '10px 15px' }}
        >
          + Post a New Help Request
        </Button>
        <Button
          component={Link}
          to="/add-beneficiary"
          variant="outlined"
          style={{ padding: '10px 15px' }}
        >
          + Add a New Beneficiary
        </Button>
      </Box>
      
      <Typography component="h2" variant="h5" gutterBottom>
        My Help Requests
      </Typography>
      
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      
      {!loading && myRequests.length === 0 && (
        <Typography>You have not posted any requests yet.</Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {myRequests.map((request) => (
          <Paper key={request._id} elevation={2} sx={{ padding: '16px' }}>
            <Typography variant="h6">{request.title}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Beneficiary:</strong> {request.beneficiaryId.name}
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong> {request.status}
            </Typography>
            <Typography variant="body2">
              <strong>Provider:</strong> 
              {request.providerId ? request.providerId.name : 'Waiting for a provider'}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default RequesterDashboard;

// // File: client/src/pages/RequesterDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Container, Typography, Button, Box, Paper, CircularProgress, Alert } from '@mui/material'; // <-- IMPORT MUI

// function RequesterDashboard() {
//   const [myRequests, setMyRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchMyRequests = async () => {
//     // ... (your fetchMyRequests function is fine) ...
//   };

//   useEffect(() => {
//     fetchMyRequests();
//   }, []);

//   return (
//     // --- WRAP EVERYTHING IN A CONTAINER ---
//     <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
//       <Typography component="h1" variant="h4" gutterBottom>
//         Requester Dashboard
//       </Typography>

//       <Box style={{ display: 'flex', gap: '10px', margin: '10px 0 20px 0' }}>
//         <Button 
//           component={Link} 
//           to="/create-request" 
//           variant="contained"
//           color="primary"
//         >
//           + Post a New Help Request
//         </Button>
//         <Button 
//           component={Link} 
//           to="/add-beneficiary" 
//           variant="outlined"
//         >
//           + Add a New Beneficiary
//         </Button>
//       </Box>
      
//       <Typography component="h2" variant="h5" gutterBottom>
//         My Help Requests
//       </Typography>
      
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
      
//       {!loading && myRequests.length === 0 && (
//         <Typography>You have not posted any requests yet.</Typography>
//       )}

//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//         {myRequests.map((request) => (
//           <Paper key={request._id} elevation={2} sx={{ padding: '16px' }}>
//             <Typography variant="h6">{request.title}</Typography>
//             <Typography variant="body2">
//               <strong>Beneficiary:</strong> {request.beneficiaryId.name}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Status:</strong> {request.status}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Provider:</strong> 
//               {request.providerId ? request.providerId.name : 'Waiting for a provider'}
//             </Typography>
//           </Paper>
//         ))}
//       </Box>
//     </Container>
//   );
// }

// export default RequesterDashboard;