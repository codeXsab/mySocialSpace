import axios from "axios";
const BASE_URL = "http://localhost:8800/api/";
export const makeRequests = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
