import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';
import { SmartToy as SmartToyIcon } from '@mui/icons-material';

function Header() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" className="text-primary font-semibold" sx={{ flexGrow: 1 }}>
          Lingotran - Teacher Dashboard
        </Typography>
        <Box className="flex items-center gap-4">
          <Box 
            className="flex items-center gap-2 bg-primary-light text-primary px-4 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors"
          >
            <SmartToyIcon fontSize="small" />
            <Typography variant="body2" className="font-medium">Ask AI</Typography>
          </Box>
          <Box className="flex items-center gap-3 cursor-pointer">
            <Avatar className="bg-primary-light text-primary w-9 h-9">T</Avatar>
            <Typography variant="body2">Teacher</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;