import React from "react";
import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const HeritageNotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexFlow: "column wrap",
      }}
    >
      <ErrorIcon sx={{ fontSize: "80px", marginBottom: "15px" }} />
      <Typography variant="h6">Sorry, heritage not found.</Typography>
      <Typography variant="h6">Either it's deleted or does not exists</Typography>
    </Box>
  );
};

export default HeritageNotFound;
