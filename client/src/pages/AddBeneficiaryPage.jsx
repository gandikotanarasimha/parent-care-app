import React, { useState } from 'react';
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
} from '@mui/material';

function AddBeneficiaryPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/requester/beneficiaries', {
        name,
        address,
        phone,
        notes,
      });
      setLoading(false);
      alert('Beneficiary added successfully!');
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to add beneficiary');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        Add a New Beneficiary
      </Typography>
      <Typography variant="body1" gutterBottom>
        Add the details of the person you will be requesting help for.
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Address (This will be the job location)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g., 123 Main St, Visakhapatnam"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          multiline
          rows={3}
          label="Notes (Optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g., Allergic to peanuts, speaks only Telugu."
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Save Beneficiary'}
        </Button>
      </Box>
    </Container>
  );
}

export default AddBeneficiaryPage;

// // File: client/src/pages/AddBeneficiaryPage.jsx (Corrected)

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AddBeneficiaryPage() {
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setPhone] = useState('');
//   const [notes, setNotes] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // Use the API route we already tested
//       await axios.post('/api/requester/beneficiaries', {
//         name,
//         address,
//         phone,
//         notes,
//       });
//       setLoading(false);
//       alert('Beneficiary added successfully!');
//       // Send them back to the dashboard where they can now create a request
//       navigate('/dashboard'); 
//     } catch (err) {
//       setLoading(false);
//       setError(err.response?.data?.message || 'Failed to add beneficiary');
//     }
//   };

//   return (
//     <div>
//       <h2>Add a New Beneficiary (Parent/Relative)</h2>
//       <p>Add the details of the person you will be requesting help for.</p>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Address (This will be the job location):</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="e.g., 123 Main St, Visakhapatnam"
//             required
//           />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Notes (Optional):</label>
//           <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             placeholder="e.g., Allergic to peanuts, speaks only Telugu."
//           />
//         </div>
        
//         <button type="submit" disabled={loading}>
//           {loading ? 'Saving...' : 'Save Beneficiary'}
//         </button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// }

// // This is the only export that should be at the end
// export default AddBeneficiaryPage;