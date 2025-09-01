import React from "react";
import { Menu, MenuItem, Avatar, Divider } from "@mui/material";

const NotificationList = ({ notificationAnchor, openNotification, notificationCloseHandler } : { notificationAnchor: null | HTMLElement; openNotification: boolean; notificationCloseHandler: () => void; }) => {
  return (
    <Menu
      anchorEl={notificationAnchor}
      id="account-menu"
      open={openNotification}
      onClose={notificationCloseHandler}
      onClick={notificationCloseHandler}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            width: '300px',
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        
      </MenuItem>
      <MenuItem>
        <Avatar /> My account
      </MenuItem>
      <Divider />
      <MenuItem>Add another account</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );
};

export default NotificationList;
