import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";

import { useHistory } from "react-router-dom";
import { showToast } from "./../../utils";
import { ILegalUser } from "./../../models";
import { removeItem } from "../common/storage/storage.service";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/Account/RegisterUserLegal";

const LegalRegisterApi = async (
  value: ILegalUser
): Promise<AxiosResponse<IAxiosResult>> => {
  delete value.confirmPassword;
  return await methods.post(url, value);
};

export const UseLegalRegister = () => {
  const history = useHistory();

  return useMutation(LegalRegisterApi, {
    onSuccess: (value) => {
      removeItem("securityStamp");
      removeItem("nationalIdRegister");
      removeItem("nationalCodeRegister");
      showToast(value.data.message, "success");
      history.push("/Register/SuccessRegister");
    },
  });
};
