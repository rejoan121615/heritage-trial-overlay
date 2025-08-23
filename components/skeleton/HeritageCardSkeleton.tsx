import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const HeritageCardSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton
        variant="text"
        width="100%"
        height={30}
        sx={{ marginTop: "15px" }}
      />
      <Skeleton variant="text" width="70%" height={30} />
      <Skeleton
        variant="text"
        width="85%"
        height={30}
        sx={{ marginBottom: "15px" }}
      />
      <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}>
        <Skeleton variant="rounded" width="28%" height={20} />
        <Skeleton variant="rounded" width="28%" height={20} />
        <Skeleton variant="rounded" width="28%" height={20} />
      </Box>
    </Box>
  );
};

export default HeritageCardSkeleton;
