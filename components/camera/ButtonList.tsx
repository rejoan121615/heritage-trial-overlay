import React from "react";
import { Box, Slider, Button, IconButton } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CloseIcon from "@mui/icons-material/Close";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import styled from "@emotion/styled";
import CustomButton from "../CustomComponent/CameraBtn";

const ButtonList = () => {
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
      <CustomButton variant="contained" sx={{ marginBottom: "15px" }}>
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
          orientation="vertical"
          defaultValue={50}
          aria-label="Image Range"
        />
      </Box>
      <CustomButton
        variant="contained"
        color="error"
        sx={{ marginTop: "15px" }}
      >
        <CloseIcon sx={{ fontSize: "20px" }} />
      </CustomButton>
    </Box>
  );
};

export default ButtonList;
