import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const postGetAllMyTicketFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Message/GetAllMyTicketFilter`,
    data
  );
};

const getMyUnreadTicket = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}​/api/Message/GetMyUnreadTicket`);
};

const getMyTicketById = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Message/GetMyTicketById?ticketId=${id}`
  );
};

export const usePostGetAllMyTicketFilter = () => {
  return useMutation(postGetAllMyTicketFilter, {});
};

export const useGetMyTicketById = () => {
  return useMutation(getMyTicketById, {});
};

export const useGetMyUnreadTicket = () => {
  return useQuery("useGetMyUnreadTicket", getMyUnreadTicket , { enabled : false});
};
