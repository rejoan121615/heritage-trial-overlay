import React from "react";
import { Box, Divider, Avatar, Typography, Button } from "@mui/material";

const UserProfile = ({logout} : {logout: () => void}) => {
  return (
    <Box>
      <Divider />
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar alt="Remy Sharp" />
        <Typography>Mohd Rejoan</Typography>
        <Button variant="contained" color="error" onClick={logout} sx={{ borderRadius: '5px'}}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
