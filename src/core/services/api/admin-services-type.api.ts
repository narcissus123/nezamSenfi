import methods from "../interceptors/http.interceptor";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { showToast } from "./../../utils";
import { ICreateServicesType, IUpdateServicesType } from "./../../models";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetAllAgriculturalToolsTypesUrl =
  MainUrl + "/api/AgriculturalToolsData/GetAllAgriculturalToolsTypes";
const GetAllServicesTypeUrl =
  MainUrl +
  "/api/AgriculturalToolsData/GetAllAgriculturalToolsAndServiceTypesByFilter";
const CreateServicesTypeUrl =
  MainUrl + "/api/AgriculturalToolsData/CreateAgriculturalToolType";
const EditSevicesTypeUrl =
  MainUrl + "/api/AgriculturalToolsData/EditAgriculturalToolType";
const DeleteServicesTypeByIdUrl =
  MainUrl +
  "/api/AgriculturalToolsData/DeleteAgriculturalToolTypeById?agriculturalToolTypeId=";

// ---------------------------- Api(get) --------------------------------------

export const GetAllServicesType = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.post(GetAllServicesTypeUrl, value);
  return data.data.result;
};

export const GetServicesTypesForAdmin = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(GetAllAgriculturalToolsTypesUrl, value);
  return data.data.result;
};

// ---------------------------- Api(create) --------------------------------------

const CreateServicesType = async (
  value: ICreateServicesType
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(CreateServicesTypeUrl, value);
};

// ---------------------------- Api(update) --------------------------------------

const EditSevicesType = async (
  value: IUpdateServicesType
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(EditSevicesTypeUrl, value);
};

// ---------------------------- Api(delete) --------------------------------------

const DeleteServicesTypeById = async (id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(DeleteServicesTypeByIdUrl + id);
};

// ---------------------------- Queries(create) --------------------------------------
export const useCreateServicesType = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateServicesType, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AdminAllServicesTypes]");
    },
  });
};

// ---------------------------- Queries(update) --------------------------------------
export const useEditSevicesType = () => {
  const queryClient = useQueryClient();
  return useMutation(EditSevicesType, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AdminAllServicesTypes]");
    },
  });
};

// ---------------------------- Queries(delete) --------------------------------------
export const useDeleteServicesTypeById = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteServicesTypeById, {
    onSuccess: (value: any) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AdminAllServicesTypes]");
    },
  });
};

// ---------------------------- Queries(get) --------------------------------------

export const useGetAllAdminServices = () => {
  return useMutation(GetAllServicesType);
};

export const useGetServicesTypesForAdmin = () => {
  return useQuery("[GetAllServicesTypesForAdmin]", GetServicesTypesForAdmin);
};
