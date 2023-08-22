
import { useMutation, useQuery } from "react-query";
import methods from "../interceptors/http.interceptor";
import { IAxiosResult } from "../../models/axios-result.model";
import { AxiosResponse } from "axios";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;


const DeleteSeedlingPreparationCenter = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProductInformation/DeleteSeedlingPreparationCenter?enginePowerId=${id}`
  );
};


const CreateSeedlingPreparationCenter = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/ProductInformation/CreateSeedlingPreparationCenter`,
    obj
  );
};

const EditSeedlingPreparationCenter = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProductInformation/EditSeedlingPreparationCenter`,
    obj
  );
};

const GetSeedlingPreparationCenterByFilter = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProductInformation/GetSeedlingPreparationCenterByFilter`,
    obj
  );
};

const GetAllSeedlingPreparationCenter = async (
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProductInformation/GetAllSeedlingPreparationCenter`
  );
};










export const useDeleteSeedlingPreparationCenter = () => {
  return useMutation(DeleteSeedlingPreparationCenter, {});
};
export const useCreateSeedlingPreparationCenter = () => {
  return useMutation(CreateSeedlingPreparationCenter, {});
};
export const useEditSeedlingPreparationCenter = () => {
  return useMutation(EditSeedlingPreparationCenter, {});
};
export const useGetSeedlingPreparationCenterByFilter = () => {
  return useMutation(GetSeedlingPreparationCenterByFilter, {});
};
export const useGetAllSeedlingPreparationCenter = () => {
  return useQuery("GetAllSeedlingPreparationCenter", () =>
    GetAllSeedlingPreparationCenter()
  );
};