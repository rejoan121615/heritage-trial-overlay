import React, { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ButtonList from "./ButtonList";
import CameraBtn from "@/components/CustomComponent/CameraBtn";
import Summary from "./Summary";
import foxtonImage from "@/public/icons/foxton_image.jpg";

const CameraStream = ({
  cameraStream,
}: {
  cameraStream: MediaStream | null;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasParentRef = useRef<HTMLDivElement | null>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [slider, setSlider] = useState<number>(0.5);

  // use slider value as ref to get the latest value
  const sliderRef = useRef(slider);

  useEffect(() => {
    sliderRef.current = slider;
  }, [slider]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !cameraStream) return;

    const video = document.createElement("video");
    video.srcObject = cameraStream;
    video.play();

    const OverlayImage = new Image();
    OverlayImage.src = foxtonImage.src;

    const draw = () => {
      if (!canvas || !context) return;

      context.globalAlpha = 1;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Draw overlay image with dynamic opacity
      context.globalAlpha = sliderRef.current;
      context.drawImage(OverlayImage, 0, 0, canvas.width, canvas.height);

      context.globalAlpha = 1;
      requestAnimationFrame(draw);
    };
    draw();
  }, [cameraStream]);

  //   observer to adjust canvas size
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === canvasParentRef.current) {
          const { width: parentWidth, height: parentHeight } =
            entry.contentRect;

          // Subtract 30px from parent dimensions
          const maxWidth = parentWidth - 140;
          const maxHeight = parentHeight - 30;

          // Calculate canvas size keeping 2:1 aspect ratio
          let canvasWidth = maxWidth;
          let canvasHeight = canvasWidth / 2;

          // If height overflows, scale based on height
          if (canvasHeight > maxHeight) {
            canvasHeight = maxHeight;
            canvasWidth = canvasHeight * 2;
          }

          if (!canvasRef.current) return;
          canvasRef.current.width = canvasWidth;
          canvasRef.current.height = canvasHeight;

          console.log("canvas size:", canvasWidth, canvasHeight);
        }
      }
    });

    if (canvasParentRef.current) {
      observer.observe(canvasParentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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

  const sliderChangeHandler = (event: Event, newValue: number) => {
    setSlider(newValue / 100);
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
        ref={canvasParentRef}
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
        <ButtonList
          fullScreen={toggleFullscreen}
          change={sliderChangeHandler}
        />

        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginRight: showSummary ? "15px" : "55px",
          }}
        >
          <canvas
            ref={canvasRef}
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

export default CameraStream;
