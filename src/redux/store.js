import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./reducers/authReducers";
import { messageReducers } from "./reducers/messageReducers";
import { crudReducers } from "./reducers/crudReducers";

const reducer = combineReducers({
  auth: authReducer,
  message: messageReducers,
  data: crudReducers,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
