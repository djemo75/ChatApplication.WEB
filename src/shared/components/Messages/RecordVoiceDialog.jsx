import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Mic } from "@material-ui/icons";
import { MESSAGE_TYPES } from "constants/messages";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addMessage, uploadAudio } from "redux/users/actions";
import { audioRecorder } from "utils/audio";

import { socket } from "../SocketManagement";

const useStyles = makeStyles(() => ({ paper: { maxWidth: "350px" } }));

let recorder;

const RecordVoiceDialog = ({ onClose, messagesEndRef, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);
  const [audio, setAudio] = useState();

  const handleStartRecording = async () => {
    recorder = await audioRecorder();
    recorder.start();
    setIsRecordingStarted(true);
  };

  const handleStopRecording = async () => {
    const record = await recorder.stop();
    setAudio(record);
    setIsRecordingStarted(false);
  };

  const handleStartAudio = () => audio.play();
  const handleClose = () => onClose();

  const handleSendAudio = () => {
    const file = new File([audio.audioBlob], "recording.wav", {
      type: "audio/wav",
    });
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
                  handleClose();
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
      handleClose();
    }
  };

  return (
    <>
      <Dialog
        open
        onClose={handleClose}
        classes={{ paper: classes.paper }}
        fullWidth
      >
        <DialogTitle>Voice Message</DialogTitle>
        <DialogContent>
          <Box textAlign="center">
            <IconButton
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              }}
              onClick={() =>
                !isRecordingStarted
                  ? handleStartRecording()
                  : handleStopRecording()
              }
            >
              <Mic
                style={{
                  width: "70px",
                  height: "70px",
                  color: isRecordingStarted ? "red" : "gray",
                }}
              />
            </IconButton>
            <Box mt={1}>
              <DialogContentText>
                {isRecordingStarted ? "Tap to stop." : "Tap to start."}
              </DialogContentText>
            </Box>
            {audio && (
              <Box mb={2}>
                <Box mb={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleStartAudio}
                    fullWidth
                  >
                    Listen
                  </Button>
                </Box>
              </Box>
            )}
            <Box mb={2}>
              <Box component={Grid} container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="outlined" onClick={handleClose} fullWidth>
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleSendAudio}
                    disabled={!audio}
                    fullWidth
                  >
                    Send
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecordVoiceDialog;
