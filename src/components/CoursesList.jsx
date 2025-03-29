import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, InputAdornment, Grid, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import CourseCard from './CourseCard';

function CoursesList() {
  const [gradeFilter, setGradeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const courses = [
    {
      id: 1,
      title: 'French Basic',
      completion: 87,
      students: 78,
      completed: 68,
    },
    {
      id: 2,
      title: 'French Intermediate',
      completion: 85,
      students: 65,
      completed: 55,
    },
    {
      id: 3,
      title: 'French Advanced',
      completion: 68,
      students: 42,
      completed: 28,
    },
    {
      id: 4,
      title: 'Basic Grammar',
      completion: 92,
      students: 85,
      completed: 78,
    },
    {
      id: 5,
      title: 'Advanced Vocabulary',
      completion: 76,
      students: 70,
      completed: 53,
    },
    {
      id: 6,
      title: 'Conversation Skills',
      completion: 75,
      students: 65,
      completed: 49,
    },
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box className="mb-6">
        <Typography variant="h6" className="font-semibold mb-2">
          Course Completion
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mb-4">
          Overview of course completion across all grades and classes
        </Typography>
        
        <Box className="h-72 mb-6">
          <canvas id="courseCompletionChart"></canvas>
        </Box>
      </Box>
      
      <Box className="mb-6">
        <Typography variant="h6" className="font-semibold mb-4">
          Course Details
        </Typography>
        
        <Box className="flex flex-wrap gap-4 mb-6">
          <TextField
            placeholder="Search courses..."
            variant="outlined"
            size="small"
            className="flex-grow min-w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            select
            variant="outlined"
            size="small"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="w-40"
          >
            <MenuItem value="all">All Grades</MenuItem>
            <MenuItem value="8">Grade 8</MenuItem>
            <MenuItem value="9">Grade 9</MenuItem>
            <MenuItem value="10">Grade 10</MenuItem>
          </TextField>
        </Box>
        
        <Grid container spacing={3}>
          {filteredCourses.map(course => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard {...course} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default CoursesList;