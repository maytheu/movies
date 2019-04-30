import {
  ADMIN_POST_NOW,
  ADMIN_POST_FEATURED,
  ADMIN_VOTE,
  GET_SHOWS,
  GET_FEATURED
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case ADMIN_POST_NOW:
      return { ...state };
    case ADMIN_POST_FEATURED:
      return { ...state };
    case ADMIN_VOTE:
      return { ...state, shows: action.payload };
    case GET_SHOWS:
      return { ...state, upcoming: action.payload };
    case GET_FEATURED:
      return { ...state, favourite: action.payload };
    default:
      return state;
  }
}
