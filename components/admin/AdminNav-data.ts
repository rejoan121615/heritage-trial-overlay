
import ViewListIcon from '@mui/icons-material/ViewList';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GroupIcon from '@mui/icons-material/Group';

export const NavList = [
  {
    id: 1,
    title: "New Heritage",
    icon: AddBoxIcon,
    path: 'new',
    type: 'heritage'
  },
  {
    id: 2,
    title: "All Heritage",
    icon: ViewListIcon,
    path: '',
    type: 'heritage'
  },
  {
    id: 3,
    title: "Users",
    icon: GroupIcon,
    path: 'users',
    type: 'user'
  }
];
