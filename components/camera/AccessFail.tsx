import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Alert,
  Typography,
  Divider,
} from "@mui/material";
import { RxReload } from "react-icons/rx";
import TuneIcon from "@mui/icons-material/Tune";

const AccessFail = () => {

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "25px 50px"
      }}
    >
      <Box component={"div"}>
        <Alert severity="error">Camera access failed.</Alert>

        {/* Chrome on Android */}
        <Divider sx={{ marginTop: "20px", marginBottom: "10px" }} />
        <Typography component={"h5"} sx={{ fontWeight: "bold" }}>
          For Chrome on Android:
        </Typography>
        <List sx={{ listStyleType: "disc", marginLeft: "40px" }}>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>
              Tap the lock or setting icon in the address bar.
            </ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>Tap &quot;Permissions&quot;.</ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>Find &quot;Camera&quot; and allow camera permission.</ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>Refresh the page <RxReload style={{ fontSize: "20px", margin: "0px 5px -5px 5px" }} />.</ListItemText>
          </ListItem>
        </List>

        {/* Chrome on iPhone */}
        <Divider sx={{ marginTop: "20px", marginBottom: "10px" }} />
        <Typography component={"h5"} sx={{ fontWeight: "bold" }}>
          For Chrome on iPhone:
        </Typography>
        <List sx={{ listStyleType: "disc", marginLeft: "40px" }}>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>
              Look for the camera icon on the left of the address bar.
            </ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>Tap the camera icon to open permissions.</ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>Turn camera permissions ON.</ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>If the icon doesn&apos;t appear, check your iPhone Settings → Privacy & Security → Camera → Chrome.</ListItemText>
          </ListItem>
        </List>

        {/* Safari on iPhone */}
        <Divider sx={{ marginTop: "20px", marginBottom: "10px" }} />
        <Typography component={"h5"} sx={{ fontWeight: "bold" }}>
          For Safari on iPhone:
        </Typography>
        <List sx={{ listStyleType: "disc", marginLeft: "40px" }}>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>
              Tap the &quot;aA&quot; icon or <TuneIcon sx={{ fontSize: "20px", marginBottom: "-5px" }} /> icon in the address bar.
            </ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>Tap &quot;Website Settings&quot;.</ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>Find &quot;Camera&quot; and select &quot;Allow&quot;.</ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0, paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText>Tap &quot;Done&quot; and refresh the page.</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default AccessFail;
