import { ToastTypes } from "../enums";
import { showToast } from "./show-toast";
import { history } from "../../history";

export const IsSameUrl = (url1: string, url2: string): boolean => {
  return (
    url1.toLowerCase() === url2.toLowerCase() ||
    url1.toLowerCase() === url2.toLowerCase() + "/" ||
    url1.toLowerCase() + "/" === url2.toLowerCase()
  );
};

export const CheckIsValidNumericParam = (paramName: string, params: any) => {
  return params[paramName] && !isNaN(params[paramName]);
};

export const HandleRedirectOnError: React.FC<any> = (
  redirectUrl: string,
  message: string
) => {
  showToast([message], ToastTypes.error);
  history.push(redirectUrl);
  return null;
};

export const IsIncludes = (url1: string, url2: string): boolean => {
  return (
    url1.toLowerCase().includes(url2.toLowerCase()) ||
    url1.toLowerCase().includes(url2.toLowerCase() + "/") ||
    (url1.toLowerCase() + "/").includes(url2.toLowerCase())
  );
};
