import { Badge, Box, Tooltip } from "@material-ui/core";
import {
  AccessibilityNewOutlined,
  ChatOutlined,
  Contacts,
  FormatAlignLeftOutlined,
  HomeOutlined,
  PersonAdd,
  Settings,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { STATIC_ROUTES } from "Routes";

import { useNavigationStyles } from "./styles";

const Navigation = () => {
  const classes = useNavigationStyles();
  const friendRequests = useSelector((state) => state.users.friendRequests);

  const menuItems = [
    { label: "Home", icon: <HomeOutlined />, to: STATIC_ROUTES.home },
    {
      label: "Friend Requests",
      icon: friendRequests.length ? (
        <Badge variant="dot" color="secondary">
          <PersonAdd />
        </Badge>
      ) : (
        <PersonAdd />
      ),
      to: STATIC_ROUTES.friendRequests,
    },
    {
      label: "Users",
      icon: <Contacts />,
      to: STATIC_ROUTES.users,
    },
    {
      label: "Friends",
      icon: <AccessibilityNewOutlined />,
      to: STATIC_ROUTES.friends,
    },
    { label: "Messages", icon: <ChatOutlined />, to: STATIC_ROUTES.messages },
    { label: "Settings", icon: <Settings />, to: STATIC_ROUTES.settings },
  ];

  return (
    <Box className={classes.navigation}>
      <Box mt={4} mb={8} color="white">
        <FormatAlignLeftOutlined />
      </Box>

      {menuItems.map((item, index) => (
        <Link to={item.to} key={index} style={{ width: "100%" }}>
          <Tooltip to={item.to} title={item.label} placement="right">
            <Box className={classes.menuItem}>{item.icon}</Box>
          </Tooltip>
        </Link>
      ))}
    </Box>
  );
};

export default Navigation;
