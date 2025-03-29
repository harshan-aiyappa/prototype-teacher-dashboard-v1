import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Avatar, Chip, LinearProgress } from '@mui/material';

function PerformerGridItem({ id, name, grade, class: className, course, score }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/student/${id}`);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Card 
      className="hover:transform hover:translate-y-[-2px] cursor-pointer transition-all"
      onClick={handleClick}
    >
      <CardContent>
        <Box className="flex justify-between items-center">
          <Box className="flex items-center gap-4">
            <Avatar className="bg-primary-light text-primary">
              {getInitials(name)}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" className="font-medium">
                {name}
              </Typography>
              <Box>
                <Chip 
                  label={`Grade ${grade}-${className.split('-')[1]} | ${course}`}
                  size="small"
                  color="success"
                  className="mt-1"
                />
              </Box>
            </Box>
          </Box>
          
          <Box className="text-right">
            <Typography variant="h6" className="font-semibold">
              {score}%
            </Typography>
            <Box className="w-16">
              <LinearProgress 
                variant="determinate" 
                value={score} 
                color="success"
                className="h-1 rounded-full mt-1"
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PerformerGridItem;