import { Route } from "react-router";

import Layout from "./Layout";

const ProtectedRoute = ({ component, ...rest }) => {
  return <Route {...rest} component={() => <Layout>{component()}</Layout>} />;
};

export default ProtectedRoute;
