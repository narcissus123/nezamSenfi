import { showToast } from "./../../utils";
import { useMutation, useQuery } from "react-query";
import { ISetRealContactInfo } from "./../../models";
import Http from "../interceptors/http.interceptor";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const Url = process.env.REACT_APP_PUBLIC_PATH;

const UpdateUserContactsInfo = async (
  value: ISetRealContactInfo
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(
    Url + "/api/Profile/SetUserContactsInformation",
    value
  );
};

const UserRealContactInfo = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(Url + "​/api/Profile/GetUserRealContactInformation");
};

const UserLegalContactInfo = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(Url + "​/api/Profile/GetUserLegalContactInformation");
};

const UserRealContactInfoById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(
    Url + `/api/Profile/GetUserRealContactInformationById?id=` + id,
    {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    }
  );
};

const UserLegalContactInfoById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(
    Url + `/api/Profile/GetUserLegalContactInformationById?id=` + id,
    {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    }
  );
};

export const useUserLegalContactById = (id: number) => {
  return useQuery(
    "UserLegalContactInfoById",
    () => UserLegalContactInfoById(id),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

export const useUserRealContactById = (id: number) => {
  return useQuery(
    "UserRealContactInfoById",
    () => UserRealContactInfoById(id),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

export const useUserLegalContact = () => {
  return useQuery("UserLegalContactInfo", UserLegalContactInfo, {
    onSuccess: (value) => {},
    onError: (er) => {},
    refetchOnWindowFocus: false,
    //retry: false,
  });
};

export const useUserRealContact = () => {
  return useQuery("UserRealContactInfo", UserRealContactInfo, {
    onSuccess: (value) => {},
    onError: (er) => {},
    refetchOnWindowFocus: false,
    //retry: false,
  });
};

export const useUpdateUserContact = () => {
  return useMutation(
    (obj: ISetRealContactInfo) => UpdateUserContactsInfo(obj),
    {
      onSuccess: (value) => {
        value.data
          ? showToast(["با موفقیت ذخیره شد"], "success")
          : showToast(["مشکلی رخ داده است"], "error");
      },
    }
  );
};
