import { User } from "../../types/User";
import { api } from "../api/axios";
interface LoginData {
  email: string;
  password: string;
}
interface RegisterData extends LoginData {
  mobile: number;
  name: string;
}

interface authResponse {
  data: unknown;
  user: User;
  accessToken: string;
  refreshToken: string;
}
export const LoginApi = async (data: LoginData): Promise<authResponse> => {
  const response = await api.post("/api/v1/user/logins", data);
  return response.data.data;
};

export const registerApi = async (
  data: RegisterData
): Promise<authResponse> => {
  const response = await api.post("/api/v1/user/registers", data);
  return response.data.data;
};

export const LogoutApi = async () => {
  const response = await api.post("/api/v1/user/logouts");
  return response.data.data;
};
export const refreshAccessTokenApi = async () => {
  const response = await api.post("/api/v1/user/refresh-tokens");
  return response.data.data;
};
export const getAllUsers = async () => {
  const response = await api.get("/api/v1/user/get-all-users");
  return response.data.data;
};