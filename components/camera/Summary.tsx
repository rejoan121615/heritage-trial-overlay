import React from "react";
import { Box, Typography } from "@mui/material";

const Summary = () => {
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
        You are looking at the historic Foxton Staircase Locks and the remains
        of the remarkable Inclined Plane boat lift, once a marvel of Victorian
        engineering. To your right stands the boiler house, its tall chimney a
        remnant of the steam age that powered the lift. Above it is the Engine
        and Cable House. Built in 1900, the lift transported canal boats up and
        down the steep hillside in giant tanks, saving time and water. Though
        dismantled in the 1920s, its legacy remains. Imagine the clatter of
        machinery, the hiss of steam, and the bustle of canal life that once
        echoed across this tranquil Leicestershire landscape.
      </Typography>
    </Box>
  );
};

export default Summary;
