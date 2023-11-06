import { axiosInstance } from "../../functions/axios-instance";
import { IUser } from "../users/interfaces";

export const putUserEdit = async (params: IUser) => {
  return axiosInstance
    .put(`/api/v1/users/${params.id}`, { ...params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
