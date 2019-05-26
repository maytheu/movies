import {
  ADMIN_LOGIN,
  ADMIN_AUTH,
  ADMIN_LOGOUT,
  ADMIN_RESET,
  CONTACT,
  ADMIN_ABOUT, ADMIN_EDIT
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      return { ...state, loginSucces: action.payload };
    case ADMIN_AUTH:
      return { ...state, adminData: action.payload };
    case ADMIN_LOGOUT:
      return { ...state };
    case ADMIN_ABOUT:
      return { ...state };
    case ADMIN_EDIT:
      return { ...state };
	  case CONTACT:
      return { ...state, contact: action.payload };
    case ADMIN_RESET:
      return { ...state };
    default:
      return state;
  }
}
