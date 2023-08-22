import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;


const NewTreeCategory = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/BaseTreeCategory/New`,
    data
  );
};

const GetAllTreeCategory = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/BaseTreeCategory/GetAll`);
};

const EditTreeCategory = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/BaseTreeCategory/Edit`,
    data
  );
};

const GetTreeCategoryList = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/BaseTreeCategory/GetItems`, data);
};

const DeleteCategoryTree = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    `${MainUrl}/api/BaseTreeCategory/Delete?id=${id}`
  );
};

export const useNewTreeCategory = () => {
  return useMutation(NewTreeCategory, {});
};
export const useGetTreeCategoryList = () => {
  return useMutation(GetTreeCategoryList, {});
};
export const useDeleteCategoryTree = () => {
  return useMutation(DeleteCategoryTree, {});
};
export const useEditTreeCategory = () => {
  return useMutation(EditTreeCategory, {});
};
export const useGetAllTreeCategory = () => {
  return useQuery("GetAllTreeCategory", GetAllTreeCategory);
};