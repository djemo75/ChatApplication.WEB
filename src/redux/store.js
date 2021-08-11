import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunk from "redux-thunk";

import authReducer from "./auth/reducer";
import settingsReducer from "./settings/reducer";
import usersReducer from "./users/reducer";

const composeEnhancers = composeWithDevTools({});

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  settings: settingsReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({}))),
);

export default store;
