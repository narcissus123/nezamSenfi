import methods from "../interceptors/http.interceptor";
import { useQueryClient, useMutation } from "react-query";
import { ICreateInsurance, IUpdateInsurance } from "./../../models";
import { showToast } from "./../../utils";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetAllInsuranceUrl =
  MainUrl + "/api/MachineData/GetAllInsurancesByFilter";
const CreateInsuranceUrl = MainUrl + "​/api/MachineData/CreateInsurance";
const EditInsuranceUrl = MainUrl + "/api/MachineData/EditInsurance";
const DeleteInsuranceByIdUrl =
  MainUrl + "/api/MachineData/DeleteInsuranceById?insuranceId=";

  
// ---------------------------- Api(get) --------------------------------------

export const GetAllInsurance = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.post(GetAllInsuranceUrl, value);
  return data.data.result;
};

// ---------------------------- Api(create) --------------------------------------

const CreateInsurance = async (
  value: ICreateInsurance
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(CreateInsuranceUrl, value);
};

// ---------------------------- Api(update) --------------------------------------

const EditInsurance = async (
  value: IUpdateInsurance
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(EditInsuranceUrl, value);
};

// ---------------------------- Api(delete) --------------------------------------

const DeleteInsuranceById = async (id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(DeleteInsuranceByIdUrl + id);
};

// ---------------------------- Queries(create) --------------------------------------
export const useCreateInsurance = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateInsurance, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AdminAllInsurance]");
    },
  });
};

// ---------------------------- Queries(update) --------------------------------------
export const useEditInsurance = () => {
  const queryClient = useQueryClient();
  return useMutation(EditInsurance, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AdminAllInsurance]");
    },
  });
};

// ---------------------------- Queries(delete) --------------------------------------
export const useDeleteInsuranceById = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteInsuranceById, {
    onSuccess: (value: any) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AdminAllInsurance]");
    },
  });
};

// ---------------------------- Queries(get) --------------------------------------

export const useGetAllInsurance = () => {
  return useMutation(GetAllInsurance);
};
