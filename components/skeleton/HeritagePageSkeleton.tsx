import React from "react";
import { Skeleton, Box, Grid } from "@mui/material";

const HeritagePageSkeleton = () => {
  return (
    <Grid container spacing={3}>
      {new Array(4).fill(null).map((_, index) => {
        return (
          <Grid key={index} size={{ xl: 3 }}>
            <Box>
              <Skeleton variant="rectangular" width="100%" height={118} />
              <Skeleton variant="text" width="100%" height={30} sx={{ marginTop: '15px'}} />
              <Skeleton variant="text" width="70%" height={30} />
              <Skeleton variant="text" width="85%" height={30} sx={{ marginBottom: '15px'}} />
              <Box sx={{ display: 'flex', gap: 1 , justifyContent: 'space-between'}}>
                <Skeleton variant="rounded" width="28%" height={20} />
                <Skeleton variant="rounded" width="28%" height={20} />
                <Skeleton variant="rounded" width="28%" height={20} />
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HeritagePageSkeleton;
