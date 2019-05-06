import axios from "axios";

import { USER_SERVER } from "../components/utils/url";
import {
  USER_AUTH,
  USER_CHECK_VOTE,
  USER_VOTE,
  USER_BUY,
  USER_EMAIL
} from "./types";

export function authUser() {
  const request = axios
    .get(`${USER_SERVER}auth`)
    .then(response => response.data);

  return {
    type: USER_AUTH,
    payload: request
  };
}

export function checkUserVote() {
  const request = axios
    .get(`${USER_SERVER}vote_action`)
    .then(response => response.data);

  return {
    type: USER_CHECK_VOTE,
    payload: request
  };
}

export function vote(show, user) {
  const data = { show: show, user: user };
  let request = axios
    .post(`${USER_SERVER}vote_user`, data)
    .then(response => response.data);

  return {
    type: USER_VOTE,
    payload: request
  };
}

export function userBuy(data) {
  const request = axios
    .post(`${USER_SERVER}/buy`, data)
    .then(response => response.data);

  return {
    type: USER_BUY,
    payload: request
  };
}

export function userEmail(data) {
  const request = axios
    .post(`${USER_SERVER}/set_email`, data)
    .then(response => response.data);

  return {
    type: USER_EMAIL,
    payload: request
  };
}
