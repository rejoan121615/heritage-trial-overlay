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

          {/* Message */}
          <Box
            sx={{
              background: "linear-gradient(45deg, #f3f4f6, #e5e7eb)",
              padding: 3,
              borderRadius: 3,
              marginBottom: 4,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#555",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              "Your curiosity and interest in preserving cultural heritage helps us continue our mission to make history accessible to everyone."
            </Typography>
          </Box>

          {/* Features Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              marginBottom: 4,
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                padding: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: "bold", marginBottom: 1 }}>
                Explore More
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Discover other historical sites and artifacts in our collection
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                padding: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "#2196F3", fontWeight: "bold", marginBottom: 1 }}>
                Share Experience
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Tell your friends about this innovative way to experience heritage
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => router.push("/")}
              sx={{
                background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                padding: "12px 30px",
                borderRadius: 3,
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: "0 4px 15px rgba(33, 150, 243, 0.3)",
                "&:hover": {
                  background: "linear-gradient(45deg, #1976D2, #00B0FF)",
                  boxShadow: "0 6px 20px rgba(33, 150, 243, 0.4)",
                },
              }}
            >
              Back to Home
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
              sx={{
                borderColor: "#666",
                color: "#666",
                padding: "12px 30px",
                borderRadius: 3,
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  borderColor: "#333",
                  color: "#333",
                  background: "rgba(0,0,0,0.04)",
                },
              }}
            >
              Go Back
            </Button>
          </Box>

          {/* Footer Note */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              marginTop: 4,
              color: "#999",
              fontStyle: "italic",
            }}
          >
            Come back soon to explore more heritage treasures!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}