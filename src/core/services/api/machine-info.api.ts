import { AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import Http from "../interceptors/http.interceptor";
import { showToast } from "./../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const machinTypesUrl = MainUrl + "/api/MachineData/GetAllMachineTypes";
const machineManufacturerUrl =
  MainUrl + "/api/MachineData/GetAllMachineManufacturer";
const GetAllInsurancesUrl = MainUrl + "/api/MachineData/GetAllInsurances";
const GetAllMachineUrl = MainUrl + "/api/MachineData/GetAllMachine";
const CreateUserMachineUrl = MainUrl + "/api/MachineData/CreateUserMachine";
const GetAllUserMachinesUrl = MainUrl + "/api/MachineData/GetAllUserMachines";
const DeleteUserMachineUrl =
  MainUrl + "/api/MachineData/DeleteUserMachineByMachineId?machineId=";
const EditUserMachineByMachineIdUrl =
  MainUrl + "/api/MachineData/EditUserMachineByMachineId";
const GerUserMachineByMachineIdUrl =
  MainUrl + "/api/MachineData/GetUserMachineByMachineId?machinId=";

const EditUserMachineFilesByIdUrl =
  MainUrl + "/api/MachineData/EditUserMachineFilesById";

const GetAllMachineByTypes =
  MainUrl + "/api/MachineData/GetAllMachineByTypes";

const GetAllMachineTypes = async (): Promise<AxiosResponse<IAxiosResult>> => {
  // get
  return await Http.get(machinTypesUrl);
};

const GetAllUserMachinesByLicenseRequestId = async ( id : any ): Promise<AxiosResponse<IAxiosResult>> => {
  // get
  return await Http.get(`${MainUrl}/api/MachineData/GetAllUserMachinesByLicenseRequestId?licenseRequestId=${id}`);
};

const GetAllMachineManufacturer = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  //get
  return await Http.get(machineManufacturerUrl);
};
const GetAllInsurances = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(GetAllInsurancesUrl); //get
};
const GetAllMachine = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(GetAllMachineUrl); //get
};

const CreateUserMachine = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(CreateUserMachineUrl, value); // create
};

const getGetAllMachineByTypes = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(GetAllMachineByTypes, value); // create
};

const EditUserMachineFilesById = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.put(EditUserMachineFilesByIdUrl, value); // create
};

const DeleteUserMachine = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.delete(DeleteUserMachineUrl + id, {
    headers: {
      "Content-Type": "application/json; charset=utf-8 ",
    },
  }); // create
};

const GetAllUserMachines = async (): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await Http.get(GetAllUserMachinesUrl); // get
  return data.data.result;
};

const GerUserMachineByMachineId = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await Http.get(GerUserMachineByMachineIdUrl + id, {
    headers: {
      "Content-Type": "application/json; charset=utf-8 ",
    },
  }); // get
  return data;
};

const EditUserMachineByMachineId = async (data: {
  value: any;
  id: any;
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.put(
    EditUserMachineByMachineIdUrl + `?machineId=${data.id}`,
    data.value
  ); // update
};

export const useGetAllMachineTypes = () => {
  return useQuery("[AllMachineTypes]", GetAllMachineTypes, {});
};

export const useGetAllUserMachinesByLicenseRequestId = (id: number) => {
  return useQuery(
    "GetAllUserMachinesByLicenseRequestId",
    () => GetAllUserMachinesByLicenseRequestId(id),
    {}
  );
};

export const useGetAllMachineManufacturer = () => {
  return useQuery("[AllMachineManufacturer]", GetAllMachineManufacturer, {});
};

export const useGetAllInsurances = () => {
  return useQuery("[AllInsurances]", GetAllInsurances, {});
};
export const useGetAllMachine = () => {
  return useQuery("[AllMachine]", GetAllMachine, {});
};


export const useGetAllUserMachines = () => {
  return useQuery("[AllUserMachine]", GetAllUserMachines, {
    staleTime: 0,
    cacheTime: 0,
  });
};

export const useGerUserMachineByMachineId = (id: any) => {
  return useQuery(
    ["UserMachineByMachineId", id],
    () => GerUserMachineByMachineId(id),
    {}
  );
};

export const useDeleteUserMachine = () => {
  return useMutation(DeleteUserMachine);
};

export const useGetAllMachineByTypes = () => {
  return useMutation(getGetAllMachineByTypes);
};

export const useCreateUserMachine = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateUserMachine, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AllUserMachine]");
    },
  });
};

export const useEditUserMachineByMachineId = () => {
  return useMutation(EditUserMachineByMachineId, {
    onSuccess: (value) => {
      showToast(["ویرایش با موفقیت انجام شد"], "success");
    },
  });
};

export const useEditUserMachineFilesById = () => {
  return useMutation(EditUserMachineFilesById, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
    },
  });
};
