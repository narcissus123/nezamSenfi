import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
const url = MainUrl + "/api/Profile/GetUserLegalJobInformation";
const postUrl = MainUrl + "/api/Profile/SetUserLegalJobInformation";

const getLegalJobInfoData = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(url);
};

const postLegalJobInfoData = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(postUrl, data);
};

export const useLegalJobInfoData = () => {
  return useQuery("useLegalJobInfoData", getLegalJobInfoData, {
    refetchOnWindowFocus: false,
  });
};

export const usePostLegalJobInfoData = () => {
  return useMutation(postLegalJobInfoData, {});
};
