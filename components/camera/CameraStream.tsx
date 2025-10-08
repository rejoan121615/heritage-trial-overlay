import React, { useRef, useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ButtonList from "./ButtonList";
import CameraBtn from "@/components/CustomComponent/CameraBtn";
import Summary from "./Summary";
import { CameraContext } from "@/contexts/CameraContext";
import { useRouter } from "next/navigation";

const CameraStream = ({
  cameraStream,
}: {
  cameraStream: MediaStream | null;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasParentRef = useRef<HTMLDivElement | null>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [slider, setSlider] = useState<number>(0.5);
  const { heritageData } = useContext(CameraContext);

  const router = useRouter();

  // use slider value as ref to get the latest value
  const sliderRef = useRef(slider);

  useEffect(() => {
    sliderRef.current = slider;
  }, [slider]);

  useEffect(() => {
    if (heritageData) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context || !cameraStream) return;

      const video = document.createElement("video");
      video.srcObject = cameraStream;
      video.play();

      // if (heritageData === null ) return ;
      const OverlayImage = new Image();
      // OverlayImage.src = foxtonImage.src;
      OverlayImage.src = heritageData.image;

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
    }
  }, [cameraStream, heritageData]);

  //   observer to adjust canvas size
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
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
      document.fullscreenElement 
    ) {
      // Exit full screen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      // Enter full screen
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } 
    }
  };

  const sliderChangeHandler = (event: Event, newValue: number) => {
    setSlider(newValue / 100);
  };

  // exit fullscreen
    const exitFullscreen = async (): Promise<void> => {
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen();
    }
  };

  // handle cancel and exit fullscreen
  const handleCancel = async() => {
      if (document.fullscreenElement) {
        await exitFullscreen();
      }
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => {
        track.stop();
        track.enabled = false;
       });
    }

    // clear video elements
     const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
      video.srcObject = null;
    });
      router.push("/visite/thank-you");
  }

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
          onCancel={handleCancel}
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
