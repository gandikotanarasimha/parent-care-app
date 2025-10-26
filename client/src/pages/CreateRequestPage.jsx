import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

function CreateRequestPage() {
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const { data } = await axios.get('/api/requester/beneficiaries');
        setBeneficiaries(data);
        if (data.length > 0) {
          setBeneficiaryId(data[0]._id);
        } else {
          setError('You must add a beneficiary before you can post a request.');
        }
      } catch (err) {
        setError('Failed to load beneficiaries.');
      }
    };
    fetchBeneficiaries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/requester/service-requests', {
        beneficiaryId,
        title,
        description,
        serviceDate,
      });
      setLoading(false);
      alert('Help request posted successfully!');
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to post request');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        Post a New Help Request
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <FormControl fullWidth margin="normal" required disabled={beneficiaries.length === 0}>
          <InputLabel id="beneficiary-select-label">Who needs help?</InputLabel>
          <Select
            labelId="beneficiary-select-label"
            value={beneficiaryId}
            label="Who needs help?"
            onChange={(e) => setBeneficiaryId(e.target.value)}
          >
            {beneficiaries.map((b) => (
              <MenuItem key={b._id} value={b._id}>
                {b.name} ({b.address})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="normal"
          required
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Doctor's Appointment"
        />

        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please provide details of the task, location, and time."
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Date and Time"
          type="datetime-local"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading || beneficiaries.length === 0}
        >
          {loading ? <CircularProgress size={24} /> : 'Post Request'}
        </Button>
      </Box>
    </Container>
  );
}

export default CreateRequestPage;

// // File: client/src/pages/CreateRequestPage.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function CreateRequestPage() {
//   // State for the form fields
//   const [beneficiaryId, setBeneficiaryId] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [serviceDate, setServiceDate] = useState('');

//   // State for the list of beneficiaries
//   const [beneficiaries, setBeneficiaries] = useState([]);
  
//   // State for loading and errors
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   // --- 1. Fetch beneficiaries for the dropdown ---
//   useEffect(() => {
//     const fetchBeneficiaries = async () => {
//       try {
//         const { data } = await axios.get('/api/requester/beneficiaries');
//         setBeneficiaries(data);
//         if (data.length > 0) {
//           // Set the first one as default
//           setBeneficiaryId(data[0]._id);
//         }
//       } catch (err) {
//         setError('Failed to load beneficiaries. Please add one first.');
//       }
//     };
//     fetchBeneficiaries();
//   }, []); // Run once on page load

//   // --- 2. Handle form submission ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       await axios.post('/api/requester/service-requests', {
//         beneficiaryId,
//         title,
//         description,
//         serviceDate,
//       });
//       setLoading(false);
//       alert('Help request posted successfully!');
//       navigate('/dashboard'); // Go back to the dashboard
//     } catch (err) {
//       setLoading(false);
//       setError(err.response?.data?.message || 'Failed to post request');
//     }
//   };
  
//   if (beneficiaries.length === 0 && !error) {
//     return (
//       <div>
//         <p>Loading beneficiaries...</p>
//         <p>Note: You must add a beneficiary before you can post a request.</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h2>Post a New Help Request</h2>
//       <form onSubmit={handleSubmit}>
//         {/* --- Beneficiary Dropdown --- */}
//         <div>
//           <label>Who needs help?</label>
//           <select 
//             value={beneficiaryId} 
//             onChange={(e) => setBeneficiaryId(e.target.value)}
//           >
//             {beneficiaries.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.name} ({b.address})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* --- Title Field --- */}
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="e.g., Doctor's Appointment"
//             required
//           />
//         </div>

//         {/* --- Description Field --- */}
//         <div>
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Please provide details of the task, location, and time."
//             required
//           />
//         </div>

//         {/* --- Date Field --- */}
//         <div>
//           <label>Date and Time:</label>
//           <input
//             type="datetime-local"
//             value={serviceDate}
//             onChange={(e) => setServiceDate(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Posting...' : 'Post Request'}
//         </button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default CreateRequestPage;