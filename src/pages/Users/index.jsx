import { Box, Divider } from "@material-ui/core";
import { PermIdentity } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanUpUsers, fetchUsers } from "redux/users/actions";
import ChatList from "shared/components/ChatList";
import DebouncedSearch from "shared/components/DebouncedSearch";
import { useAsideStyles } from "shared/components/Layout/styles";
import PreviewUserProfile from "shared/components/PreviewUserProfile";

const pageSize = 15;

const Users = () => {
  const classes = useAsideStyles();
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
          data={users}
          hasMore={totalUsers > (pageNumber - 1) * pageSize}
          loadMore={loadData}
          loading={usersLoading}
          showRequestActions
          onItemClick={setSelectedUser}
        />
      </Box>
      {selectedUser ? (
        <Box width="100%" mr="40px">
          <PreviewUserProfile {...selectedUser} />
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
