import { makeStyles } from "@material-ui/core";

export const useAuthStyles = makeStyles({
  main: {
    background: "#f8f8f8",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    maxWidth: "820px",
    width: "100%",
    margin: "0px 15px",
    padding: "30px 60px",
    borderRadius: "20px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
  },
  textLink: {
    cursor: "pointer",
    textDecoration: "underline",
    color: "#000",

    "&:hover": {
      color: "gray",
    },
  },
});
