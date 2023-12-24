import axios from "axios";
import { rememberToken, getValidToken } from "./token";


const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:7000":"https://resource-booking-system.onrender.com";
console.log('baseURL:',baseURL,'env',process.env)
// Create an axios instance
const api = axios.create({
  baseURL,
});

export function setToken(token) {
  // saves token to local storage
  rememberToken(token);
  if (token) {
    // Setting the Authorisation header for all future GET requests
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Validates token, and removes it if it's invalid
setToken(getValidToken());

export default api;
