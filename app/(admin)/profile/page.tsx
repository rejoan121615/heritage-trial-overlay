"use client";

import React, { useContext, useState } from "react";
import {
  Card,
  Box
} from "@mui/material";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import { UserContext } from "@/contexts/UserContext";
import ProfileDetails from "@/components/admin/profile/ProfileDetails";
import ProfileEdit from "@/components/admin/profile/ProfileEdit";


type ProfileStateTYPE = 'profile' | 'profileEdit'

const ProfilePage = () => {

  const { user } = useContext(UserContext);
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
