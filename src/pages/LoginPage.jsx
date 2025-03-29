import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Divider, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '../components/MicrosoftIcon';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('teacher@example.com');
  const [password, setPassword] = useState('password123');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onLogin();
    }
  };

  const handleDemoLogin = () => {
    onLogin();
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary p-5"
    >
      <Container maxWidth="sm">
        <Paper elevation={0} className="p-8 rounded-card">
          <Box className="text-center mb-6">
            <Typography variant="h4" component="h1" className="text-primary font-semibold">
              Lingotran
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Teacher Dashboard
            </Typography>
          </Box>
          
          <form onSubmit={handleSubmit}>
            <Box className="mb-4">
              <Typography variant="subtitle2" className="mb-2 font-medium">
                Email
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
            </Box>
            
            <Box className="mb-4">
              <Typography variant="subtitle2" className="mb-2 font-medium">
                Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
              />
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="py-3"
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="success"
              className="py-3 mt-2"
              onClick={handleDemoLogin}
            >
              Demo Login (No Credentials Required)
            </Button>
          </form>
          
          <Box className="my-6 relative">
            <Divider>
              <Typography variant="body2" color="textSecondary" className="px-3 bg-white">
                OR
              </Typography>
            </Divider>
          </Box>
          
          <Box className="flex flex-col gap-3">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleDemoLogin}
              className="py-3 justify-start"
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<MicrosoftIcon />}
              onClick={handleDemoLogin}
              className="py-3 justify-start"
            >
              Sign in with Microsoft
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;