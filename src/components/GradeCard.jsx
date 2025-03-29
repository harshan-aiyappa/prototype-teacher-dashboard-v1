import React from 'react';
import { Paper, Box, Typography, Grid, LinearProgress, Chip } from '@mui/material';

function GradeCard({ grade, completion, stats, onClick }) {
  const getCompletionColor = (value) => {
    if (value >= 85) return 'success';
    if (value >= 65) return 'warning';
    return 'error';
  };

  const getCompletionLabel = (value) => {
    if (value >= 85) return 'badge-success';
    if (value >= 65) return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <Paper 
      elevation={0} 
      className="p-5 cursor-pointer hover:transform hover:translate-y-[-2px] transition-all"
      onClick={onClick}
    >
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-semibold">
          Grade {grade}
        </Typography>
        <Chip 
          label={`${completion}% Avg. Completion`}
          size="small"
          className={`bg-opacity-15 ${getCompletionLabel(completion)}`}
          color={getCompletionColor(completion)}
        />
      </Box>
      
      <Box className="mb-4">
        <LinearProgress 
          variant="determinate" 
          value={completion} 
          color={getCompletionColor(completion)}
          className="h-2 rounded-full"
        />
      </Box>
      
      <Grid container spacing={2} className="text-center">
        <Grid item xs={3}>
          <Typography variant="h6" className="text-primary font-semibold">
            {stats.students}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Students
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" className="text-primary font-semibold">
            {stats.classes}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Classes
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" className="text-primary font-semibold">
            {stats.courses}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Courses
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" className="text-primary font-semibold">
            {stats.needsAttention}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Needs Attention
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default GradeCard;