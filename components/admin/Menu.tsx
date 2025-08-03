"use client"

import { AppBar, Box, Button, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

const Menu = () => {
  return (
      <AppBar className="app-bar" position="static">
        <Toolbar sx={{ justifyContent: 'end'}}>
          <Stack direction={"row"} columnGap={3} >
            <Link href="/admin/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/admin/register">
              <Button color="inherit">Register</Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
  );
};

export default Menu;
