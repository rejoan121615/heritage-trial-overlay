"use client";

import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { NavList } from "../AdminNav-data";
import Link from "next/link";
import UserProfile from "@/components/userProfile";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";

const drawerWidth = "300px";

const AdminNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();
  const currentUser = useContext(UserContext);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* navigation  */}
      <Box>
        <Toolbar></Toolbar>
        <Divider />
        <List>
          {NavList.map((Item) => {

            if ( Item.type === "user" && !currentUser?.isAdmin) return null;

            return (
              <ListItem key={Item.id} disablePadding>
                <Link
                  href={
                    Item.type === "heritage"
                      ? `/heritage/${Item.path}`
                      : `/${Item.path}`
                  }
                  style={{ width: "100%", textDecoration: "none" }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <Item.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={Item.title}
                      sx={{ color: "#707070" }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>
      {/* user area  */}
      <UserProfile logout={logoutHandler} />
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          display: { xs: "block", md: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { lg: "block", xl: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default AdminNav;
