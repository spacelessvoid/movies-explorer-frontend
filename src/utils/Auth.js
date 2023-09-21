import {
  REGISTER_ENDPOINT,
  LOGIN_ENDPOINT,
  USER_ENDPOINT,
} from "./api-endpoints";
import { headers, sendRequest } from "./constants";

function registerUser(name, email, password) {
  return sendRequest(REGISTER_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, email, password }),
  });
}

function authenticateUser(email, password) {
  return sendRequest(LOGIN_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
}

function checkToken(token) {
  return sendRequest(USER_ENDPOINT, {
    method: "GET",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });
}

export { registerUser, authenticateUser, checkToken };
