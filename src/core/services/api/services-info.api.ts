import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { IServices } from "./../../models";
import { useQueryClient } from "react-query";
import { showToast } from "./../../utils";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetAllUserAgriculturalToolsAndServiceUrl =
  MainUrl + "/api/AgriculturalToolsData/GetAllUserAgriculturalToolsAndService";
const GetAllAgriculturalToolsTypesUrl =
  MainUrl + "/api/AgriculturalToolsData/GetAllAgriculturalToolsTypes";
const GetAllAgriculturalToolsAndServiceUrl =
  MainUrl + "/api/AgriculturalToolsData/GetAllAgriculturalToolsAndService";
const GetAllAgriculturalToolsAndServiceByTypeIDUrl =
  MainUrl +
  "/api/AgriculturalToolsData/GetAllUnUsedAgriculturalToolsAndServiceByTypeId?typeId=";
const CreateUserAgriculturalToolsAndServiceUrl =
  MainUrl + "/api/AgriculturalToolsData/CreateUserAgriculturalToolsAndService";
const DeleteUserAgriculturalToolsAndServiceByIdUrl =
  MainUrl +
  "/api/AgriculturalToolsData/DeleteUserAgriculturalToolsAndServiceById?userAgriculturalToolsAndServiceId=";

// ---------------------------- Api(get) --------------------------------------
const GetAllAgriculturalToolsTypes = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  const data = await methods.get(GetAllAgriculturalToolsTypesUrl);
  return data.data.result;
};
const GetAllAgriculturalToolsAndService = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  const data = await methods.get(GetAllAgriculturalToolsAndServiceUrl);
  return data.data.result;
};

const GetAllAgriculturalToolsAndServiceByTypeID = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(
    GetAllAgriculturalToolsAndServiceByTypeIDUrl + id
  );
  return data.data.result;
};

const GetAllUserAgriculturalToolsAndService = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  const data = await methods.get(GetAllUserAgriculturalToolsAndServiceUrl);
  return data.data.result;
};
// ---------------------------- Api(create) --------------------------------------

const CreateUserAgriculturalToolsAndService = async (
  value: IServices
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(CreateUserAgriculturalToolsAndServiceUrl, value);
};

// ---------------------------- Api(delete) --------------------------------------

const DeleteUserServiceById = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    DeleteUserAgriculturalToolsAndServiceByIdUrl + id,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8 ",
      },
    }
  );
};

// ---------------------------- Queries(get) --------------------------------------

export const useAllAgriculturalToolsTypes = () => {
  return useQuery(["AllAgriculturalToolsTypes"], GetAllAgriculturalToolsTypes, {
    cacheTime: 0,
    staleTime: 0,
  });
};

export const useGetAllAgriculturalToolsAndService = () => {
  return useQuery(
    ["AllAgriculturalToolsAndService"],
    GetAllAgriculturalToolsAndService
  );
};

export const useGetAllAgriculturalToolsAndServiceByTypeID = () => {
  return useMutation(GetAllAgriculturalToolsAndServiceByTypeID);
};

export const useGetAllUserAgriculturalToolsAndService = () => {
  return useQuery(
    ["AllUserAgriculturalToolsAndService"],
    GetAllUserAgriculturalToolsAndService
  );
};
// ---------------------------- Queries(create) --------------------------------------
export const useCreateUserAgriculturalToolsAndService = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateUserAgriculturalToolsAndService, {
    onSuccess: (value) => {
      showToast(["ثبت خدمات موفق امیز"], "success");
      queryClient.resetQueries(["AllUserAgriculturalToolsAndService"]);
    },
  });
};

// ---------------------------- Queries(delete) --------------------------------------
export const useDeleteUserServiceById = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteUserServiceById, {
    onSuccess: () => {
      queryClient.resetQueries(["AllUserAgriculturalToolsAndService"]);
    },
  });
};
