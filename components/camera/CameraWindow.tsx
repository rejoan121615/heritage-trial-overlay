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
  const [cameraAccess, setCameraAccess] = useState<boolean | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);



  // ask permission for media access
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(userCameraConfig)
      .then((stream) => {
        setCameraStream(stream);
        setCameraAccess(true);
      })
      .catch((error) => {
        setCameraAccess(false);
      });
  }, []);


  return (
    <>
      {cameraAccess === null ? (
        <LoadingPermission />
      ) : cameraAccess ? (
        <CameraStream cameraStream={cameraStream} />
      ) : (
        <AccessFail />
      )}
    </>
  );
};

export default CameraWindow;
