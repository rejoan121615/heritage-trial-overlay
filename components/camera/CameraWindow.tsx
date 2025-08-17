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

  // full screen mode toggle
   const toggleFullscreen = (): void => {
    const el: HTMLElement = document.documentElement;

    if (
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement || // Safari
      (document as any).msFullscreenElement // IE11
    ) {
      // Exit full screen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    } else {
      // Enter full screen
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if ((el as any).webkitRequestFullscreen) {
        (el as any).webkitRequestFullscreen();
      } else if ((el as any).msRequestFullscreen) {
        (el as any).msRequestFullscreen();
      }
    }
  };

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
        <ButtonList fullScreen={toggleFullscreen} />

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
