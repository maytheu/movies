import {
  USER_AUTH,
  USER_CHECK_VOTE,
  USER_VOTE,
  USER_BUY,
  USER_EMAIL
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case USER_AUTH:
      return { ...state, userData: action.payload };
    case USER_CHECK_VOTE:
      return { ...state, checkVote: action.payload };
    case USER_VOTE:
      return { ...state };
    case USER_BUY:
      return { ...state, buy: action.payload };
    case USER_EMAIL:
      return { ...state };
    default:
      return state;
  }
}
