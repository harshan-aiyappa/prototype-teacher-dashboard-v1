import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, Box, Typography, Avatar } from '@mui/material';

function TopPerformerItem({ id, rank, name, grade, class: className, course, score }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/student/${id}`);
  };

  return (
    <ListItem 
      className="border-b border-mid-gray hover:bg-light-gray cursor-pointer p-4"
      onClick={handleClick}
    >
      <Box className="flex items-center w-full">
        <Avatar 
          className="w-6 h-6 bg-secondary text-white text-xs font-semibold mr-3 flex-shrink-0"
        >
          {rank}
        </Avatar>
        
        <Box className="flex-grow">
          <Typography variant="subtitle2" className="font-medium">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Grade {grade}-{className.split('-')[1]} | {course}
          </Typography>
        </Box>
        
        <Typography variant="subtitle1" className="font-semibold text-secondary">
          {score}%
        </Typography>
      </Box>
    </ListItem>
  );
}

export default TopPerformerItem;