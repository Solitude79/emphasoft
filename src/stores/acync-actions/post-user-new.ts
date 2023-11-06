import { axiosInstance } from "../../functions/axios-instance";
import { IUser } from "../users/interfaces";

export const postUserNew = async (params: IUser) => {
  return axiosInstance
    .post("/api/v1/users/", { ...params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
