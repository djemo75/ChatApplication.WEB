import { LinearProgress } from "@material-ui/core";
import FriendRequests from "pages/FriendRequests";
import Friends from "pages/Friends";
import Home from "pages/Home";
import Login from "pages/Login";
import Messages from "pages/Messages";
import Register from "pages/Register";
import Users from "pages/Users";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { getProfile, setAuthLoading } from "redux/auth/actions";
import ProtectedRoute from "shared/components/ProtectedRoute";

export const STATIC_ROUTES = {
  notFound: "/not-found",
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  users: "/users",
  friends: "/friends",
  friendRequests: "/friends/requests",
  messages: "/messages",
  settings: "/settings",
};

const authRoutes = [
  {
    path: STATIC_ROUTES.home,
    exact: true,
    component: () => <Redirect to={STATIC_ROUTES.login} />,
  },
  {
    path: STATIC_ROUTES.login,
    exact: true,
    component: () => <Login />,
  },
  {
    path: STATIC_ROUTES.register,
    exact: true,
    component: () => <Register />,
  },
];

const routes = [
  {
    path: STATIC_ROUTES.home,
    exact: true,
    component: () => <Home />,
  },
  {
    path: STATIC_ROUTES.users,
    exact: true,
    component: () => <Users />,
  },
  {
    path: STATIC_ROUTES.friends,
    exact: true,
    component: () => <Friends />,
  },
  {
    path: STATIC_ROUTES.friendRequests,
    exact: true,
    component: () => <FriendRequests />,
  },
  {
    path: STATIC_ROUTES.messages,
    exact: true,
    component: () => <Messages />,
  },
  {
    path: STATIC_ROUTES.settings,
    exact: true,
    component: () => <>daaa</>,
  },
];

export const Routes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userLoading = useSelector((state) => state.auth.userLoading);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getProfile());
    } else {
      dispatch(setAuthLoading(false));
    }
  }, [dispatch]);

  return userLoading ? (
    <LinearProgress />
  ) : (
    <Switch>
      {!user
        ? authRoutes.map((route, i) => <Route key={i} {...route} />)
        : routes.map((route, i) => <ProtectedRoute key={i} {...route} />)}

      <Route
        path={STATIC_ROUTES.notFound}
        exact
        component={() => <>Not Found </>}
      />
      <Route
        path="*"
        component={() => <Redirect to={STATIC_ROUTES.notFound} />}
      />
    </Switch>
  );
};
