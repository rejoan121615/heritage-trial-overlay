import React from "react";
import { Box, Typography } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';

const LoadingPermission = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh' }}>
      <VideocamIcon sx={{ fontSize: 80 }} />
      <Typography variant="h6">Loading camera permission...</Typography>
    </Box>
  );
};

export default LoadingPermission;


