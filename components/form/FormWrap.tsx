"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { ReactNode } from "react";
import Link from "next/link";

const FormWrapper = ({
  children,
  helperNode,
  title,
  submitTitle,
  submit,
  loading
}: {
  children: ReactNode;
  helperNode:
    | { text: string; link: { url: string; title: string } }
    | undefined;
  title: string;
  submitTitle: string;
  submit: () => void;
  loading: boolean
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={"form"}
        sx={(theme) => ({
          width: "100%",
          maxWidth: "550px",
          padding: "20px",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "10px",
        })}
        onSubmit={submit}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "18px",
            letterSpacing: "1px",
          }}
        >
          {title}
        </Typography>
        <Stack
          direction={"column"}
          rowGap={3}
          sx={{ marginTop: "35px", marginBottom: "25px" }}
        >
          {/* input field as children  */}
          {children}

          <Button
            loading={loading}
            loadingIndicator={
              <CircularProgress size={28} sx={{ color: "#fff" }} />
            }
            size="large"
            type="submit"
            sx={{ backgroundColor: "#292a33", color: "#FFF", padding: "15px" }}
          >
            {submitTitle}
          </Button>
        </Stack>
        {helperNode && Object.keys(helperNode).length ? (
          <Typography sx={{ textAlign: "center" }}>
            {helperNode.text}{" "}
            <Link href={`${helperNode.link.url}`}>{helperNode.link.title}</Link>
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};

export default FormWrapper;
