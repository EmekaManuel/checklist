import { IUser } from "@/types";
import axiosInstance, { saveToken, token_name } from "./config";
import { AxiosError } from "axios";

type RegisterUserTypes = IUser;
type LoginUserTypes = Omit<IUser, "name">;

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
export const registerUser = async ({
  email,
  name,
  password,
}: RegisterUserTypes) => {
  try {
    const res = await axiosInstance.post("/user/create", {
      email,
      name,
      password,
    });
    return res.data.user;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("Axios Error in registering user:", error);
      if (error.request) {
        console.error("Request details:", error.request);
      }
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    } else {
      console.error("Non-Axios Error in registering user:", error);
    }
    throw error;
  }
};

export const loginUser = async ({ email, password }: LoginUserTypes) => {
  try {
    const res = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    const token = res.data.token;
    axiosInstance.defaults.headers.common["Authorization"] = token;
    saveToken(token_name, token);
    return res.data.user;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("Axios Error in loggin In user:", error);
      if (error.request) {
        console.error("Request details:", error.request);
      }
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    } else {
      console.error("Non-Axios Error in logging in user:", error);
    }
    throw error;
  }
};
