import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useHistory } from "react-router-dom";

import { IPotentialUser } from "./../../models";
import { useRegisterContext } from "../../../components/Authentication/RegisterContainer";
import { showToast } from "./../../utils";
import { useStatusPermission } from "../../utils/context/StatusProvider";
import { setItemGeneric } from "../common/storage/storage.service";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
const url = MainUrl + "/api/Account/AddPotentialUser";

async function addPotentialUserApi(
  value: IPotentialUser
): Promise<AxiosResponse<IAxiosResult>> {
  value =
    value.userType === 1
      ? { ...value, nationalId: "" }
      : { ...value, nationalCode: "" };
  return await methods.post(url, value);
}

export const AddPotentialUserQuery = () => {
  const { setStatusInfo } = useStatusPermission();
  const location = useHistory();
  const { userInfoRegister } = useRegisterContext();

  return useMutation(addPotentialUserApi, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");

      setItemGeneric("nationalIdRegister", userInfoRegister.nationalId);
      setItemGeneric("nationalCodeRegister", userInfoRegister.nationalCode);

      setStatusInfo((prev) => {
        return {
          ...prev,
          registerFlow: "verificationCode",
        };
      });

      location.push("/Register/VerificationCode");
    },
  });
};

export const useReSendSms = () => {
  return useMutation(addPotentialUserApi, {
    onSuccess: (value) => {
      showToast(["ارسال کد با موفقیت انجام شد"], "success");
    },
  });
};
