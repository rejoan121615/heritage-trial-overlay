"use client";

import React, { use, useEffect, useRef, useState } from "react";
import {
  Card,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { HeritageDataTYPE } from "@/types/AllTypes";
import QRCode from "qrcode";
import { QrCode } from "@mui/icons-material";

const HeritageDetailsPage = ({
  params,
}: {
  params: Promise<{ heritageId: string }>;
}) => {
  const [heritage, setHeritage] = useState<HeritageDataTYPE>();
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
          width: 400,
        },
        function (error) {
          if (error) console.log("creating qr code failed ", error);
        }
      );
    }
  }, [heritageId]);

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
      } catch (error) {}
    };

    fetchDocument();
  }, []);

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
        sx={{ width: "100%", maxWidth: "400px", margin: "25px auto 10px auto" }}
      >
        <List>
          <ListItem sx={{ flexFlow: "column wrap" }}>
            <ListItemText>Qr Code</ListItemText>
            <Box component={"div"}>
              <canvas ref={qrCanvasRef}></canvas>
            </Box>
            <Button
              onClick={qrCodeDownloadHandler}
              startIcon={<QrCode />}
              sx={{ borderRadius: "4px" }}
              color="success"
              variant="outlined"
            >
              Download Qr Code
            </Button>
          </ListItem>
          <ListItem>
            <ListItemText>Title: {heritage?.title}</ListItemText>
          </ListItem>
          {heritage?.image && (
            <ListItem sx={{ flexFlow: "column wrap" }}>
              <ListItemText>Images: </ListItemText>
              <Image
                width={400}
                height={200}
                src={heritage?.image}
                alt={heritage?.title}
              />
            </ListItem>
          )}

          {heritage?.summary && (
            <ListItem>
              <ListItemText>Summary: {heritage?.summary} </ListItemText>
            </ListItem>
          )}
          <ListItem>
            <ListItemText>Category: {heritage?.category}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Location: {heritage?.location}</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Card>
  );
};

export default HeritageDetailsPage;
