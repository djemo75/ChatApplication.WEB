import { makeStyles } from "@material-ui/core";

export const useChatListStyles = makeStyles({
  chatList: {
    maxHeight: "100%",
    height: "100%",
    marginRight: "-10px",
    paddingRight: "10px",
    overflowY: "auto",

    "&::-webkit-scrollbar-track": {
      backgroundColor: "#ffffff00",
    },
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dddee0",
      border: "4px solid #dddee0",
    },
  },
});

export const useChatListItemStyles = makeStyles((theme) => ({
  "@keyframes fadeInAnimation": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  item: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxHeight: "56px",
    background: "#FFF",
    borderRadius: "5px",
    border: "1px solid #f3f3f3",
    padding: "8px 10px",
    marginBottom: "15px",
    boxSizing: "border-box",
    cursor: ({ onItemClick }) => (onItemClick ? "pointer" : "normal"),
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
    animation: "$fadeInAnimation ease-out 0.75s",
    transition: "0.5s",

    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px 0px",
    },
  },
  username: {
    fontWeight: "500",
  },
  lastMessage: {
    fontSize: "0.75rem",
    color: "gray",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  date: {
    fontSize: "0.75rem",
    color: "gray",
    fontWeight: "500",
    marginLeft: "auto",
  },
  newMessageIndicator: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#ffb54a",
  },
  avatarBadge: {
    backgroundColor: ({ isOnline }) => (isOnline ? "#44b700" : "gray"),
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      display: ({ isOnline }) => (isOnline ? "block" : "none"),
      position: "absolute",
      top: "-1.25px",
      left: "-1.25px",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: "''",
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
