import { Avatar, Box, Divider, Paper } from "@material-ui/core";
import { PermIdentity } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanUpUsers, fetchUsers } from "redux/users/actions";
import ChatList from "shared/components/ChatList";
import DebouncedSearch from "shared/components/DebouncedSearch";
import {
  useAsideStyles,
  useProfileStyles,
} from "shared/components/Layout/styles";

const pageSize = 15;

const Users = () => {
  const classes = useAsideStyles();
  const profileClasses = useProfileStyles();
  const dispatch = useDispatch();
  const { users, totalUsers } = useSelector((state) => state.users);
  const usersLoading = useSelector((state) => state.users.usersLoading);
  const [searchString, setSearchString] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadData();
  }, [searchString]); // eslint-disable-line

  useEffect(() => {
    return () => dispatch(cleanUpUsers());
  }, [dispatch]);

  const loadData = () => {
    const params = { searchString, pageNumber, pageSize };
    dispatch(fetchUsers(params));
    setPageNumber(pageNumber + 1);
  };

  const handleSearch = (value) => {
    if (value !== searchString) {
      dispatch(cleanUpUsers());
      setPageNumber(1);
      setSearchString(value);
    }
  };

  return (
    <Box display="flex" width="100%">
      <Box className={classes.aside}>
        <Box className={classes.asideTitle}>Users</Box>
        <Box mt={4}>
          <DebouncedSearch value={searchString} onChange={handleSearch} />
        </Box>

        <Box my={2}>
          <Divider />
        </Box>

        <ChatList
          data={users.map((user) => ({
            ...user,
            primaryText: user.username,
            secondaryText: user.email,
          }))}
          hasMore={totalUsers > (pageNumber - 1) * pageSize}
          loadMore={loadData}
          loading={usersLoading}
          showRequestActions
          onItemClick={setSelectedUser}
        />
      </Box>
      {selectedUser ? (
        <Box width="100%" height="100%" marginX="5%">
          <Box className={profileClasses.profileWall}></Box>
          <Box display="flex" justifyContent="center" marginTop="60px">
            <Avatar
              style={{
                background: "#4343a7",
                width: "120px",
                height: "120px",
              }}
            ></Avatar>
          </Box>
          <Box textAlign="center" fontWeight="bold" fontSize="2rem" mb={2}>
            {selectedUser.username}
          </Box>
          <Divider />
          <Box component={Paper} p="15px" mt={2}>
            <Box fontWeight="bold">Information</Box>
            <Box mt={1}>Email: {selectedUser.email}</Box>
            <Box>Registered on {selectedUser.createdAt}</Box>
          </Box>
        </Box>
      ) : (
        <Box className={classes.previewBox}>
          <Box textAlign="center">
            <PermIdentity
              style={{ width: "100px", height: "100px", color: "gray" }}
            />
            <Box>Select people&apos;s names to preview their profile.</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Users;
