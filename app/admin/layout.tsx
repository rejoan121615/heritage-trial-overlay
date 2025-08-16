"use client";
import React from "react";
import Menu from "@/components/admin/Menu";
import AdminNavigation from "@/components/admin/navbar/AdminNav";
import { Box, Toolbar } from "@mui/material";



const drawerWidth = "300px";



const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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
