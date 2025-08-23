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
import { userInfo } from "os";


type ProfileStateTYPE = 'profile' | 'profileEdit'

const ProfilePage = ({
  params,
}: {
  params: Promise<{ heritageId: string }>;
}) => {

  const { user, setUser } = useContext(UserContext);
  const [currentWindow, setcurrentWindow] = useState<ProfileStateTYPE>('profile');
  const [applyEdit, setApplyEdit] = useState(false);


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
        { applyEdit || user == null ? (
          <ProfileSkeleton />
        ) : currentWindow === 'profile' ? (
          <ProfileDetails userData={user} allowEdit={ () => setcurrentWindow('profileEdit')} />
        ) : (
          <ProfileEdit closeEdit={() => setcurrentWindow('profile')} setApplyEdit={setApplyEdit} />
        )}
      </Box>
    </Card>
  );
};

export default ProfilePage;
