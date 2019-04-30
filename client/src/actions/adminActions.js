import axios from "axios";

import { ADMIN_SERVER } from "../components/utils/url";
import {
  ADMIN_LOGIN,
  ADMIN_AUTH,
  ADMIN_LOGOUT,
  ADMIN_RESET,
} from "./types";

export function loginAdmin(data) {
  const request = axios
    .post(`${ADMIN_SERVER}login`, data)
    .then(response => response.data);

  return {
    type: ADMIN_LOGIN,
    payload: request
  };
}

export function authAdmin() {
  const request = axios
    .get(`${ADMIN_SERVER}auth`)
    .then(response => response.data);

  return {
    type: ADMIN_AUTH,
    payload: request
  };
}

export function logoutAdmin() {
  const request = axios
    .get(`${ADMIN_SERVER}logout`)
    .then(response => response.data);

  return {
    type: ADMIN_LOGOUT,
    payload: request
  };
}

export function resetAdmin(data) {
  const request = axios
    .post(`${ADMIN_SERVER}reset_admin`, data)
    .then(response => response.data);

  return {
    type: ADMIN_RESET,
    payload: request
  };
}
