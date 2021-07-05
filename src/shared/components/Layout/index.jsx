import { Box } from "@material-ui/core";

import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <Box display="flex" alignItems="stretch" bgcolor="#fbfbfc">
      <Navigation />
      {children}
    </Box>
  );
};

export default Layout;
