import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { CameraContext } from "@/contexts/CameraContext";

const Summary = () => {

  const { heritageData } = useContext(CameraContext);

  return (
    <Box
      sx={{
        width: "300px",
        padding: "15px 10px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: "8px", fontSize: "20px", padding: "0px" }}
      >
        Summary:
      </Typography>
      <Typography sx={{ lineHeight: "145%", letterSpacing: "1px" }}>
        {heritageData?.summary}
      </Typography>
    </Box>
  );
};

export default Summary;
