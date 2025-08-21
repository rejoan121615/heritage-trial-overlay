import React from "react";
import { Grid, Avatar, Divider, Typography, Button } from "@mui/material";
import HeritageDetailsRow from "../heritage/HeritageDetailsRow";
import { UserContext } from "@/contexts/UserContext";
import { createContext } from "vm";
import { UserTYPE } from "@/types/AllTypes";

const ProfileDetails = ({ user, allowEdit } : { user: UserTYPE, allowEdit: () => void }) => {




  return (
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
      <HeritageDetailsRow title="Profile Image">
        <Avatar alt="Mohd Rejoan" sx={{ width: "150px", height: "150px" }} />
      </HeritageDetailsRow>

      <Grid size={12} sx={{ marginTop: { xs: "15px", sm: "0px" } }}>
        <Divider />
      </Grid>

      {/* title  */}
      <HeritageDetailsRow title="User Name">
        <Typography>{user.name}</Typography>
      </HeritageDetailsRow>

      {/* Image  */}
      <HeritageDetailsRow title="Email">
        <Typography>{user.email}</Typography>
      </HeritageDetailsRow>

      {/* summary  */}
      <HeritageDetailsRow title="Profile Type">
        <Typography>{user.isAdmin ? "Admin" : "User"}</Typography>
      </HeritageDetailsRow>

      {/* Location  */}
      <HeritageDetailsRow title="Total Heritage">
        <Typography>{user.totalHeritage}</Typography>
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
