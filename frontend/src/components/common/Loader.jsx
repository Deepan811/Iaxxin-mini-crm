import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Take full height of parent
        width: '100%', // Take full width of parent
        position: 'absolute', // Position absolutely over content
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent overlay
        zIndex: 1000, // Ensure it's on top
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
