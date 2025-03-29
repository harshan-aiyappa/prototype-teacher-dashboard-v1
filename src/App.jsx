import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import GradeDetailsPage from './pages/GradeDetailsPage';
import StudentProfilePage from './pages/StudentProfilePage';

// Create a theme with primary and secondary colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#3a86ff',
      light: '#d7e3ff',
    },
    secondary: {
      main: '#8338ec',
    },
    success: {
      main: '#38b000',
    },
    warning: {
      main: '#ff9f1c',
    },
    error: {
      main: '#ff006e',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/dashboard/*" element={
            isAuthenticated ? <Dashboard /> : <LoginPage onLogin={handleLogin} />
          } />
          <Route path="/grade/:gradeId" element={<GradeDetailsPage />} />
          <Route path="/student/:studentId" element={<StudentProfilePage />} />
        </Routes>
      </div>
        <p className="text-gray-400 text-center mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </ThemeProvider>
  );
}

export default App;