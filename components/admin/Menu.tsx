"use client"

import { AppBar,  Button, Stack, Toolbar } from "@mui/material";
import React from "react";
import Link from "next/link";

const Menu = () => {
  return (
      <AppBar className="app-bar" position="static">
        <Toolbar sx={{ justifyContent: 'end'}}>
          <Stack direction={"row"} columnGap={3} >
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/register">
              <Button color="inherit">Register</Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
  );
};

export default Menu;
