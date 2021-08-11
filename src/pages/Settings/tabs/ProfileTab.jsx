import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";

import PreviewUserProfile from "../../../shared/components/PreviewUserProfile";

const ProfileTab = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box mr="40px">
      <PreviewUserProfile id={user.id} canEdit />
    </Box>
  );
};

export default ProfileTab;
