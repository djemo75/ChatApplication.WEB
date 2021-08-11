import { makeStyles } from "@material-ui/core";

export const useNavigationStyles = makeStyles({
  navigation: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#4343a7",
    width: "60px",
    minHeight: "100vh",
  },
  menuItem: {
    color: "#6b6db4",
    width: "100%",
    textAlign: "center",
    padding: "8px",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "0.3s",

    "&:hover": {
      background: "#5656b0",
      color: "white",
    },
  },
  greenBadge: {
    backgroundColor: "lime",
  },
});

export const useAsideStyles = makeStyles({
  aside: {
    padding: "28px 40px",
    maxWidth: "380px",
    width: "100%",
    maxHeight: "100vh",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  asideTitle: {
    fontSize: "1.5rem",
    color: "#1d1d1d",
    fontWeight: "bold",
  },
  previewBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
