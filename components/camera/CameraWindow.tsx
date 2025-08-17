import React, { useRef, useState, useEffect } from "react";
import { Box, Button, IconButton, Slider, Typography } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CloseIcon from "@mui/icons-material/Close";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ButtonList from "./ButtonList";
import CameraBtn from "@/components/CustomComponent/CameraBtn";
import Summary from "./Summary";

const CameraWindow = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasParentRef = useRef<HTMLDivElement | null>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row wrap",
        overflow: "hidden",
        width: "100vw",
        height: "100svh",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "55px 1fr",
          gridTemplateRows: "1fr",
          justifyContent: "center",
          alignItems: "stretch",
          flex: "1",
          position: "relative",
        }}
      >
        <ButtonList />

        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <canvas
            style={{ backgroundColor: "#111", aspectRatio: "2 / 1" }}
            id="canvas"
          ></canvas>
        </Box>

        {/* summary trigger btn  */}
        <CameraBtn
          variant="contained"
          color="info"
          sx={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={() => setShowSummary((prev) => !prev)}
        >
          <DocumentScannerIcon />
        </CameraBtn>
      </Box>

      {showSummary && <Summary />}
    </Box>
  );
};

export default CameraWindow;
