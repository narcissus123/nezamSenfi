import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useHistory } from "react-router-dom";

import { useRegisterContext } from "../../../components/Authentication/RegisterContainer/RegisterContainer";
import { IVerificationCode } from "./../../models";
import { showToast } from "./../../utils";
import { setItem } from "../common/storage/storage.service";
import { useStatusPermission } from "../../utils/context/StatusProvider";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/Account/ConfirmUserPhone";

const verificationCodeApi = async (
  value: IVerificationCode
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(url, value);
};

export const UseVerificationCode = () => {
  const location = useHistory();
  const { setStatusInfo } = useStatusPermission();
  const { userInfoRegister, setSecurityStamp } = useRegisterContext();

  return useMutation(verificationCodeApi, {
    onSuccess: (value) => {
      setSecurityStamp(value.data.result);
      setItem("securityStamp", value.data.result);
      showToast(value.data.message, "success");

      if (userInfoRegister.userType === 1) {
        setStatusInfo((prev) => {
          return {
            ...prev,
            registerFlow: "realUserRegister",
          };
        });
        location.push("/Register/RegisterUserReal");
      } else {
        setStatusInfo((prev) => {
          return {
            ...prev,
            registerFlow: "legalUserRegister",
          };
        });
        location.push("/Register/RegisterUserLegal");
      }
    },
  });
};
