import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import { getAccessToken } from "../utils/storageHandlers";

const API_URL = import.meta.env.VITE_API_URL || "";
const API_PREFIX = "/api/v1";

const baseURL = `${API_URL}${API_PREFIX}`;

export const publicRequest = axios.create({
  baseURL,
});

export const privateRequest = axios.create({
  baseURL,
});

publicRequest.interceptors.response.use((response) => response, errorHandler);

privateRequest.interceptors.response.use((response) => response, errorHandler);

privateRequest.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
