import Chart from 'chart.js/auto';

let charts = {};

export const initializeCharts = () => {
  try {
    // Course completion chart
    const courseCtx = document.getElementById('courseCompletionChart');
    if (courseCtx) {
      if (charts.courseCompletion) {
        charts.courseCompletion.destroy();
      }
      
      charts.courseCompletion = new Chart(courseCtx, {
        type: 'bar',
        data: {
          labels: ['French Basic', 'French Intermediate', 'French Advanced', 'Basic Grammar', 'Vocabulary Basics', 'Conversation Skills'],
          datasets: [{
            label: 'Completion Rate (%)',
            data: [87, 85, 68, 92, 85, 75],
            backgroundColor: '#3a86ff',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
    
    // Performers chart
    const performersCtx = document.getElementById('performersChart');
    if (performersCtx) {
      if (charts.performers) {
        charts.performers.destroy();
      }
      
      charts.performers = new Chart(performersCtx, {
        type: 'bar',
        data: {
          labels: ['French Basic', 'French Intermediate', 'French Advanced', 'Basic Grammar', 'Vocabulary Basics'],
          datasets: [
            {
              label: 'Top Performers (Score %)',
              data: [92, 95, 98, 95, 93],
              backgroundColor: '#3a86ff'
            },
            {
              label: 'Average Score (%)',
              data: [85, 82, 90, 88, 82],
              backgroundColor: '#8338ec'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
  } catch (err) {
    console.error('Error initializing charts:', err);
  }
};

export const initializeGradeCharts = (gradeId) => {
  try {
    // Course completion chart for grade
    const gradeCourseCtx = document.getElementById('gradeCourseCompletionChart');
    if (gradeCourseCtx) {
      if (charts.gradeCourseCompletion) {
        charts.gradeCourseCompletion.destroy();
      }
      
      charts.gradeCourseCompletion = new Chart(gradeCourseCtx, {
        type: 'bar',
        data: {
          labels: ['Basic Grammar', 'Vocabulary Basics', 'Reading Essentials', 'French Basic'],
          datasets: [{
            label: 'Completion Rate (%)',
            data: [92, 85, 75, 87],
            backgroundColor: '#3a86ff',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
    
    // Class progress chart
    const classProgressCtx = document.getElementById('classProgressChart');
    if (classProgressCtx) {
      if (charts.classProgress) {
        charts.classProgress.destroy();
      }
      
      charts.classProgress = new Chart(classProgressCtx, {
        type: 'bar',
        data: {
          labels: [`${gradeId}-A`, `${gradeId}-B`, `${gradeId}-C`],
          datasets: [{
            label: 'Completion Rate (%)',
            data: [88, 82, 84],
            backgroundColor: '#8338ec',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
  } catch (err) {
    console.error('Error initializing grade charts:', err);
  }
};

export const initializeStudentCharts = () => {
  try {
    // Student performance chart
    const studentChartCtx = document.getElementById('studentPerformanceChart');
    if (studentChartCtx) {
      if (charts.studentPerformance) {
        charts.studentPerformance.destroy();
      }
      
      charts.studentPerformance = new Chart(studentChartCtx, {
        type: 'bar',
        data: {
          labels: ['French Basic', 'Basic Grammar', 'Vocabulary Basics', 'Reading Essentials'],
          datasets: [{
            label: 'Course Score (%)',
            data: [85, 95, 92, 88],
            backgroundColor: '#3a86ff',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
    
    // Skills chart
    const skillsChartCtx = document.getElementById('studentSkillsChart');
    if (skillsChartCtx) {
      if (charts.studentSkills) {
        charts.studentSkills.destroy();
      }
      
      charts.studentSkills = new Chart(skillsChartCtx, {
        type: 'radar',
        data: {
          labels: ['Reading', 'Writing', 'Listening', 'Speaking', 'Grammar', 'Vocabulary'],
          datasets: [{
            label: 'Skill Level (%)',
            data: [92, 88, 85, 80, 95, 94],
            borderColor: '#3a86ff',
            backgroundColor: 'rgba(58, 134, 255, 0.2)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
  } catch (err) {
    console.error('Error initializing student charts:', err);
  }
};