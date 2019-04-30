import axios from "axios";

import { NOW_SHOWING_SERVER, FEATURED_SERVER } from "../components/utils/url";
import {
  ADMIN_POST_NOW,
  ADMIN_POST_FEATURED,
  ADMIN_VOTE,
  GET_SHOWS,
  GET_FEATURED
} from "./types";

export function adminUploadNow(data) {
  const request = axios
    .post(`${NOW_SHOWING_SERVER}upload`, data)
    .then(response => response.data);

  return {
    type: ADMIN_POST_NOW,
    payload: request
  };
}

export function adminUploadFeatured(data) {
  const request = axios
    .post(`${FEATURED_SERVER}upload`, data)
    .then(response => response.data);

  return {
    type: ADMIN_POST_FEATURED,
    payload: request
  };
}

export function adminVote() {
  const request = axios
    .get(`${FEATURED_SERVER}vote?sortBy=_id&order=desc&limit=5`)
    .then(response => response.data);

  return {
    type: ADMIN_VOTE,
    payload: request
  };
}

export function getShows() {
  const request = axios
    .get(`${NOW_SHOWING_SERVER}shows?sortBy=_id&order=desc&limit=2`)
    .then(response => response.data);

  return {
    type: GET_SHOWS,
    payload: request
  };
}

export function getFeatured() {
  const request = axios
    .get(`${FEATURED_SERVER}shows?sortBy=_id&order=desc&limit=5`)
    .then(response => response.data);

  return {
    type: GET_FEATURED,
    payload: request
  };
}
