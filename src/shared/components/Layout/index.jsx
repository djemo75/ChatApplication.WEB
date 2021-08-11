import { Box } from "@material-ui/core";

import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <Box
      display="flex"
      alignItems="stretch"
      bgcolor="#fbfbfc"
      minHeight="100vh"
    >
      <Navigation />
      <Box display="flex" alignItems="stretch" width="100%" ml="60px">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
