"use client";
import React, { useEffect } from "react";
import AdminNavigation from "@/components/admin/navbar/AdminNav";
import { Box, Toolbar } from "@mui/material";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseConfig";



const drawerWidth = "300px";



const AdminLayout = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();
  const [user, loading, error] = useAuthState(auth)


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router]);



  return (
    <Box sx={{ display: "flex" }}>
      {/* admin navbar  */}
      <AdminNavigation />
      {/* contents  */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          p: 3,
          paddingTop: { xs: '80px', sm: '84px', md: '24px' },
          width: { sm: `calc(100% - ${drawerWidth})` },
          backgroundColor: "#f7f6f9"
        }}
      >
        {/* <Toolbar /> */}
        
        {children}

      </Box>
    </Box>
  );
};

export default AdminLayout;
