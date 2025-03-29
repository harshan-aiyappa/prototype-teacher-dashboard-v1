import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, InputAdornment, Grid, Button, List, Chip } from '@mui/material';
import { Search as SearchIcon, FormatListBulleted, GridView } from '@mui/icons-material';
import TopPerformerItem from './TopPerformerItem';
import PerformerGridItem from './PerformerGridItem';

function PerformersList() {
  const [viewMode, setViewMode] = useState('list');
  const [courseFilter, setCourseFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const performers = [
    {
      id: 1,
      name: 'Sophie Martin',
      grade: 10,
      class: '10-A',
      course: 'French Advanced',
      score: 98,
    },
    {
      id: 2,
      name: 'Jean Dupont',
      grade: 10,
      class: '10-C',
      course: 'French Advanced',
      score: 96,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      grade: 9,
      class: '9-A',
      course: 'French Intermediate',
      score: 95,
    },
    {
      id: 4,
      name: 'Michael Chen',
      grade: 10,
      class: '10-C',
      course: 'French Advanced',
      score: 93,
    },
    {
      id: 5,
      name: 'Olivia Moore',
      grade: 9,
      class: '9-B',
      course: 'French Intermediate',
      score: 92,
    },
    {
      id: 6,
      name: 'Alex Johnson',
      grade: 8,
      class: '8-A',
      course: 'Basic Grammar',
      score: 95,
    },
    {
      id: 7,
      name: 'Emily Brown',
      grade: 9,
      class: '9-A',
      course: 'Advanced Vocabulary',
      score: 93,
    },
  ];

  const filteredPerformers = performers.filter(performer => {
    const matchesSearch = performer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        performer.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = courseFilter === 'all' || 
                        (courseFilter === 'french' && performer.course.includes('French')) ||
                        (courseFilter === 'grammar' && performer.course.includes('Grammar')) ||
                        (courseFilter === 'vocabulary' && performer.course.includes('Vocabulary'));
    
    const matchesGrade = gradeFilter === 'all' || performer.grade.toString() === gradeFilter;
    
    return matchesSearch && matchesCourse && matchesGrade;
  });

  return (
    <Box>
      <Box className="mb-6">
        <Typography variant="h6" className="font-semibold mb-2">
          Student Performance by Course
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mb-4">
          View top performers across all courses and grades
        </Typography>
        
        <Box className="flex flex-wrap justify-between gap-4 mb-6">
          <Box className="flex flex-wrap gap-4">
            <TextField
              select
              variant="outlined"
              size="small"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-48"
            >
              <MenuItem value="all">All Courses</MenuItem>
              <MenuItem value="french">French Courses</MenuItem>
              <MenuItem value="grammar">Grammar Courses</MenuItem>
              <MenuItem value="vocabulary">Vocabulary Courses</MenuItem>
            </TextField>
            
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
          
          <Box className="flex gap-2">
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              color="primary"
              startIcon={<FormatListBulleted />}
              onClick={() => setViewMode('list')}
            >
              List View
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              color="primary"
              startIcon={<GridView />}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </Button>
          </Box>
        </Box>
        
        <Box className="h-72 mb-6">
          <canvas id="performersChart"></canvas>
        </Box>
      </Box>
      
      <Box className="mb-6">
        <Typography variant="h6" className="font-semibold mb-4">
          Top Performers
        </Typography>
        
        <TextField
          placeholder="Search students..."
          variant="outlined"
          size="small"
          fullWidth
          className="mb-6"
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
        
        {viewMode === 'list' && (
          <List>
            {filteredPerformers.map((performer, index) => (
              <TopPerformerItem 
                key={performer.id}
                rank={index + 1}
                {...performer}
              />
            ))}
          </List>
        )}
        
        {viewMode === 'grid' && (
          <Grid container spacing={3}>
            {filteredPerformers.map((performer) => (
              <Grid item xs={12} sm={6} md={4} key={performer.id}>
                <PerformerGridItem {...performer} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default PerformersList;