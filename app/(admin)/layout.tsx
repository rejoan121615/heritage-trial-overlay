"use client";
import React, { useEffect, useState } from "react";
import AdminNavigation from "@/components/admin/navbar/AdminNav";
import { Box } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseConfig";
import LoadingPage from "@/components/feedback/LoadingPage";

const drawerWidth = "300px";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, loading ] = useAuthState(auth);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else {
        setCanRender(true);
      }
    }
  }, [loading, user, router]);

  // Block everything until we know if user is allowed
  if (loading || !canRender) return <LoadingPage />;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* admin navbar  */}
        <AdminNavigation />
        {/* contents  */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            p: 3,
            paddingTop: { xs: "80px", sm: "84px", md: "24px" },
            width: { sm: `calc(100% - ${drawerWidth})` },
            backgroundColor: "#f7f6f9",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
