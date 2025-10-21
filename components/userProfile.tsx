import React, { useContext } from "react";
import { Box, Divider, Avatar, Typography, Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import { UserContext } from '@/contexts/UserContext'

const UserProfile = ({logout} : {logout: () => void}) => {
  const [authUser] = useAuthState(auth);
  const { user } = useContext(UserContext);

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
        <Avatar alt="Remy Sharp" src={user?.image} />
        <Typography sx={{ textTransform: 'capitalize' }}>{ authUser?.displayName }</Typography>
        <Button variant="contained" color="error" onClick={logout} sx={{ borderRadius: '5px'}}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
