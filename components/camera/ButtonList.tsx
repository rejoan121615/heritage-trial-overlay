import React from "react";
import { Box, Slider } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../CustomComponent/CameraBtn";

const ButtonList = ({ fullScreen, change, onCancel }: { fullScreen:  () => void, change: (event: Event, newValue: number) => void,  onCancel: () => void  }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <CustomButton variant="contained" sx={{ marginBottom: "20px" }} onClick={fullScreen}>
        <OpenInFullIcon sx={{ fontSize: "20px" }} />
      </CustomButton>
      <Box
        sx={{
          width: "50px",
          // height: "60%",
          flex: "1",
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Slider
          onChange={change}
          orientation="vertical"
          defaultValue={50}
          aria-label="Image Range"
        />
      </Box>
      <CustomButton
        variant="contained"
        color="error"
        sx={{ marginTop: "20px" }}
         onClick={onCancel}
      >
        <CloseIcon sx={{ fontSize: "20px" }} />
      </CustomButton>
    </Box>
  );
};

export default ButtonList;
