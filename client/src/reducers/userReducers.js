import { USER_AUTH, USER_CHECK_VOTE, USER_VOTE } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case USER_AUTH:
      return { ...state, userData: action.payload };
    case USER_CHECK_VOTE:
      return { ...state, checkVote: action.payload };
    case USER_VOTE:
      return { ...state };
    //ADD_TO_CART_USER
    default:
      return state;
  }
}
