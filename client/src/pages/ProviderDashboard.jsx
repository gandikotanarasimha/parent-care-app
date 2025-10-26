import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';

function ProviderDashboard() {
  const [availableJobs, setAvailableJobs] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [jobsRes, invitesRes] = await Promise.all([
        axios.get('/api/provider/available-jobs'),
        axios.get('/api/provider/invitations'),
      ]);
      setAvailableJobs(jobsRes.data);
      setInvitations(invitesRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (jobId) => {
    try {
      if (!window.confirm('Are you sure you want to accept this job?')) {
        return;
      }
      await axios.put(`/api/provider/jobs/${jobId}/accept`);
      alert('Job Accepted!');
      fetchData(); // Refresh lists
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept job');
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        Provider Dashboard
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={4}>
        {/* --- Section 1: Direct Invitations --- */}
        <Grid item xs={12} md={6}>
          <Typography component="h2" variant="h5" gutterBottom>
            My Direct Invitations ({invitations.length})
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {invitations.length === 0 ? (
              <Typography>No new invitations.</Typography>
            ) : (
              invitations.map((job) => (
                <Paper key={job._id} elevation={2} sx={{ p: 2, borderColor: 'green', borderWidth: 2, borderStyle: 'solid' }}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2"><strong>From:</strong> {job.requesterId.name}</Typography>
                  <Typography variant="body2"><strong>Location:</strong> {job.location}</Typography>
                  <Typography variant="body2"><strong>Date:</strong> {new Date(job.serviceDate).toLocaleString()}</Typography>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAccept(job._id)}
                    sx={{ mt: 1 }}
                  >
                    Accept Invite
                  </Button>
                </Paper>
              ))
            )}
          </Box>
        </Grid>

        {/* --- Section 2: Public Job Board --- */}
        <Grid item xs={12} md={6}>
          <Typography component="h2" variant="h5" gutterBottom>
            Available Public Jobs ({availableJobs.length})
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {availableJobs.length === 0 ? (
              <Typography>No available jobs right now.</Typography>
            ) : (
              availableJobs.map((job) => (
                <Paper key={job._id} elevation={2} sx={{ p: 2 }}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2"><strong>From:</strong> {job.requesterId.name}</Typography>
                  <Typography variant="body2"><strong>Location:</strong> {job.location}</Typography>
                  <Typography variant="body2"><strong>Date:</strong> {new Date(job.serviceDate).toLocaleString()}</Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleAccept(job._id)}
                    sx={{ mt: 1 }}
                  >
                    Accept Job
                  </Button>
                </Paper>
              ))
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProviderDashboard;

// // File: client/src/pages/ProviderDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ProviderDashboard() {
//   const [availableJobs, setAvailableJobs] = useState([]);
//   const [invitations, setInvitations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch all data
//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Fetch both sets of data at the same time
//       const [jobsRes, invitesRes] = await Promise.all([
//         axios.get('/api/provider/available-jobs'),
//         axios.get('/api/provider/invitations'),
//       ]);
      
//       setAvailableJobs(jobsRes.data);
//       setInvitations(invitesRes.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch data');
//     }
//     setLoading(false);
//   };

//   // Fetch data when the component loads
//   useEffect(() => {
//     fetchData();
//   }, []); // The empty array [] means it only runs once

//   // Function to accept a job (works for both public jobs and invites)
//   const handleAccept = async (jobId) => {
//     try {
//       if (!window.confirm('Are you sure you want to accept this job?')) {
//         return;
//       }
      
//       await axios.put(`/api/provider/jobs/${jobId}/accept`);
//       alert('Job Accepted!');
      
//       // Refresh the lists after accepting
//       fetchData();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to accept job');
//     }
//   };

//   if (loading) return <p>Loading dashboard...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div>
//       <h2>Provider Dashboard</h2>

//       {/* --- Section 1: Direct Invitations --- */}
//       <h3>My Direct Invitations ({invitations.length})</h3>
//       {invitations.length === 0 ? (
//         <p>No new invitations.</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//           {invitations.map((job) => (
//             <div key={job._id} style={{ border: '1px solid green', padding: '10px' }}>
//               <h4>{job.title}</h4>
//               <p><strong>From:</strong> {job.requesterId.name}</p>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p><strong>Date:</strong> {new Date(job.serviceDate).toLocaleString()}</p>
//               <button onClick={() => handleAccept(job._id)}>Accept Invite</button>
//             </div>
//           ))}
//         </div>
//       )}

//       <hr style={{ margin: '20px 0' }} />

//       {/* --- Section 2: Public Job Board --- */}
//       <h3>Available Public Jobs ({availableJobs.length})</h3>
//       {availableJobs.length === 0 ? (
//         <p>No available jobs right now.</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//           {availableJobs.map((job) => (
//             <div key={job._id} style={{ border: '1px solid black', padding: '10px' }}>
//               <h4>{job.title}</h4>
//               <p><strong>From:</strong> {job.requesterId.name}</p>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p><strong>Date:</strong> {new Date(job.serviceDate).toLocaleString()}</p>
//               <button onClick={() => handleAccept(job._id)}>Accept Job</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProviderDashboard;