import React, { useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  Divider,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import HeritageDetailsRow from "../heritage/HeritageDetailsRow";
import { UserTYPE } from "@/types/AllTypes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import { useSnackbar } from "@/components/feedback/SnackbarContext";

const ProfileDetails = ({
  userData,
  allowEdit,
}: {
  userData: UserTYPE;
  allowEdit: () => void;
}) => {
  const [user] = useAuthState(auth);
  const { showMessage } = useSnackbar();
  const [startVerification, setStartVerification] = useState<boolean>(false);

  const actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };

  const emailVerificationHandler = async () => {
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user, actionCodeSettings);
        showMessage(
          "Verification email sent, Please check your email",
          "success"
        );
        setStartVerification(true);
      } catch (error) {
        console.log("email verification error", error);
        showMessage("Error sending email verification", "error");
      }
    }
  };

  // user verfication status monitor
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (startVerification && user) {
      timer = setInterval(() => {

        user.reload().then(() => {
          if (user?.emailVerified) {
            clearInterval(timer);
            setStartVerification(false);
            showMessage("Email verified successfully", "success");
          }
        })
        
      }, 5000);
    }

    return () => {
      clearInterval(timer);
    }
    
  }, [startVerification, showMessage, user]);

  return (
    <Grid
      container
      alignItems={'center'}
      sx={{
        rowGap: { sm: "20px" },
        width: "100%",
        maxWidth: "650px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* title  */}
      <HeritageDetailsRow title="Profile Image">
        <Avatar alt="Mohd Rejoan" sx={{ width: "150px", height: "150px" }} src={userData.image} />
      </HeritageDetailsRow>

      <Grid size={12} sx={{ marginTop: { xs: "15px", sm: "0px" } }}>
        <Divider />
      </Grid>

      {/* title  */}
      <HeritageDetailsRow title="User Name">
        <Typography>{userData.name}</Typography>
      </HeritageDetailsRow>

      {/* Image  */}
      <HeritageDetailsRow title="Email">
        <Stack flexDirection={"row"} alignItems={"start"} gap={2}>
          <Typography>{userData.email}</Typography>
          {user?.emailVerified ? (
            <Chip label={"Verifyed"} color="success" />
          ) : (
            <>
              <Chip
                label={"not verifyed"}
                color="error"
                sx={{ textTransform: "capitalize" }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={emailVerificationHandler}
                disabled={startVerification}
              >
                Verify Email
              </Button>
            </>
          )}
        </Stack>
      </HeritageDetailsRow>

      {/* summary  */}
      {startVerification && (
        <HeritageDetailsRow title="">
          <Typography>Email send, Check inbox / spam folder</Typography>
        </HeritageDetailsRow>
      )}

      {/* summary  */}
      <HeritageDetailsRow title="Profile Type">
        <Typography>{userData.isAdmin ? "Admin" : "User"}</Typography>
      </HeritageDetailsRow>

      {/* Location  */}
      <HeritageDetailsRow title="Total Heritage">
        <Typography>{userData.totalHeritage}</Typography>
      </HeritageDetailsRow>

      <Grid size={12} sx={{ marginBottom: { xs: "15px", sm: "0px" } }}>
        <Divider />
      </Grid>

      {/* Action buttons  */}
      <HeritageDetailsRow title="">
        <Button variant="contained" color="primary" onClick={allowEdit}>
          Edit Profile
        </Button>
      </HeritageDetailsRow>
    </Grid>
  );
};

export default ProfileDetails;
