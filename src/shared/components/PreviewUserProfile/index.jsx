import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfile,
  fetchUserProfile,
  uploadImage,
} from "redux/users/actions";

import { useProfileStyles } from "./style";

const PreviewUserProfile = ({ id, canEdit }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state) => state.users.userProfile || {});
  const classes = useProfileStyles({ ...profile });

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUserProfile(id)).then((action) => {
      setLoading(false);
    });
  }, [dispatch, id]);

  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const image = await dispatch(uploadImage(file)).then((action) => {
        return action.payload;
      });

      if (image) {
        await dispatch(editProfile({ avatarId: image.id })).then((action) => {
          if (!action.error) {
            dispatch(fetchUserProfile(id));
          }
        });
      }
    }
  };

  const handleUpdateCover = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const image = await dispatch(uploadImage(file)).then((action) => {
        return action.payload;
      });

      if (image) {
        await dispatch(editProfile({ coverId: image.id })).then((action) => {
          if (!action.error) {
            dispatch(fetchUserProfile(id));
          }
        });
      }
    }
  };

  return (
    <Box width="100%">
      {loading ? (
        <Box mt={5} textAlign="center">
          <CircularProgress color="inherit" size={22} />
        </Box>
      ) : (
        <>
          <Box className={classes.profileCover}>
            {canEdit && (
              <>
                <input
                  id="cover-button-file"
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleUpdateCover}
                />
                <label htmlFor="cover-button-file">
                  <IconButton
                    className={classes.editCoverIcon}
                    size="small"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </>
            )}
          </Box>
          <Box display="flex" justifyContent="center" marginTop="-60px">
            <Box position="relative">
              <Avatar
                style={{
                  background: "#4343a7",
                  width: "120px",
                  height: "120px",
                  border: "1px solid #e2e2e2",
                }}
                src={
                  profile.avatar
                    ? `${process.env.REACT_APP_API_DOMAIN}${profile.avatar.path}`
                    : null
                }
              />
              {canEdit && (
                <>
                  <input
                    id="avatar-button-file"
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleUpdateAvatar}
                  />
                  <label htmlFor="avatar-button-file">
                    <IconButton
                      variant="outlined"
                      className={classes.editAvatarIcon}
                      size="small"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </>
              )}
            </Box>
          </Box>
          <Box textAlign="center" fontWeight="bold" fontSize="2rem" mb={2}>
            {profile.username}
          </Box>
          <Divider />
          <Box component={Paper} p="15px" mt={2}>
            <Box fontWeight="bold">Information</Box>
            <Box mt={1}>Email: {profile.email}</Box>
            <Box>
              Registered on {moment(profile.createdAt).format("MMMM DD YYYY")}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PreviewUserProfile;
