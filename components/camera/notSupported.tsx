import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import NotSupportedIcon from "public/icons/user-interface.png";

const NotSupported = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box
        component={"div"}
        sx={{
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        <Image width={200} src={NotSupportedIcon} alt="mobile icon" style={{ marginBottom: '20px'}} />
        <Box>
          <Typography>
            ⚠️ This experience is designed for mobile devices only.
          </Typography>
          <Typography>
            Please visit this site from a phone or tablet for the best
            functionality.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotSupported;
