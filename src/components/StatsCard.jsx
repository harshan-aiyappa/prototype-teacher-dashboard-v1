import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function StatsCard({ label, value, subtitle }) {
  return (
    <Card className="h-full">
      <CardContent className="text-center">
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="h4" className="font-bold my-2 text-primary">
          {value}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatsCard;