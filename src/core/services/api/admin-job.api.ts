import methods from "../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";
import {
  ICreateInsurance,
  ICreateJob,
  ICreateJobCategory,
  IUpdateInsurance,
} from "./../../models";
import { showToast } from "./../../utils";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetJobByIdUrl = MainUrl + "/api/MachineData/GetAllInsurancesByFilter/";
const GetAllJobFilterUrl =
  MainUrl + "/api/MachineData/GetAllInsurancesByFilter";
const CreateJobUrl = MainUrl + "​/api/MachineData/CreateInsurance";
const EditJobUrl = MainUrl + "/api/MachineData/EditInsurance";
const DeleteJobByIdUrl =
  MainUrl + "/api/MachineData/DeleteInsuranceById?insuranceId=";

// ---------------------------- Api(get) --------------------------------------
export const GetJobById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(GetJobByIdUrl + id);
  return data.data.result;
};
export const GetAllJobSection = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  const data = await methods.get(MainUrl + "/api/Job/GetAllJobSection");
  return data.data.result;
};
export const GetAllJobSubSectionByJobSectionId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(
    MainUrl + "/api/Job/GetAllJobSubSectionByJobSectionId?jobSectionId=" + id
  );
  return data.data.result;
};
export const GetAllJobCategoryByJobSubSectionId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(
    MainUrl +
      "/api/Job/GetAllJobCategoryByJobSubSectionId?jobSubSectionId=" +
      id
  );
  return data.data.result;
};
export const GetAllJobClassByJobCategoryId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(
    MainUrl + "/api/Job/GetAllJobClassByJobCategoryId?jobCategoryId=" + id
  );
  return data.data.result;
};

export const GetAllJobSubClassByJobClassId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(
    MainUrl + "/api/Job/GetAllJobSubClassByJobClassId?jobClassId=" + id
  );
  return data.data.result;
};
export const DeleteJobCategory = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    MainUrl + "/api/Job/DeleteJobCategory?jobCategoryId=" + id
  );
};
export const DeleteJobSection = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    MainUrl + "/api/Job/DeleteJobSection?jobSectionId=" + id
  );
};
export const DeleteJobSubSection = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    MainUrl + "/api/Job/DeleteJobSubSection?jobSubSectionId=" + id
  );
};
export const DeleteJobClass = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    MainUrl + "/api/Job/DeleteJobClass?jobClassId=" + id
  );
};
export const DeleteJobSubClass = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    MainUrl + "/api/Job/DeleteJobSubClass?jobSubClassId=" + id
  );
};
export const DeleteJob = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(MainUrl + "/api/Job/DeleteJob?jobId=" + id);
};
// ---------------------------- Api(get with filter) --------------------------------------
export const GetAllJobWithFilter = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.post(GetAllJobFilterUrl, value);
  return data.data.result;
};

// ---------------------------- Api(create) --------------------------------------

const CreateJobCategory = async (
  value: ICreateJobCategory
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/CreateJobCategory", value);
};

const CreateJob = async (
  value: ICreateJob
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/CreateJob", value);
};

const CreateJobSubSection = async (
  value: ICreateJobCategory
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/CreateJobSubSection", value);
};
const CreateJobClass = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/CreateJobClass", value);
};
const CreateJobSubClass = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/CreateJobSubClass", value);
};
const GetJobCategoryByFilter = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/GetJobCategoryByFilter", value);
};
const GetJobSubSectionByFilter = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl + "/api/Job/GetJobSubSectionByFilter",
    value
  );
};
const GetJobClassByFilter = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/GetJobClassByFilter", value);
};
const GetJobSubClassByFilter = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/GetJobSubClassByFilter", value);
};
const GetJobByFilter = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/GetJobByFilter", value);
};
const EditJobCategory = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/EditJobCategory", value);
};
const EditJobSubSection = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/EditJobSubSection", value);
};
const EditJobSection = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/EditJobSection", value);
};
const EditJobClass = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/EditJobClass", value);
};
const EditJobSubClass = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/EditJobSubClass", value);
};
const EditJob = async (value: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Job/EditJob", value);
};

// ---------------------------- Api(delete) --------------------------------------

const DeleteJobById = async (id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(DeleteJobByIdUrl + id);
};

// ---------------------------- Queries(create) --------------------------------------
export const useCreateJobCategory = () => {
  return useMutation(CreateJobCategory);
};
export const useCreateJob = () => {
  return useMutation(CreateJob);
};
export const useCreateJobSubSection = () => {
  return useMutation(CreateJobSubSection);
};
export const useCreateJobClass = () => {
  return useMutation(CreateJobClass);
};
export const useCreateJobSubClass = () => {
  return useMutation(CreateJobSubClass);
};

// ---------------------------- Queries(delete) --------------------------------------
export const useDeleteJobById = () => {
  return useMutation(DeleteJobById, {
    onSuccess: (value: any) => {
      showToast(value.data.message, "success");
    },
  });
};

// ---------------------------- Queries(get jobs with filter) --------------------------------------
export const useGetAllInsurance = () => {
  return useMutation(GetAllJobWithFilter);
};

// ---------------------------- Queries(get) --------------------------------------
export const useGetJobById = () => {
  return useQuery(["JobById"], () => GetJobById);
};
export const useGetAllJobSection = () => {
  return useQuery("GetAllJobSection", GetAllJobSection);
};
export const useGetAllJobSubSectionByJobSectionId = () => {
  return useMutation(GetAllJobSubSectionByJobSectionId, {});
};
export const useGetAllJobCategoryByJobSubSectionId = () => {
  return useMutation(GetAllJobCategoryByJobSubSectionId, {});
};
export const useGetAllJobClassByJobCategoryId = () => {
  return useMutation(GetAllJobClassByJobCategoryId, {});
};
export const useGetAllJobSubClassByJobClassId = () => {
  return useMutation(GetAllJobSubClassByJobClassId, {});
};
export const useDeleteJobCategory = () => {
  return useMutation(DeleteJobCategory);
};
export const useDeleteJobSection = () => {
  return useMutation(DeleteJobSection);
};
export const useDeleteJobSubSection = () => {
  return useMutation(DeleteJobSubSection);
};
export const useDeleteJobClass = () => {
  return useMutation(DeleteJobClass);
};
export const useDeleteJobSubClass = () => {
  return useMutation(DeleteJobSubClass);
};
export const useDeleteJob = () => {
  return useMutation(DeleteJob);
};
export const useGetJobCategoryByFilter = () => {
  return useMutation(GetJobCategoryByFilter, {});
};
export const useGetJobSubSectionByFilter = () => {
  return useMutation(GetJobSubSectionByFilter, {});
};
export const useGetJobClassByFilter = () => {
  return useMutation(GetJobClassByFilter, {});
};
export const useGetJobSubClassByFilter = () => {
  return useMutation(GetJobSubClassByFilter, {});
};
export const useGetJobByFilter = () => {
  return useMutation(GetJobByFilter, {});
};
export const useEditJobCategory = () => {
  return useMutation(EditJobCategory, {});
};
export const useEditJobSubSection = () => {
  return useMutation(EditJobSubSection, {});
};
export const useEditJobSection = () => {
  return useMutation(EditJobSection, {});
};
export const useEditJobClass = () => {
  return useMutation(EditJobClass, {});
};
export const useEditJobSubClass = () => {
  return useMutation(EditJobSubClass, {});
};
export const useEditJob = () => {
  return useMutation(EditJob, {});
};
