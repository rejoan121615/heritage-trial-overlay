import React from "react";
import { Box, Divider, Avatar, Typography, Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";

const UserProfile = ({logout} : {logout: () => void}) => {
  const [user, loading, error] = useAuthState(auth);

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
        <Typography sx={{ textTransform: 'capitalize' }}>{ user?.displayName }</Typography>
        <Button variant="contained" color="error" onClick={logout} sx={{ borderRadius: '5px'}}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
