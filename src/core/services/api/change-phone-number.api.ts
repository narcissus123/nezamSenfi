import { ToastTypes } from "./../../enums";
import { useMutation } from "react-query";
import { showToast } from "../../utils";
import Http from "../interceptors/http.interceptor";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const Url = process.env.REACT_APP_PUBLIC_PATH;

const UserChangeNumber = async (id: string): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(
    Url + `/api/Profile/ChangPhoneNumberRequest?newPhoneNumber=` + id,
    {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    }
  );
};

const ChangePhoneNumberConfirm = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(Url + `/api/Profile/ChangPhoneNumberConfirm`, obj);
};

export const useChangePhoneNumberConfirm = () => {
  return useMutation((obj: any) => ChangePhoneNumberConfirm(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast(
            ["ویرایش تلفن همراه با موفقیت انجام شد"],
            ToastTypes.success
          )
        : showToast(["مشکلی رخ داده است"], ToastTypes.error);
    },
  });
};

export const useUserChangeNumber = () => {
  return useMutation((id: string) => UserChangeNumber(id), {
    onSuccess: (value) => {
      value.data
        ? showToast(["ویرایش کاربر با موفقیت انجام شد"], ToastTypes.success)
        : showToast(["مشکلی رخ داده است"], ToastTypes.error);
    },
  });
};
