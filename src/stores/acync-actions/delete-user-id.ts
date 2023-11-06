import { axiosInstance } from "../../functions/axios-instance";
import { IUser } from "../users/interfaces";

export const deleteUserId = async (params: IUser) => {
  return axiosInstance
    .delete(`/api/v1/users/${params.id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
