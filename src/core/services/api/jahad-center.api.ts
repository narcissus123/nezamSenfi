import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;


const AddJahadCenter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/JahadCenter/AddJahadCenter`,
    data
  );
};
const UpdateJahadCenter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/JahadCenter/UpdateJahadCenter`,
    data
  );
};


const GetAllCountyJahadCenterByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/JahadCenter/GetAllCountyJahadCenterByFilter`,
    data
  );
};

const SetUserJahadCenter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/JahadCenter/SetUserJahadCenter`,
    data
  );
};

const GetUserJahadCenterByJahadCenterId = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/JahadCenter/GetUserJahadCenterByJahadCenterId`,
    data
  );
};

const DeleteJahadCenter = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/JahadCenter/DeleteJahadCenter?jahadCenterId=${id}`
  );
};

const GetJahadCenterById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/JahadCenter/GetJahadCenterById?jahadCenterId=${id}`
  );
};

const GetAllCountyJahadCenterForDropdown = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/JahadCenter/GetAllCountyJahadCenterForDropdown?countyId=${id}`
  );
};

const GetUserRolsInJahadCenter = async (obj: {
  userId: number;
  jahadCenterId: number;
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/JahadCenter/GetUserRolsInJahadCenter?userId=${obj.userId}&jahadCenterId=${obj.jahadCenterId}`
  );
};





export const useAddJahadCenter = () => {
  return useMutation(AddJahadCenter, {});
};
export const useUpdateJahadCenter = () => {
  return useMutation(UpdateJahadCenter, {});
};
export const useGetAllCountyJahadCenterByFilter = () => {
  return useMutation(GetAllCountyJahadCenterByFilter, {});
};
export const useDeleteJahadCenter = () => {
  return useMutation(DeleteJahadCenter, {});
};
export const useGetUserRolsInJahadCenter = () => {
  return useMutation(GetUserRolsInJahadCenter, {});
};
export const useSetUserJahadCenter = () => {
  return useMutation(SetUserJahadCenter, {});
};
export const useGetUserJahadCenterByJahadCenterId = () => {
  return useMutation(GetUserJahadCenterByJahadCenterId, {});
};
export const useGetAllCountyJahadCenterForDropdown = () => {
  return useMutation(GetAllCountyJahadCenterForDropdown, {});
};
export const useGetJahadCenterById = (id: number) => {
  return useQuery(
    "UserRealIdentityInfoById",
    () => GetJahadCenterById(id),
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );
};