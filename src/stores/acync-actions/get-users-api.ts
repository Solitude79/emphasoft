import { axiosInstance } from "../../functions/axios-instance";
import { IUser } from "../users/interfaces";

export const getUsersApi = (): Promise<IUser> => {
  return axiosInstance
    .get("/api/v1/users/")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
