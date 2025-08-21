import ViewListIcon from "@mui/icons-material/ViewList";
import AddBoxIcon from "@mui/icons-material/AddBox";
import GroupIcon from "@mui/icons-material/Group";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

type NavItemTYPE = {
  id: number;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, "svg">> & {
    muiName: string;
  };
  path: string;
  type: "user" | "admin";
};

export const NavList: NavItemTYPE[] = [
  {
    id: 1,
    title: "New Heritage",
    icon: AddBoxIcon,
    path: "heritage/new",
    type: "user",
  },
  {
    id: 2,
    title: "All Heritage",
    icon: ViewListIcon,
    path: "heritage",
    type: "user",
  },
  {
    id: 3,
    title: "Users",
    icon: GroupIcon,
    path: "users",
    type: "admin",
  },
  {
    id: 4,
    title: "Profile",
    icon: AccountBoxIcon,
    path: "profile",
    type: "user",
  },
];
