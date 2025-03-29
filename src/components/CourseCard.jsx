import React from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, Chip } from '@mui/material';

function CourseCard({ title, completion, students, completed }) {
  const getCompletionColor = (value) => {
    if (value >= 85) return 'success';
    if (value >= 65) return 'primary';
    return 'warning';
  };

  const getCompletionLabel = (value) => {
    if (value >= 85) return 'badge-success';
    if (value >= 65) return 'badge-primary';
    return 'badge-warning';
  };

  return (
    <Card 
      className="border-l-4 border-secondary hover:transform hover:translate-y-[-2px] cursor-pointer transition-all"
    >
      <CardContent>
        <Box className="flex justify-between items-center mb-3">
          <Typography variant="h6" className="font-medium">
            {title}
          </Typography>
          <Chip 
            label={`${completion}% Complete`}
            size="small"
            className={`bg-opacity-15 ${getCompletionLabel(completion)}`}
            color={getCompletionColor(completion)}
          />
        </Box>
        
        <Box className="mb-3">
          <LinearProgress 
            variant="determinate" 
            value={completion} 
            color={getCompletionColor(completion)}
            className="h-2 rounded-full"
          />
        </Box>
        
        <Box className="flex justify-between text-text-gray text-sm">
          <Typography variant="body2" color="textSecondary">
            {students} students enrolled
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {completed} completed
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CourseCard;