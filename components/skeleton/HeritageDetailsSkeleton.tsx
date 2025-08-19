import React from "react";
import { Grid, Skeleton } from "@mui/material";
import HeritageDetailsRow from "../admin/heritage/HeritageDetailsRow";

const HeritageDetailsSkeleton = () => {
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
      <HeritageDetailsRow title="Title">
        <Skeleton variant="text" width="100%" height={20} />
      </HeritageDetailsRow>

      {/* Image  */}
      <HeritageDetailsRow title="Image">
        <Skeleton variant="rectangular" width="100%" height={200} />
      </HeritageDetailsRow>

      {/* summary  */}
      <HeritageDetailsRow title="Summary">
        <Skeleton variant="text" width="100%" height={20} />
      </HeritageDetailsRow>

      {/* Location  */}
      <HeritageDetailsRow title="Location">
        <Skeleton variant="text" width="100%" height={20} />
      </HeritageDetailsRow>

      {/* Location  */}
      <HeritageDetailsRow title="Category">
        <Skeleton variant="text" width="100%" height={20} />
      </HeritageDetailsRow>

      {/* qr code  */}
      <HeritageDetailsRow title="QR-Code">
        <Skeleton variant="rectangular" width={250} height={250} />
      </HeritageDetailsRow>

      {/* qr code download button  */}
      <HeritageDetailsRow title="">
        <Skeleton variant="rectangular" width={220} height={40} />
      </HeritageDetailsRow>
    </Grid>
  );
};

export default HeritageDetailsSkeleton;
