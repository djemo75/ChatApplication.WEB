import { makeStyles } from "@material-ui/core";

export const useNavigationStyles = makeStyles({
  navigation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#4343a7",
    minWidth: "60px",
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

export const useProfileStyles = makeStyles({
  profileWall: {
    marginTop: "20px",
    borderRadius: "5px",
    width: "100%",
    height: "200px",
    bgcolor: "gray",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80)",
  },
});
