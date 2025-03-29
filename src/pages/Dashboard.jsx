import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Tab, Tabs, Card, CardContent, Grid, LinearProgress } from '@mui/material';
import { 
    Home as HomeIcon, 
    Book as BookIcon, 
    EmojiEvents as EmojiEventsIcon, 
    SmartToy as RobotIcon // This replaces Robot with SmartToy, a robot-like icon
  } from '@mui/icons-material';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import GradeCard from '../components/GradeCard';
import CoursesList from '../components/CoursesList';
import PerformersList from '../components/PerformersList';
import { initializeCharts } from '../utils/chartUtils';



function Dashboard() {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize charts after component mounts
    initializeCharts();
  }, [tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGradeClick = (gradeNumber) => {
    navigate(`/grade/${gradeNumber}`);
  };

  return (
    <Box className="min-h-screen bg-light-gray">
      <Header />
      
      <Container maxWidth="lg" className="py-5">
        <Typography variant="h4" component="h1" className="font-semibold mb-1">
          Student Engagement Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className="mb-6">
          Overview of student progression across all your classes
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Overview" />
            <Tab label="Courses" />
            <Tab label="Performers" />
          </Tabs>
        </Box>
        
        {tabValue === 0 && (
          <Box>
            <Grid container spacing={3} className="mb-6">
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  label="Total Students"
                  value="92"
                  subtitle="across all classes"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  label="Avg. Completion"
                  value="78%"
                  subtitle="course completion"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  label="High Performers"
                  value="24"
                  subtitle="above 90%"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  label="Needs Attention"
                  value="8"
                  subtitle="below 60%"
                />
              </Grid>
            </Grid>
            
            <Card className="mb-6">
              <CardContent>
                <Typography variant="h6" component="h2" className="font-semibold mb-4">
                  Your Grades
                </Typography>
                
                <Box className="space-y-4">
                  <GradeCard
                    grade={8}
                    completion={85}
                    stats={{
                      students: 32,
                      classes: 3,
                      courses: 3,
                      needsAttention: 2
                    }}
                    onClick={() => handleGradeClick(8)}
                  />
                  
                  <GradeCard
                    grade={9}
                    completion={72}
                    stats={{
                      students: 30,
                      classes: 2,
                      courses: 3,
                      needsAttention: 4
                    }}
                    onClick={() => handleGradeClick(9)}
                  />
                  
                  <GradeCard
                    grade={10}
                    completion={89}
                    stats={{
                      students: 30,
                      classes: 3,
                      courses: 4,
                      needsAttention: 2
                    }}
                    onClick={() => handleGradeClick(10)}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
        
        {tabValue === 1 && (
          <CoursesList />
        )}
        
        {tabValue === 2 && (
          <PerformersList />
        )}
      </Container>
      
      {/* Mobile Bottom Navigation */}
      <Box 
        className="fixed bottom-0 left-0 w-full bg-white shadow-md py-2 flex justify-around md:hidden z-10"
      >
        <Box 
          className={`flex flex-col items-center cursor-pointer ${tabValue === 0 ? 'text-primary' : 'text-text-gray'}`}
          onClick={() => setTabValue(0)}
        >
          <HomeIcon />
          <Typography variant="caption">Dashboard</Typography>
        </Box>
        <Box 
          className={`flex flex-col items-center cursor-pointer ${tabValue === 1 ? 'text-primary' : 'text-text-gray'}`}
          onClick={() => setTabValue(1)}
        >
          <BookIcon />
          <Typography variant="caption">Courses</Typography>
        </Box>
        <Box 
          className={`flex flex-col items-center cursor-pointer ${tabValue === 2 ? 'text-primary' : 'text-text-gray'}`}
          onClick={() => setTabValue(2)}
        >
          <EmojiEventsIcon />
          <Typography variant="caption">Performers</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;