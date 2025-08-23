import React from "react";
import { Divider, Grid, Skeleton } from "@mui/material";
import HeritageDetailsRow from "../admin/heritage/HeritageDetailsRow";

const HeritageDetailsSkeleton = () => {
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
      {/* Image  */}
      <HeritageDetailsRow title="Profile Image">
        <Skeleton variant="circular" width={150} height={150} />
      </HeritageDetailsRow>

      <Grid
        size={12}
        sx={{ marginTop: { xs: "15px", sm: "10px" }, height: "20px" }}
      >
        <Divider />
      </Grid>

      {/* summary  */}
      <HeritageDetailsRow title="User Name">
        <Skeleton variant="text" width="100%" height={20} />
      </HeritageDetailsRow>

      {/* Location  */}
      <HeritageDetailsRow title="Email">
        <Skeleton variant="text" width="100%" height={20} />
      </HeritageDetailsRow>

      {/* Location  */}
      <HeritageDetailsRow title="Total Heritage">
        <Skeleton variant="text" width="100%" height={20} />
      </HeritageDetailsRow>

      <HeritageDetailsRow title="Profile Type">
        <Skeleton variant="text" width="100%" height={20} />
      </HeritageDetailsRow>

      <Grid
        size={12}
        sx={{ marginTop: { xs: "15px", sm: "25px" }, height: "20px" }}
      >
        <Divider />
      </Grid>

      {/* qr code download button  */}
      <HeritageDetailsRow title="">
        <Skeleton variant="rectangular" width={220} height={40} />
      </HeritageDetailsRow>
    </Grid>
  );
};

export default HeritageDetailsSkeleton;
