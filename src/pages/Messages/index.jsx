import { Box, Divider } from "@material-ui/core";
import { Chat } from "@material-ui/icons";
import ChatList from "shared/components/ChatList";
import { useAsideStyles } from "shared/components/Layout/styles";

const Messages = () => {
  const classes = useAsideStyles();

  const mocks = [];

  return (
    <Box display="flex" width="100%">
      <Box className={classes.aside}>
        <Box className={classes.asideTitle}>Messages</Box>

        <Box my={2}>
          <Divider />
        </Box>
        <ChatList data={mocks} onItemClick={(data) => console.log(data)} />
      </Box>
      <Box className={classes.previewBox}>
        <Box textAlign="center">
          <Chat style={{ width: "100px", height: "100px", color: "gray" }} />
          <Box>Select people&apos;s names to preview their chat.</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Messages;
