"use client";

import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: 6,
            textAlign: "center",
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Main Title */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #333, #666)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              marginBottom: 2,
              fontSize: "17px",
            }}
          >
            Thank You for Visiting!
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: "#666",
              marginBottom: 4,
              lineHeight: 1.6,
               fontSize: "14px",
            }}
          >
            We appreciate your time and hope you enjoyed your experience with our heritage scanning feature.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}