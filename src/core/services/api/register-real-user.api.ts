import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import { removeItem } from "../common/storage/storage.service";
import methods from "../interceptors/http.interceptor";
import { IRealUser } from "./../../models";
import { showToast } from "./../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/Account/RegisterUserReal";

const RealRegisterApi = async (
  value: IRealUser
): Promise<AxiosResponse<IAxiosResult>> => {
  delete value.confirmPassword;
  return await methods.post(url, value);
};

export const UseRealRegister = () => {
  const history = useHistory();
  //const {userInfo} = useRegisterContext()

  return useMutation(RealRegisterApi, {
    onSuccess: (value) => {
      removeItem("securityStamp");
      removeItem("nationalCodeRegister");
      removeItem("nationalIdRegister");
      showToast(value.data.message, "success");
      history.push("/Register/SuccessRegister");
    },
  });
};
