import { Box, IconButton } from "@material-ui/core";
import { Mic } from "@material-ui/icons";
import { formatDistance } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";

import UserAvatar from "../UserAvatar";
import RecordVoiceDialog from "./RecordVoiceDialog";

const MessagesHeader = (props) => {
  const { username, avatar } = props;
  const [isVoiceDialogOpen, setIsVoiceDialogOpen] = useState(false);
  const friends = useSelector((state) => state.users.friends);
  const currentFriend = friends.find((f) => f.username === username);

  return (
    <Box
      mt={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <UserAvatar
          size="60px"
          src={
            avatar ? `${process.env.REACT_APP_API_DOMAIN}${avatar.path}` : null
          }
        />
        <Box ml={2}>
          <Box fontSize="1.25rem" fontWeight="bold">
            {username}
          </Box>
          <Box fontSize="0.75rem" color="gray">
            {currentFriend.isOnline
              ? "Online"
              : currentFriend.lastOnlineDate
              ? `Last online ${formatDistance(
                  new Date(currentFriend.lastOnlineDate),
                  new Date(),
                  {
                    addSuffix: true,
                  },
                )}`
              : "Offline"}
          </Box>
        </Box>
      </Box>
      <Box>
        <IconButton color="primary" onClick={() => setIsVoiceDialogOpen(true)}>
          <Mic />
        </IconButton>
      </Box>

      {isVoiceDialogOpen && (
        <RecordVoiceDialog
          onClose={() => setIsVoiceDialogOpen(false)}
          {...props}
        />
      )}
    </Box>
  );
};

export default MessagesHeader;
