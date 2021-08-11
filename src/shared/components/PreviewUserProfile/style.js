import { makeStyles } from "@material-ui/core";

export const useProfileStyles = makeStyles((theme) => ({
  profileCover: {
    marginTop: "40px",
    borderRadius: "5px",
    width: "100%",
    height: "200px",
    backgroundColor: "#0093E9",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: ({ cover }) =>
      cover
        ? `url(${process.env.REACT_APP_API_DOMAIN}${cover.path})`
        : "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    position: "relative",
  },
  editCoverIcon: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
  },
  editAvatarIcon: {
    position: "absolute",
    bottom: "-10px",
    right: "-10px",
  },
}));
