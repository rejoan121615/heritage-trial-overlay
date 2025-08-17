// components/CustomButton.tsx

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(() => ({
  minWidth: "initial",
  padding: "10px",
  borderRadius: "50%",
}));

export default CustomButton;
