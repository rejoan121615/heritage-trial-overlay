import React from "react";
import { Box, List, Typography, ListItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const AccessFail = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: '25px',
        paddingBottom: '25px'
      }}
    >
      <Box component={"div"}>
        <Typography sx={{ padding: "10px", fontSize: '20px' }} variant="h6">
          # Getting camera access fail. We need your camera access to continue.
        </Typography>
        <Box sx={{ marginLeft: "50px", marginTop: "20px" }}>
          <strong style={{ marginLeft: "5px", marginRight: "5px" }}>
            iOS (Safari):
          </strong>
          <List sx={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <ListItem>
              Open
              <strong style={{ marginLeft: "5px", marginRight: "5px" }}>
                Settings
              </strong>
              →
              <strong style={{ marginLeft: "5px", marginRight: "5px" }}>
                Safari
              </strong>
            </ListItem>
            <ListItem>
              Tap
              <strong style={{ marginLeft: "5px", marginRight: "5px" }}>
                Camera
              </strong>{" "}
              → Set to "Ask" or "Allow"
            </ListItem>
            <ListItem>Return to Safari and reload the page</ListItem>
          </List>
        </Box>

        <Box sx={{ marginLeft: "50px", marginTop: "20px" }}>
          <strong style={{ marginLeft: "5px", marginRight: "5px" }}>
            Android (Chrome):
          </strong>
          <List sx={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <ListItem>Tap the 🔒 lock icon in the address bar</ListItem>
            <ListItem>
              Select{" "}
              <strong style={{ marginLeft: "5px", marginRight: "5px" }}>
                {" "}
                Permissions{" "}
              </strong>{" "}
              or{" "}
              <strong style={{ marginLeft: "5px", marginRight: "5px" }}>
                Site settings
              </strong>
            </ListItem>
            <ListItem>
              Set{" "}
              <strong style={{ marginLeft: "5px", marginRight: "5px" }}>
                Camera
              </strong>{" "}
              to "Allow"
            </ListItem>
            <ListItem>Reload the page</ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default AccessFail;
