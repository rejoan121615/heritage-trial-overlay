import React, { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ButtonList from "./ButtonList";
import CameraBtn from "@/components/CustomComponent/CameraBtn";
import Summary from "./Summary";
import AccessFail from "./AccessFail";
import LoadingPage from "../feedback/LoadingPage";
import CameraStream from "./CameraStream";
import LoadingPermission from "./LoadingPermission";

const userCameraConfig = {
  video: {
    facingMode: "environment",
    aspectRatio: 2,
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
  audio: false,
};

const CameraWindow = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasParentRef = useRef<HTMLDivElement | null>(null);
  const [cameraAccess, setCameraAccess] = useState<boolean | null>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number | number[]>(50);

  // ask permission for media access
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(userCameraConfig)
      .then((stream) => {
        setCameraAccess(true);
      })
      .catch((error) => {
        setCameraAccess(false);
      });
  }, []);

  useEffect(() => {
    // check if canvas available
    // const canvas = canvasRef.current;
    // if (!canvas) return;
    // // set canvas width and height
    // canvas.width = canvas.parentElement?.clientWidth || 800;
    // canvas.height = canvas.parentElement?.clientHeight || 400;
    // const canvasContext = canvas.getContext("2d");
    // if (!canvasContext) return;
    // navigator.mediaDevices
    //   .getUserMedia(userCameraConfig)
    //   .then((stream) => {
    //     const video = document.createElement("video");
    //     video.srcObject = stream;
    //     video.play();
    //     const draw = () => {
    //       if (!canvasRef.current || !canvasContext) return;
    //       canvasContext.drawImage(
    //         video,
    //         0,
    //         0,
    //         canvasRef.current.width,
    //         canvasRef.current.height
    //       );
    //       requestAnimationFrame(draw);
    //     };
    //     draw();
    //   })
    //   .catch((error) => {
    //     setCameraAccess(false);
    //     console.log('camera access error ', error)
    //   });
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

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue);
  };

  return (
    <>
      {cameraAccess === null ? (
        <LoadingPermission />
      ) : cameraAccess ? (
        <CameraStream />
      ) : (
        <AccessFail />
      )}
    </>
  );
};

export default CameraWindow;
