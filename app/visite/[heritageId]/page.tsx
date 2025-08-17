"use client";

import { Box } from "@mui/material";
import NotSupported from "@/components/camera/NotSupported";
import RotateScreen from "@/components/camera/RotateScreen";
import AccessFail from "@/components/camera/AccessFail";
import CameraWindow from "@/components/camera/CameraWindow";

export default function CameraPage() {
  return (
    <Box>
      {/* <NotSupported /> */}
      {/* <RotateScreen /> */}
      {/* <AccessFail /> */}
      <CameraWindow />
    </Box>
  );
}
