"use client";

import { Box } from "@mui/material";
import NotSupported from "@/components/camera/NotSupported";
import RotateScreen from "@/components/camera/RotateScreen";
import AccessFail from "@/components/camera/AccessFail";
import CameraWindow from "@/components/camera/CameraWindow";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/feedback/LoadingPage";
import { useParams } from "next/navigation";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { HeritageDataTYPE } from "@/types/AllTypes";
import { CameraContext } from "@/contexts/CameraContext";
import HeritageNotFound from "@/components/camera/HeritageNotFound";

export default function CameraPage() {
  const [heritageData, setSeritageData] = useState<HeritageDataTYPE | null>(
    null
  );
  const [heritageNotFound, setHeritageNotFound] = useState<boolean | null>(
    null
  );
  const { heritageId } = useParams<{ heritageId: string }>();
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [landscape, setLandscape] = useState<boolean | null>(null);

  // pull record from database
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "heritages", heritageId);
      const docSnapshort = await getDoc(docRef);

      if (docSnapshort.exists()) {
        setHeritageNotFound(false);
        setSeritageData({
          id: docSnapshort.id,
          ...docSnapshort.data(),
        } as HeritageDataTYPE);
      } else {
        setHeritageNotFound(true);
      }
    };

    fetchData();
  }, []);

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
      {heritageNotFound === null ? (
        <LoadingPage />
      ) : heritageNotFound ? (
        <HeritageNotFound />
      ) : mobile === null && landscape === null ? (
        <LoadingPage />
      ) : (
        <CameraContext.Provider value={{ heritageData }}>
          <Box>
            {mobile && landscape ? (
              <CameraWindow heritageData={heritageData} />
            ) : !mobile ? (
              <NotSupported />
            ) : !landscape ? (
              <RotateScreen />
            ) : null}
          </Box>
        </CameraContext.Provider>
      )}
    </>
  );
}
