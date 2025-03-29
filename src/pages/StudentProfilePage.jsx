import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Paper, Card, CardContent, Avatar, Chip, Divider, Button, LinearProgress } from '@mui/material';
import { Mail as MailIcon, Phone as PhoneIcon, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import Header from '../components/Header';
import { initializeStudentCharts } from '../utils/chartUtils';

function StudentProfilePage() {
  const { studentId } = useParams();
  
  useEffect(() => {
    // Initialize student charts
    initializeStudentCharts();
  }, []);
  
  // Mock data for a student profile
  const student = {
    id: studentId,
    name: 'Alex Johnson',
    grade: 8,
    class: '8-A',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: null, // Would be a URL in a real app
    joinDate: 'September 2023',
    totalScore: 92,
    totalCompletion: 94,
    trends: {
      score: 'up', // up, down, stable
      scoreChange: '+5%',
      timeSpent: 'up',
      timeSpentChange: '+2h'
    },
    courses: [
      {
        name: 'French Basic',
        completion: 100,
        score: 85,
        timeSpent: '15h 20m'
      },
      {
        name: 'Basic Grammar',
        completion: 100,
        score: 95,
        timeSpent: '12h 45m'
      },
      {
        name: 'Vocabulary Basics',
        completion: 100,
        score: 92,
        timeSpent: '10h 30m'
      },
      {
        name: 'Reading Essentials',
        completion: 76,
        score: 88,
        timeSpent: '8h 15m',
        inProgress: true
      }
    ],
    recentActivity: [
      {
        type: 'course_completed',
        course: 'Vocabulary Basics',
        date: '5 days ago',
        score: 92
      },
      {
        type: 'quiz_completed',
        course: 'Reading Essentials',
        unit: 'Main Idea',
        date: '1 week ago',
        score: 88
      },
      {
        type: 'lesson_completed',
        course: 'Reading Essentials',
        unit: 'Supporting Details',
        date: '2 weeks ago'
      }
    ]
  };
  
  const getTrendIcon = (trend) => {
    if (trend === 'up') return <ArrowUpward fontSize="small" className="text-success" />;
    if (trend === 'down') return <ArrowDownward fontSize="small" className="text-error" />;
    return null;
  };
  
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Box className="min-h-screen bg-light-gray">
      <Header />
      
      <Container maxWidth="lg" className="py-5">
        <Box className="flex items-center text-sm mb-5">
          <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>
          <Typography className="mx-2 text-text-gray">/</Typography>
          <Link to={`/grade/${student.grade}`} className="text-primary hover:underline">Grade {student.grade}</Link>
          <Typography className="mx-2 text-text-gray">/</Typography>
          <Typography className="font-medium">{student.name}</Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} lg={3}>
            <Card>
              <CardContent className="text-center p-5">
                <Avatar 
                  className="mx-auto mb-4 w-24 h-24 text-3xl bg-primary-light text-primary"
                  src={student.avatar}
                >
                  {getInitials(student.name)}
                </Avatar>
                
                <Typography variant="h5" className="font-semibold mb-1">
                  {student.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-3">
                  Grade {student.grade}-{student.class.split('-')[1]}
                </Typography>
                
                <Chip 
                  label={`${student.totalScore}% Overall Score`}
                  color="success"
                  className="mb-4"
                />
                
                <Divider className="my-4" />
                
                <Box className="flex flex-col gap-3">
                  <Box className="flex items-center gap-2">
                    <MailIcon color="action" fontSize="small" />
                    <Typography variant="body2">{student.email}</Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    <PhoneIcon color="action" fontSize="small" />
                    <Typography variant="body2">{student.phone}</Typography>
                  </Box>
                </Box>
                
                <Divider className="my-4" />
                
                <Box className="text-left">
                  <Typography variant="subtitle2" className="font-medium mb-2">
                    Student Since
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {student.joinDate}
                  </Typography>
                </Box>
                
                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  className="mt-4"
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8} lg={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" className="font-semibold mb-4">
                      Performance Overview
                    </Typography>
                    
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={0} className="p-4 bg-light-gray">
                          <Box className="flex justify-between items-center mb-2">
                            <Typography variant="subtitle2">
                              Overall Score
                            </Typography>
                            <Box className="flex items-center">
                              {getTrendIcon(student.trends.score)}
                              <Typography 
                                variant="body2" 
                                className={student.trends.score === 'up' ? 'text-success' : 'text-error'}
                              >
                                {student.trends.scoreChange}
                              </Typography>
                            </Box>
                          </Box>
                          <Box className="flex justify-between items-end">
                            <Typography variant="h4" className="font-bold text-primary">
                              {student.totalScore}%
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Last 30 days
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Paper elevation={0} className="p-4 bg-light-gray">
                          <Box className="flex justify-between items-center mb-2">
                            <Typography variant="subtitle2">
                              Overall Completion
                            </Typography>
                            <Chip 
                              label={student.totalCompletion + '%'}
                              size="small"
                              color="primary"
                            />
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={student.totalCompletion} 
                            color="primary"
                            className="h-2 rounded-full mb-2"
                          />
                          <Box className="flex justify-between">
                            <Typography variant="body2" color="textSecondary">
                              {student.courses.filter(c => c.completion === 100).length} of {student.courses.length} courses completed
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" className="font-semibold mb-4">
                      Course Performance
                    </Typography>
                    
                    <Box className="h-72 mb-6">
                      <canvas id="studentPerformanceChart"></canvas>
                    </Box>
                    
                    <Typography variant="subtitle2" className="font-medium mb-3">
                      Course Progress
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {student.courses.map((course, index) => (
                        <Grid item xs={12} key={index}>
                          <Paper elevation={0} className="p-3 bg-light-gray">
                            <Box className="flex justify-between items-center mb-2">
                              <Box>
                                <Typography variant="subtitle2" className="font-medium">
                                  {course.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  Time spent: {course.timeSpent}
                                </Typography>
                              </Box>
                              
                              <Box className="text-right">
                                <Chip 
                                  label={course.inProgress ? 'In Progress' : 'Completed'}
                                  size="small"
                                  color={course.inProgress ? 'primary' : 'success'}
                                  className="mb-1"
                                />
                                <Typography variant="subtitle2" className="font-semibold">
                                  {course.score}%
                                </Typography>
                              </Box>
                            </Box>
                            
                            <LinearProgress 
                              variant="determinate" 
                              value={course.completion} 
                              color={course.inProgress ? 'primary' : 'success'}
                              className="h-1 rounded-full"
                            />
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" className="font-semibold mb-4">
                          Skill Assessment
                        </Typography>
                        
                        <Box className="h-72">
                          <canvas id="studentSkillsChart"></canvas>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" className="font-semibold mb-4">
                          Recent Activity
                        </Typography>
                        
                        <Box className="divide-y">
                          {student.recentActivity.map((activity, index) => (
                            <Box key={index} className="py-3">
                              <Box className="flex justify-between items-start">
                                <Box>
                                  <Typography variant="subtitle2" className="font-medium">
                                    {activity.type === 'course_completed' && 'Completed Course'}
                                    {activity.type === 'quiz_completed' && 'Completed Quiz'}
                                    {activity.type === 'lesson_completed' && 'Completed Lesson'}
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    {activity.course}
                                    {activity.unit && ` - ${activity.unit}`}
                                  </Typography>
                                </Box>
                                
                                <Box className="text-right">
                                  <Typography variant="body2" color="textSecondary">
                                    {activity.date}
                                  </Typography>
                                  {activity.score && (
                                    <Typography variant="subtitle2" className="font-semibold text-success">
                                      {activity.score}%
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default StudentProfilePage;