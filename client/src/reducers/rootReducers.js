import { combineReducers } from "redux";

import adminReducers from "./adminReducers";
import movieReducers from "./movieReducers";
import userReducers from "./userReducers";

const rootReducer = combineReducers({
  admin: adminReducers,
  movie: movieReducers,
  user: userReducers
});

export default rootReducer;
