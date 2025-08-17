import React, {  useState, useEffect } from "react";
import AccessFail from "./AccessFail";
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
      .catch(() => {
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
