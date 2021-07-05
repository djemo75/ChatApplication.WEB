import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunk from "redux-thunk";

import authReducer from "./auth/reducer";
import usersReducer from "./users/reducer";

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({})),
    // other store enhancers if any
  ),
);

export default store;
