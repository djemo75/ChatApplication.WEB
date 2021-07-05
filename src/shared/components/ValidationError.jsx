import { Box } from "@material-ui/core";

const ValidationError = ({ error }) => {
  return (
    <Box color="red" fontSize="0.75rem">
      {error}
    </Box>
  );
};

export default ValidationError;
