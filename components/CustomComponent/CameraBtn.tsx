// components/CustomButton.tsx

import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  minWidth: "initial",
  padding: "10px",
  borderRadius: "50%",
}));

export default CustomButton;
