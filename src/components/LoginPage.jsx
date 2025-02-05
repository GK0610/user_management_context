import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, Alert, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext'; // Import UserContext
import '../components/LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const { users, login } = useContext(UserContext); // Access login function from context.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // Check if the user exists in the context and if the password matches
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      setError('Invalid email or password.');
      return;
    }

    // Login the user
    login(email, password);
    alert('Login successful!');

    // Console log and navigate to /users
    console.log('Navigating to /users');
    navigate('/users'); // Navigate to UsersPage after successful login
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


      {/* Login Content .*/}
      <Box className="login-page">
        <Box className="login-image"></Box>
        <Box className="login-container">
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Log In
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate>
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
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/signup')}
              sx={{ mt: 2 }}
            >
              Don't have an account? Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
