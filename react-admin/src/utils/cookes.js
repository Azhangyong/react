import cookies from "react-cookies";
const tokenAdmin = "adminToken";
const username = "username";
export function setToken(value) {
  cookies.save(tokenAdmin, value);
}
export function getToken() {
  return cookies.load(tokenAdmin);
}

export function setUsername(value) {
  cookies.save(username, value);
}

export function getUsername() {
  return cookies.load(username);
}
