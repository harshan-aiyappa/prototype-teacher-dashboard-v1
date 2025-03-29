import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Container, Typography, Tabs, Tab, Paper, Button, Card, CardContent, Grid, TextField, InputAdornment, MenuItem, Chip, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { ArrowBack, Search as SearchIcon, FileDownload } from '@mui/icons-material';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import { initializeGradeCharts } from '../utils/chartUtils';

function GradeDetailsPage() {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Initialize charts after component mounts
    initializeGradeCharts(gradeId);
  }, [gradeId, tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getGradeStats = (gradeId) => {
    // In a real app, this would be fetched from an API
    const stats = {
      '8': {
        students: 32,
        avgCompletion: '85%',
        classes: 3,
        needsAttention: 2
      },
      '9': {
        students: 30,
        avgCompletion: '72%',
        classes: 2,
        needsAttention: 4
      },
      '10': {
        students: 30,
        avgCompletion: '89%',
        classes: 3,
        needsAttention: 2
      }
    };
    
    return stats[gradeId] || stats['8'];
  };

  const stats = getGradeStats(gradeId);
  
  // Sample student data
  const students = [
    {
      id: 1,
      name: 'Alex Johnson',
      class: `${gradeId}-A`,
      course: 'Basic Grammar',
      unit: 'Nouns & Pronouns',
      status: 'Completed',
      completion: 100,
      score: 95,
      timeSpent: '3h 20m',
      attempts: 1,
      lastActivity: '15 days ago'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      class: `${gradeId}-A`,
      course: 'Basic Grammar',
      unit: 'Verbs & Tenses',
      status: 'Completed',
      completion: 100,
      score: 88,
      timeSpent: '4h 30m',
      attempts: 2,
      lastActivity: '12 days ago'
    },
    {
      id: 3,
      name: 'Noah Taylor',
      class: `${gradeId}-A`,
      course: 'French Basic',
      unit: 'Greetings & Introduction',
      status: 'In Progress',
      completion: 75,
      score: 82,
      timeSpent: '2h 45m',
      attempts: 1,
      lastActivity: '3 days ago'
    },
    {
      id: 4,
      name: 'Lucas Rodriguez',
      class: `${gradeId}-B`,
      course: 'Vocabulary Basics',
      unit: 'Word Families',
      status: 'Completed',
      completion: 100,
      score: 92,
      timeSpent: '3h 10m',
      attempts: 1,
      lastActivity: '8 days ago'
    },
    {
      id: 5,
      name: 'Olivia Brown',
      class: `${gradeId}-C`,
      course: 'French Basic',
      unit: 'Numbers & Time',
      status: 'In Progress',
      completion: 62,
      score: 65,
      timeSpent: '2h 30m',
      attempts: 3,
      lastActivity: '2 days ago'
    },
    {
      id: 6,
      name: 'James Smith',
      class: `${gradeId}-B`,
      course: 'Reading Essentials',
      unit: 'Main Idea',
      status: 'Not Started',
      completion: 0,
      score: 'N/A',
      timeSpent: '0h 0m',
      attempts: 0,
      lastActivity: 'N/A'
    }
  ];

  // Filter students based on search term and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesClass && matchesCourse && matchesStatus;
  });

  const statusColor = (status) => {
    switch(status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'primary';
      case 'Not Started': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box className="min-h-screen bg-light-gray">
      <Header />
      
      <Container maxWidth="lg" className="py-5">
        <Box className="flex items-center text-sm mb-5">
          <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>
          <Typography className="mx-2 text-text-gray">/</Typography>
          <Typography className="font-medium">Grade {gradeId} Details</Typography>
        </Box>
        
        <Typography variant="h4" component="h1" className="font-semibold mb-1">
          Grade {gradeId} Student Progress
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className="mb-6">
          Comprehensive view of student engagement across all classes
        </Typography>
        
        <Grid container spacing={3} className="mb-6">
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              label="Students"
              value={stats.students}
              subtitle="total"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              label="Avg. Completion"
              value={stats.avgCompletion}
              subtitle="overall"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              label="Classes"
              value={stats.classes}
              subtitle="in this grade"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              label="Needs Attention"
              value={stats.needsAttention}
              subtitle="students"
            />
          </Grid>
        </Grid>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Students" />
            <Tab label="Courses" />
            <Tab label="Progress Summary" />
          </Tabs>
        </Box>
        
        {tabValue === 0 && (
          <Card>
            <CardContent>
              <Box className="flex flex-wrap justify-between gap-4 mb-6">
                <TextField
                  placeholder="Search students..."
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
                
                <Box className="flex flex-wrap gap-3">
                  <TextField
                    select
                    variant="outlined"
                    size="small"
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="w-32"
                  >
                    <MenuItem value="all">All Classes</MenuItem>
                    <MenuItem value={`${gradeId}-A`}>Class {gradeId}-A</MenuItem>
                    <MenuItem value={`${gradeId}-B`}>Class {gradeId}-B</MenuItem>
                    <MenuItem value={`${gradeId}-C`}>Class {gradeId}-C</MenuItem>
                  </TextField>
                  
                  <TextField
                    select
                    variant="outlined"
                    size="small"
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="w-48"
                  >
                    <MenuItem value="all">All Courses</MenuItem>
                    <MenuItem value="Basic Grammar">Basic Grammar</MenuItem>
                    <MenuItem value="Vocabulary Basics">Vocabulary Basics</MenuItem>
                    <MenuItem value="Reading Essentials">Reading Essentials</MenuItem>
                    <MenuItem value="French Basic">French Basic</MenuItem>
                  </TextField>
                  
                  <TextField
                    select
                    variant="outlined"
                    size="small"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-40"
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Not Started">Not Started</MenuItem>
                  </TextField>
                  
                  <Button
                    variant="outlined"
                    startIcon={<FileDownload />}
                    size="small"
                    className="ml-2"
                  >
                    CSV
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<FileDownload />}
                    size="small"
                  >
                    PDF
                  </Button>
                </Box>
              </Box>
              
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Chapter/Unit</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Completion</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Time Spent</TableCell>
                      <TableCell>Attempts</TableCell>
                      <TableCell>Last Activity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow 
                        key={student.id}
                        hover
                        onClick={() => navigate(`/student/${student.id}`)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.unit}</TableCell>
                        <TableCell>
                          <Chip 
                            label={student.status}
                            size="small"
                            color={statusColor(student.status)}
                          />
                        </TableCell>
                        <TableCell>{student.completion}%</TableCell>
                        <TableCell>{student.score}</TableCell>
                        <TableCell>{student.timeSpent}</TableCell>
                        <TableCell>{student.attempts}</TableCell>
                        <TableCell>{student.lastActivity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
        
        {tabValue === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Course Completion
              </Typography>
              
              <Box className="h-72 mb-6">
                <canvas id="gradeCourseCompletionChart"></canvas>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell>Students Enrolled</TableCell>
                      <TableCell>Completed</TableCell>
                      <TableCell>In Progress</TableCell>
                      <TableCell>Not Started</TableCell>
                      <TableCell>Avg. Score</TableCell>
                      <TableCell>Avg. Time Spent</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover sx={{ cursor: 'pointer' }}>
                      <TableCell>Basic Grammar</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>28</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>88%</TableCell>
                      <TableCell>12h 45m</TableCell>
                      <TableCell>
                        <Chip 
                          label="90% Complete"
                          size="small"
                          color="success"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow hover sx={{ cursor: 'pointer' }}>
                      <TableCell>Vocabulary Basics</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell>7</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>82%</TableCell>
                      <TableCell>10h 30m</TableCell>
                      <TableCell>
                        <Chip 
                          label="85% Complete"
                          size="small"
                          color="success"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow hover sx={{ cursor: 'pointer' }}>
                      <TableCell>Reading Essentials</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>22</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>78%</TableCell>
                      <TableCell>11h 15m</TableCell>
                      <TableCell>
                        <Chip 
                          label="75% Complete"
                          size="small"
                          color="primary"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow hover sx={{ cursor: 'pointer' }}>
                      <TableCell>French Basic</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>26</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell>14h 20m</TableCell>
                      <TableCell>
                        <Chip 
                          label="87% Complete"
                          size="small"
                          color="success"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
        
        {tabValue === 2 && (
          <Box className="space-y-6">
            <Card>
              <CardContent>
                <Typography variant="h6" className="font-semibold mb-4">
                  Overall Progress by Class
                </Typography>
                
                <Box className="h-72">
                  <canvas id="classProgressChart"></canvas>
                </Box>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" className="font-semibold mb-4">
                  Top Performing Students
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Avg. Completion</TableCell>
                        <TableCell>Avg. Score</TableCell>
                        <TableCell>Courses Completed</TableCell>
                        <TableCell>Total Time Spent</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>1</TableCell>
                        <TableCell>Alex Johnson</TableCell>
                        <TableCell>{gradeId}-A</TableCell>
                        <TableCell>98%</TableCell>
                        <TableCell>95%</TableCell>
                        <TableCell>4/4</TableCell>
                        <TableCell>45h 30m</TableCell>
                      </TableRow>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>2</TableCell>
                        <TableCell>Emma Wilson</TableCell>
                        <TableCell>{gradeId}-A</TableCell>
                        <TableCell>96%</TableCell>
                        <TableCell>92%</TableCell>
                        <TableCell>4/4</TableCell>
                        <TableCell>42h 15m</TableCell>
                      </TableRow>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>3</TableCell>
                        <TableCell>Lucas Rodriguez</TableCell>
                        <TableCell>{gradeId}-B</TableCell>
                        <TableCell>95%</TableCell>
                        <TableCell>91%</TableCell>
                        <TableCell>4/4</TableCell>
                        <TableCell>43h 40m</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" className="font-semibold mb-4">
                  Students Needing Attention
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Avg. Completion</TableCell>
                        <TableCell>Avg. Score</TableCell>
                        <TableCell>Most Challenging Course</TableCell>
                        <TableCell>Last Active</TableCell>
                        <TableCell>Action Needed</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>James Smith</TableCell>
                        <TableCell>{gradeId}-B</TableCell>
                        <TableCell>58%</TableCell>
                        <TableCell>62%</TableCell>
                        <TableCell>Reading Essentials</TableCell>
                        <TableCell>5 days ago</TableCell>
                        <TableCell>
                          <Chip 
                            label="Immediate Help"
                            size="small"
                            color="error"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>Olivia Brown</TableCell>
                        <TableCell>{gradeId}-C</TableCell>
                        <TableCell>62%</TableCell>
                        <TableCell>65%</TableCell>
                        <TableCell>French Basic</TableCell>
                        <TableCell>3 days ago</TableCell>
                        <TableCell>
                          <Chip 
                            label="Support Needed"
                            size="small"
                            color="warning"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default GradeDetailsPage;