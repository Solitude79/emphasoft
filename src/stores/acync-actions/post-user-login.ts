import { axiosInstance } from "../../functions/axios-instance";

export interface ILoginUser {
  username: string;
  password: string;
}

export const postUserLogin = async (params: ILoginUser) => {
  return axiosInstance
    .post("/api/v1/login/", { ...params })
    .then((res) => {
      return res.data?.token;
    })
    .catch((error) => {
      throw error;
    });
};
