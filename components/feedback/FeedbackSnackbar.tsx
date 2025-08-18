import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar, SnackbarCloseReason, Alert } from "@mui/material";

const FeedbackSnackbar = ({
  open,
  setOpen,
  title,
  alertType
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  alertType: "success" | "error" | "warning" | "info";
}) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={alertType} sx={{ width: "100%" }} action={action}>
        {title}
      </Alert>
    </Snackbar>
  );
};

export default FeedbackSnackbar;
