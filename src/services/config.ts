import axios from "axios";
import * as Securestore from "expo-secure-store";

export const baseUrl = "http://172.20.10.4:1337";

const timeout = 3000;
export const token_name = "checklist_user_token";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: timeout,
});

export const saveToken = async (key: string, value: string) => {
  try {
    await Securestore.setItemAsync(key, value);
  } catch (error) {
    console.log("Error while saving token", error);
  }
};

axiosInstance.interceptors.request.use(async (req) => {
  try {
    const accessToken = await Securestore.getItemAsync(token_name);
    req.headers.Authorization = accessToken;
    return req;
  } catch (error) {
    return Promise.reject(error); // Reject the request if there's an error
  }
});

export const fetcher = async (url: string) => {
  const res = await axiosInstance.get(url);
  return res.data;
};

export default axiosInstance;
