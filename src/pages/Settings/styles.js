import { makeStyles } from "@material-ui/core";

export const useSettingsStyles = makeStyles((theme) => ({
  "@keyframes fadeInAnimation": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  tabItem: {
    color: "#8d8d8d",
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxHeight: "56px",
    padding: "8px 10px",
    marginBottom: "15px",
    boxSizing: "border-box",
    cursor: "pointer",
    animation: "$fadeInAnimation ease-out 0.75s",
    transition: "0.5s",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px 0px",

    "&.active, &:hover": {
      color: "#FFF",
      background: "#657295",
    },
  },
}));
