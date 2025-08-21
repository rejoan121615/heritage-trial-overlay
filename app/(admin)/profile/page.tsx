"use client";

import React, { use, useContext, useEffect, useRef, useState } from "react";
import {
  Card,
  Box,
  Button,
  Typography,
  Grid,
  Divider,
  Avatar,
} from "@mui/material";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { HeritageDataTYPE } from "@/types/AllTypes";
import QRCode from "qrcode";
import { QrCode } from "@mui/icons-material";
import HeritageDetailsRow from "@/components/admin/heritage/HeritageDetailsRow";
import HeritageDetailsSkeleton from "@/components/skeleton/HeritageDetailsSkeleton";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import { UserContext } from "@/contexts/UserContext";
import ProfileDetails from "@/components/admin/profile/ProfileDetails";
import ProfileEdit from "@/components/admin/profile/ProfileEdit";


type ProfileStateTYPE = 'profile' | 'profileEdit'

const ProfilePage = ({
  params,
}: {
  params: Promise<{ heritageId: string }>;
}) => {

  const currentUser = useContext(UserContext);
  const [currentWindow, setcurrentWindow] = useState<ProfileStateTYPE>('profile');


  // fetch heritage data
  useEffect(() => {
    // const fetchDocument = async () => {
    //   try {
    //     const docRef = doc(db, "heritages", heritageId);
    //     const docSnapshot = await getDoc(docRef);

    //     if (docSnapshot.exists()) {
    //       setHeritage({
    //         id: docSnapshot.id,
    //         ...docSnapshot.data(),
    //       } as HeritageDataTYPE);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching heritage data:", error);
    //     setHeritage(null);
    //   }
    // };

    // if (heritageId) {
    //   fetchDocument();
    // }
  }, []);



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
        { currentUser == null ? (
          <ProfileSkeleton />
        ) : currentWindow === 'profile' ? (
          <ProfileDetails userData={currentUser} allowEdit={ () => setcurrentWindow('profileEdit')} />
        ) : (
          <ProfileEdit closeEdit={() => setcurrentWindow('profile')} />
        )}
      </Box>
    </Card>
  );
};

export default ProfilePage;
