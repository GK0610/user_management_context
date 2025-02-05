import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { UserProvider, UserContext } from './Contexts/UserContext'; // Import UserContext

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UsersPage from './components/UsersPage';
import HomePage from './components/HomePage';

// NavBar Component
const NavBar = () => {
  const { isLoggedIn, logout } = useContext(UserContext); // Use Context to access login state
  const navigate = useNavigate(); // Get the navigate function
  const location = useLocation(); // Get the current location (route)

  // Don't render NavBar on login or signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  // Logout function
  const handleLogout = () => {
    logout(); // Call logout from context
    navigate('/login'); // Redirect to login page after logout.
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(UserContext);
  return isLoggedIn ? element : <Navigate to="/login" />;
};

// App Component
function App() {
  return (
    <UserProvider> {/* Wrap app with UserProvider to provide global state */}
      <Router>
        <Box>
          <NavBar /> {/* This will render the Navbar on every page */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Protected Route: Users Page */}
            <Route path="/users" element={<ProtectedRoute element={<UsersPage />} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Router>
    </UserProvider>
  );
}

export default App;
