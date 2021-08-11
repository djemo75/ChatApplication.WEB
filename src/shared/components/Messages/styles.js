import { makeStyles } from "@material-ui/core";

export const useMessagesStyles = makeStyles((theme) => ({
  messagesList: {
    position: "relative",
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
  messageWrapper: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    padding: "10px 0px",
    flexDirection: ({ alignRight }) => (alignRight ? "row-reverse" : "row"),
  },
  avatar: {
    margin: ({ alignRight }) => (alignRight ? "0 0 0 15px" : "0 15px 0 0"),
  },
  message: {
    background: ({ alignRight }) => (alignRight ? "#4545a5" : "#FFF"),
    margin: ({ alignRight }) => (alignRight ? "0 0 0 55px" : "0 55px 0 0"),
    color: ({ alignRight }) => (alignRight ? "#FFF" : "#000"),
    padding: "10px 15px",
    boxShadow: "rgb(0 0 0 / 10%) 0px 1px 2px 0px",
    borderRadius: "10px",
    fontSize: "12px",
    whiteSpace: "break-spaces",
  },
  imageMessage: {
    marginLeft: ({ alignRight }) => (alignRight ? "auto" : "none"),
    maxWidth: "50%",

    "& > img": {
      width: "100%",
      height: "100%",
      boxShadow: "rgb(0 0 0 / 10%) 0px 1px 2px 0px",
      borderRadius: "15px",
      cursor: "pointer",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    cursor: "pointer",

    "& > img": {
      maxWidth: "80%",
      maxHeight: "80%",
    },
  },
  date: {
    marginTop: "8px",
    fontSize: "0.75rem",
    color: "gray",
    textAlign: ({ alignRight }) => (alignRight ? "right" : "left"),
  },
  helloText: {
    textAlign: "center",
    color: "gray",
    position: "absolute",
    bottom: "30px",
    left: "0",
    right: "0",
  },
}));

export const useMessageInputStyles = makeStyles((theme) => ({
  sendButton: {
    backgroundColor: "#ff7655",
    color: "white",
    "&:hover": {
      backgroundColor: "#ed4b23",
    },
  },
  inputNoBorder: {
    border: "none",
  },
}));
