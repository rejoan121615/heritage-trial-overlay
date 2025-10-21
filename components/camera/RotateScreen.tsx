import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import RotateIcon from "@/public/icons/rotation.png";

const RotateScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        component={"div"}
        sx={{
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        <Image
          width={180}
          src={RotateIcon}
          alt="mobile rotate icon"
          style={{ marginBottom: "20px" }}
        />
        <Box className="texts">
          <Typography>
            🔄 Please rotate your device to landscape mode for the best
            experience.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RotateScreen;
