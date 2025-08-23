import React from "react";
import { Skeleton, Box, Grid } from "@mui/material";
import HeritageCardSkeleton from "./HeritageCardSkeleton";

const HeritagePageSkeleton = () => {
  return (
    <Grid container spacing={3} sx={{ width: "100%" }}>
      {new Array(4).fill(null).map((_, index) => {
        return (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
            <HeritageCardSkeleton key={index} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HeritagePageSkeleton;
