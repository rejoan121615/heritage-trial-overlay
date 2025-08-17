"use client";

import { Box } from "@mui/material";
import NotSupported from "@/components/camera/NotSupported";
import RotateScreen from "@/components/camera/RotateScreen";
import AccessFail from "@/components/camera/AccessFail";
import CameraWindow from "@/components/camera/CameraWindow";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/feedback/LoadingPage";

export default function CameraPage() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [landscape, setLandscape] = useState<boolean | null>(null);

  useEffect(() => {
    // control mobile state
    const isMobile = () =>
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) &&
      navigator.maxTouchPoints > 1;

    // setMobile(isMobile());
    setMobile(true);

    // get landscape state
    const isLandscape = () =>
      window.matchMedia("(orientation: landscape)").matches;

    setLandscape(isLandscape());

    // track landscape changes
    window
      .matchMedia("(orientation: landscape)")
      .addEventListener("change", (e) => {
        // trigger ui if it's in landscape
        setLandscape(e.matches);
      });
  }, []);

  return (
    <>
      {mobile === null && landscape === null ? (
        <LoadingPage />
      ) : (
        <Box>
          {mobile && landscape ? (
            <CameraWindow />
          ) : !mobile ? (
            <NotSupported />
          ) : !landscape ? (
            <RotateScreen />
          ) : null}
        </Box>
      )}
    </>
  );
}
