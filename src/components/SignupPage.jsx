import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Alert,
  AppBar,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext'; // Import UserContext
import '../components/SignupPage.css'; // Import the CSS file

const SignupPage = () => {
  const { signup } = useContext(UserContext); // Access signup function from context
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate terms of use
    if (!termsAccepted) {
      setError('You must agree to the Terms of Use.');
      return;
    }

    // Validate passwords match
    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validate required fields
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // Check if email is already registered (Checking within the context)
    if (isEmailTaken(email)) {
      setError('Email is already in use.');
      return;
    }

    // Save user details in the context with only email and password
    const newUser = { fullName, email, username, password }; // Pass all fields to the register function
    signup(newUser); // Use signup instead of register

    alert('Signup successful! You can now log in.');
    navigate('/login'); // Redirect to login page after signup
  };

  // Simulate check for existing email (Check in context)
  const isEmailTaken = (email) => {
    // For now, assume email doesn't exist (implement checking logic if needed)
    return false;
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>
            User Management
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* Signup Content */}
      <Box className="signup-page">
        <Box className="signup-image"></Box>
        <Box className="signup-container">
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Sign Up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Full Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="Repeat Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
              }
              label="I agree to the Terms of Use"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Already have an account? Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
