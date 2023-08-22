import { ISetLegalIdentityInfo, ISetRealIdentityInfo } from "./../../models";
import { showToast } from "./../../utils";
import { useMutation, useQuery } from "react-query";
import Http from "../interceptors/http.interceptor";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const Url = process.env.REACT_APP_PUBLIC_PATH;

const UpdateUserRealIdentityInfo = async (
  value: ISetRealIdentityInfo
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(
    Url + "/api/Profile/SetUserRealIdentityInformation",
    value
  );
};

const UpdateUserLegalIdentityInfo = async (
  value: ISetLegalIdentityInfo
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(
    Url + "/api/Profile/SetUserLegalIdentityInformation",
    value
  );
};

const UserRealIdentityInfo = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(Url + "​/api/Profile/GetUserRealIdentityInformation");
};

const UserLegalIdentityInfo = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(Url + "​/api/Profile/GetUserLegalIdentityInformation");
};

const UserRealIdentityInfoById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(
    Url + "/api/Profile/GetUserRealIdentityInformationById?id=" + id,
    {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    }
  );
};

const UserLegalIdentityInfoById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(
    Url + "/api/Profile/GetUserLegalIdentityInformationById?id=" + id,
    {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    }
  );
};
const GetAllAccademies = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(Url + "/api/Profile/GetAllAccademies");
};
export const useGetAllAccademies = () => {
  return useQuery("GetAllAccademies", GetAllAccademies, {
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: 0,
  });
};

export const useUserRealIdentityById = (id: number) => {
  return useQuery(
    "UserRealIdentityInfoById",
    () => UserRealIdentityInfoById(id),
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );
};

export const useUserLagalIdentityById = (id: number) => {
  return useQuery(
    "UserLegalIdentityInfoById",
    () => UserLegalIdentityInfoById(id),
    {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 0,
    }
  );
};

export const useUserLegalIdentity = () => {
  return useQuery("UserLegalIdentityInfo", UserLegalIdentityInfo, {
    onSuccess: (value) => {},
    onError: (er) => {},
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: 0,
  });
};

export const useUserRealIdentity = () => {
  return useQuery("UserRealIdentityInfo", UserRealIdentityInfo, {
    onSuccess: (value) => {},
    onError: (er) => {},
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: 0,
  });
};

export const useUpdateUserRealIdentity = () => {
  return useMutation(
    (obj: ISetRealIdentityInfo) => UpdateUserRealIdentityInfo(obj),
    {
      onSuccess: (value) => {
        value.data
          ? showToast(["با موفقیت ذخیره شد"], "success")
          : showToast(["مشکلی رخ داده است"], "error");
      },
    }
  );
};

export const useUpdateUserLegalIdentity = () => {
  return useMutation(
    (obj: ISetLegalIdentityInfo) => UpdateUserLegalIdentityInfo(obj),
    {
      onSuccess: (value) => {
        typeof value.data === "object"
          ? showToast(["با موفقیت ذخیره شد"], "success")
          : showToast(["مشکلی رخ داده است"], "error");
      },
    }
  );
};
