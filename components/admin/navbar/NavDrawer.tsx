import React, { useContext } from "react";
import {
  Box,
  Toolbar,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@mui/material";
import Link from "next/link";
import UserProfile from "@/components/userProfile";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import router from "next/router";
import { NavList } from "../AdminNav-data";
import { UserContext } from "@/contexts/UserContext";

const NavDrawer = () => {
  const { user } = useContext(UserContext);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
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
            if (Item.type === "admin" && !user?.isAdmin) return null;

            return (
              <ListItem key={Item.id} disablePadding>
                <Link
                  href={`/${Item.path}`}
                  style={{ width: "100%", textDecoration: "none" }}
                >
                  {Item.title === "Profile" ? (
                    <Divider component={"div"} sx={{ width: "100%" }} />
                  ) : null}
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
};

export default NavDrawer;
