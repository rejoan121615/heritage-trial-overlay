"use client";

import React, { use, useEffect, useRef, useState } from "react";
import {
  Card,
  Box,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { HeritageDataTYPE } from "@/types/AllTypes";
import QRCode from "qrcode";
import { QrCode } from "@mui/icons-material";
import HeritageDetailsRow from "@/components/admin/heritage/HeritageDetailsRow";
import HeritageDetailsSkeleton from "@/components/skeleton/HeritageDetailsSkeleton";

const HeritageDetailsPage = ({
  params,
}: {
  params: Promise<{ heritageId: string }>;
}) => {
  const [heritage, setHeritage] = useState<HeritageDataTYPE | null>(null);
  const { heritageId } = use(params);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // genrate qr code
  useEffect(() => {
    if (heritageId && qrCanvasRef.current) {
      const { origin } = window.location;
      const qrUrl = `${origin}/visite/${heritageId}`;
      QRCode.toCanvas(
        qrCanvasRef.current,
        qrUrl,
        {
          width: 250,
        },
        function (error) {
          if (error) console.log("creating qr code failed ", error);
        }
      );
    }
  }, [heritageId, heritage]);

  // fetch heritage data
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, "heritages", heritageId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setHeritage({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          } as HeritageDataTYPE);
        }
      } catch (error) {
        console.error("Error fetching heritage data:", error);
        setHeritage(null);
      }
    };

    if (heritageId) {
      fetchDocument();
    }
  }, [heritageId]);

  const qrCodeDownloadHandler = () => {
    if (qrCanvasRef.current) {
      const createDownloadAnchor = document.createElement("a");
      createDownloadAnchor.download = `${heritage?.title} QR-code.png`;
      createDownloadAnchor.href = qrCanvasRef.current.toDataURL("image/png");
      createDownloadAnchor.click();
    }
  };

  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          padding: {
            xs: "30px",
            md: "50px 30px",
            lg: "80px 25px",
            xl: "120px 0px",
          },
        }}
      >
        {heritage === null ? (
          <HeritageDetailsSkeleton />
        ) : (
          <>
            <Grid
              container
              sx={{
                rowGap: { sm: "20px" },
                width: "100%",
                maxWidth: "650px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {/* title  */}
              <HeritageDetailsRow title="Title">
                <Typography>{heritage?.title}</Typography>
              </HeritageDetailsRow>

              {/* Image  */}
              <HeritageDetailsRow title="Image">
                <Image
                  width={300}
                  height={150}
                  src={heritage?.image}
                  alt={heritage?.title}
                  style={{
                    width: "100%",
                    height: "initial",
                    aspectRatio: "2 / 1",
                  }}
                />
              </HeritageDetailsRow>

              {/* summary  */}
              <HeritageDetailsRow title="Summary">
                <Typography>{heritage.summary}</Typography>
              </HeritageDetailsRow>

              {/* Location  */}
              <HeritageDetailsRow title="Location">
                <Typography>{heritage.location}</Typography>
              </HeritageDetailsRow>

              {/* Location  */}
              <HeritageDetailsRow title="Category">
                <Typography sx={{ textTransform: "capitalize" }}>
                  {heritage.category}
                </Typography>
              </HeritageDetailsRow>

              {/* qr code  */}
              <HeritageDetailsRow title="QR-Code">
                <Box component={"div"}>
                  <canvas ref={qrCanvasRef}></canvas>
                </Box>
              </HeritageDetailsRow>

              {/* qr code download button  */}
              <HeritageDetailsRow title="">
                <Button
                  onClick={qrCodeDownloadHandler}
                  startIcon={<QrCode />}
                  sx={{ borderRadius: "4px" }}
                  color="success"
                  variant="outlined"
                >
                  Download Qr Code
                </Button>
              </HeritageDetailsRow>
            </Grid>
          </>
        )}
      </Box>
    </Card>
  );
};

export default HeritageDetailsPage;
