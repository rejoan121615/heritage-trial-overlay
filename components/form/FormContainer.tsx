import React, { ReactNode } from "react";
import { Box } from "@mui/material";

const FormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default FormContainer;
