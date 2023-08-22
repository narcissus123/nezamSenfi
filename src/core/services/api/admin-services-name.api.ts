import methods from "../interceptors/http.interceptor";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { showToast } from "./../../utils";
import { IUpdateServicesName, ICreateServicesName } from "./../../models";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetAllServicesByFilterUrl =
  MainUrl +
  "​/api/AgriculturalToolsData/GetAllAgriculturalToolsAndServiceByFilter";

const GetAllServicesNameUrl =
  MainUrl + "/api/AgriculturalToolsData/GetAllAgriculturalToolsAndService";
const GetAllServicesNameWithTypeUrl =
  MainUrl +
  "/api/AgriculturalToolsData/GetAllAgriculturalToolsAndServiceByTypeID?agriculturalToolsAndServiceType=";
const CreateServicesNameUrl =
  MainUrl + "/api/AgriculturalToolsData/CreateAgriculturalToolAndService";
const EditSevicesNameUrl =
  MainUrl + "/api/AgriculturalToolsData/EditAgriculturalToolAndService";
const DeleteServicesNameByIdUrl =
  MainUrl +
  "/api/AgriculturalToolsData/DeleteAgriculturalToolsAndServiceById?agriculturalToolsAndServiceId=";

// ---------------------------- Api(get) --------------------------------------

export const GetAllServicesNameWithType = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(GetAllServicesNameWithTypeUrl + id);
  return data.data.result;
};

export const GetAllServicesName = async (): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(GetAllServicesNameUrl);
  return data.data.result;
};

export const GetAllServicesByFilter = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.post(GetAllServicesByFilterUrl, value);
  return data.data.result;
};

// ---------------------------- Api(create) --------------------------------------

const CreateServicesName = async (
  value: ICreateServicesName
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(CreateServicesNameUrl, value);
};

// ---------------------------- Api(update) --------------------------------------

const EditSevicesName = async (
  value: IUpdateServicesName
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(EditSevicesNameUrl, value);
};

// ---------------------------- Api(delete) --------------------------------------

const DeleteServicesNameById = async (id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(DeleteServicesNameByIdUrl + id);
};

// ---------------------------- Queries(create) --------------------------------------
export const useCreateServicesName = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateServicesName, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AdminAllServicesNames]");
    },
  });
};

// ---------------------------- Queries(update) --------------------------------------
export const useEditSevicesName = () => {
  const queryClient = useQueryClient();
  return useMutation(EditSevicesName, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AdminAllServicesNames]");
    },
  });
};

// ---------------------------- Queries(delete) --------------------------------------
export const useDeleteServicesNameById = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteServicesNameById, {
    onSuccess: (value: any) => {
      showToast(value.data.message, "success");
    },
  });
};

// ---------------------------- Queries(get) --------------------------------------

export const useGetAllServicesName = () => {
  return useQuery("[AdminAllServicesNames]", GetAllServicesName);
};

export const useGetAllServicesNameWithType = () => {
  return useMutation(GetAllServicesNameWithType);
};


export const useGetAllServicesByFilter = () => {
  return useMutation(GetAllServicesByFilter);
};
