import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { AttachFile, Audiotrack, Image, Send } from "@material-ui/icons";
import { MESSAGE_TYPES } from "constants/messages";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addMessage, uploadAudio, uploadImage } from "redux/users/actions";
import { socket } from "shared/components/SocketManagement";

import { useMessageInputStyles } from "./styles";

const MessageInput = ({ id, messagesEndRef }) => {
  const classes = useMessageInputStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");
  const imageInput = useRef(null);
  const audioInput = useRef(null);

  const handleMenuOpen = ({ currentTarget }) => setAnchorEl(currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMessageSend = () => {
    if (socket.connected) {
      socket.emit(
        "message:create",
        { id, messageType: MESSAGE_TYPES.text, content: value },
        (response) => {
          if (response.statusCode === "ok") {
            setValue("");
            dispatch(addMessage({ message: response.message }));
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          } else {
            toast.error(response.message);
          }
        },
      );
    } else {
      toast.error("There is a connection problem");
    }
  };

  const handleSelectImage = () => imageInput.current.click();

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadImage(file)).then((action) => {
        if (!action.error) {
          const image = action.payload;

          if (socket.connected) {
            socket.emit(
              "message:create",
              { id, messageType: MESSAGE_TYPES.image, resourceId: image.id },
              (response) => {
                if (response.statusCode === "ok") {
                  dispatch(addMessage({ message: response.message }));
                  handleMenuClose();
                  messagesEndRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                } else {
                  toast.error(response.message);
                }
              },
            );
          } else {
            toast.error("There is a connection problem");
          }
        }
      });
    } else {
      handleMenuClose();
    }
  };

  const handleSelectAudio = () => audioInput.current.click();

  const handleSendAudio = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadAudio(file)).then((action) => {
        if (!action.error) {
          const audio = action.payload;

          if (socket.connected) {
            socket.emit(
              "message:create",
              { id, messageType: MESSAGE_TYPES.audio, resourceId: audio.id },
              (response) => {
                if (response.statusCode === "ok") {
                  dispatch(addMessage({ message: response.message }));
                  handleMenuClose();
                  messagesEndRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                } else {
                  toast.error(response.message);
                }
              },
            );
          } else {
            toast.error("There is a connection problem");
          }
        }
      });
    } else {
      handleMenuClose();
    }
  };

  return (
    <Box marginTop="auto" mb={2}>
      <Divider />

      <Box display="flex" mt={2} alignItems="center">
        <IconButton onClick={handleMenuOpen}>
          <AttachFile />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleSelectImage}>
            <Image fontSize="small" />
            <Box component="span" ml={2}>
              Image
            </Box>
            <input
              id="image-button-file"
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              ref={imageInput}
              onChange={handleSendImage}
            />
          </MenuItem>
          <MenuItem onClick={handleSelectAudio}>
            <Audiotrack fontSize="small" />
            <Box component="span" ml={2}>
              Audio
            </Box>
            <input
              id="audio-button-file"
              accept="audio/*"
              type="file"
              style={{ display: "none" }}
              ref={audioInput}
              onChange={handleSendAudio}
            />
          </MenuItem>
        </Menu>

        <Box width="100%">
          <TextField
            variant="outlined"
            placeholder="Write your message..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (!e.shiftKey && e.keyCode === 13) {
                e.preventDefault();
                if (value) handleMessageSend();
              }
            }}
            InputProps={{ classes: { notchedOutline: classes.inputNoBorder } }}
            fullWidth
            multiline
          />
        </Box>

        <Box ml={2}>
          <IconButton
            variant="contained"
            onClick={handleMessageSend}
            className={classes.sendButton}
            disabled={!value}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageInput;
