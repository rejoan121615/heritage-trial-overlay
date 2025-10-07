"use client";

import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
          {/* Success Icon */}
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #4CAF50, #8BC34A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "2.5rem",
              }}
            >
              ✓
            </Typography>
          </Box>

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
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Thank You for Visiting!
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            sx={{
              color: "#666",
              marginBottom: 4,
              lineHeight: 1.6,
            }}
          >
            We appreciate your time and hope you enjoyed your experience with our heritage scanning feature.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}