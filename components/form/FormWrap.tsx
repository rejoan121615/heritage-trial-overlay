"use client";

import {
  Box,
  Button,
  Stack,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import React, { ReactNode } from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FormWrapper = ({
  type,
  children,
  submit,
  loading,
  disableSubmit,
}: {
  type: "login" | "register" | "resetPassword";
  children: ReactNode;
  submit: () => void;
  loading: boolean;
  disableSubmit?: boolean;
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
          position: "relative",
        })}
        onSubmit={submit}
      >
        {/* go back button  */}
        {type === "resetPassword" && (
          <Link href={"/login"}>
            <IconButton
              sx={{ position: "absolute", top: "10px", left: "10px" }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Link>
        )}

        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "18px",
            letterSpacing: "1px",
          }}
        >
          {type === "login"
            ? "Login in your account"
            : type === "register"
            ? "Create a new account"
            : "Reset your password"}
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
            sx={{
              backgroundColor: disableSubmit ? "#ccc" : "#292a33",
              color: "#FFF",
              padding: "15px",
            }}
            disabled={loading || disableSubmit}
          >
            {type === "login"
              ? "Login"
              : type === "register"
              ? "Register"
              : "Send Email"}
          </Button>
        </Stack>

        <Box>
          {type === "login" ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  columnGap: "5px",
                }}
              >
                <Typography>Does't have an account?</Typography>
                <Link href={`/register`}>Register</Link>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  columnGap: "5px",
                }}
              >
                <Link href={`/reset-password`}>Forgot Password?</Link>
              </Box>
            </>
          ) : type === "register" ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  columnGap: "5px",
                }}
              >
                <Typography>Already have an account?</Typography>
                <Link href={`/login`}>Login</Link>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ textAlign: "center" }}>
                <Link href={`/email-verification`}></Link>
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FormWrapper;
