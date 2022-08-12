import axios, { AxiosRequestConfig } from "axios";
import AuthService from "./AuthService";


export const API_URL = 'https://azapp-playground-demo-api.azurewebsites.net/api';

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})

$api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  }, 
  async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      AuthService.refreshToken(token, refreshToken)
      .then((resp) => {
        localStorage.setItem("token", resp.data.token );
        localStorage.setItem("refreshToken", resp.data.refreshToken);
        return $api.request(originalRequest);
      })
    } catch {
      console.log("Not authorized");
    }
  } 
  throw error;
})

export default $api;