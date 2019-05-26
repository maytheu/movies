import axios from "axios";

import { ADMIN_SERVER } from "../components/utils/url";
import {
  ADMIN_LOGIN,
  ADMIN_AUTH,
  ADMIN_LOGOUT,
  ADMIN_RESET,
  ADMIN_ABOUT,
  ADMIN_EDIT,
  CONTACT
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

export function aboutAdmin(data) {
  const request = axios
    .post(`${ADMIN_SERVER}about`, data)
    .then(response => response.data);

  return {
    type: ADMIN_ABOUT,
    payload: request
  };
}

export function editAboutAdmin(data) {
  const request = axios
    .post(`${ADMIN_SERVER}edit_about`, data)
    .then(response => response.data);

  return {
    type: ADMIN_EDIT,
    payload: request
  };
}
 
export function contact() {
  const request = axios.get(`${ADMIN_SERVER}contact`)
  .then(response => response.data[0]);

  return {
    type: CONTACT,
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
