import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { IAxiosResult } from "../../models/axios-result.model";
import { AxiosResponse } from "axios";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetSepBankToken = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Bank/GetSepBankToken?amount=${value}`
  );
};

const PostSepPayment = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post("https://sep.shaparak.ir/payment.aspx", value, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useGetSepBankToken = () => {
  return useMutation(GetSepBankToken);
};
export const usePostSepPayment = () => {
  return useMutation(PostSepPayment);
};
