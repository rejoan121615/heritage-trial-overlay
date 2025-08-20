import React, { ReactNode } from "react";
import { Grid, Typography } from "@mui/material";

const HeritageDetailsRow = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <>
      <Grid size={{ xs: 12, sm: 2 }}>
        {title && (
          <Typography
            sx={{ fontWeight: "700", textAlign: { xs: "left", sm: "right" } }}
          >
            {title}:
          </Typography>
        )}
      </Grid>

      <Grid
        size={{ xs: 12, sm: 9 }}
        sx={{
          paddingLeft: { sm: "30px", lg: "50px" },
          marginBottom: { xs: "15px", sm: "0px" },
        }}
      >
        {children}
      </Grid>
    </>
  );
};

export default HeritageDetailsRow;
