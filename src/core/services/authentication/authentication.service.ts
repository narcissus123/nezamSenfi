import { userManager } from "./oidc.service";
import * as storage from "../common/storage/storage.service";

interface IUserInfoType {
  userName: string;
  name: string;
  family: string;
  userInfoId: number;
  authTime: string;
  userType: number;
}

const login = (): void => {
  userManager.signinRedirect();
};

export const silentLogin = (): any => {
  return userManager.signinSilent();
};

const setLoggedUserInfoToStorage = (user: IUserInfoType): void => {
  storage.setItem("userInfo", user);
};

const getLoggedUserInfoFromStorage = (): IUserInfoType => {
  return JSON.parse(String(storage.getItem("userInfo")));
};

const removeLoggedUserInfoFromStorage = (): void => {
  storage.removeItem("userInfo");
};

const isUserLoggedIn = (): boolean => {
  if (getLoggedUserInfoFromStorage() && getAccessToken()) {
    return true;
  }
  return false;
};

const setAccessToken = (token: string): void => {
  storage.setItem("token", token);
};

const getUser = async () => await userManager.getUser();

const getAccessToken = (): string | null => {
  if (storage.getItem("token"))
    return String(storage.getItem("token")).replace('"', "").replace('"', "");
  return null;
};

export const setUserRoles = (roles: string[]): void => {
  storage.setItem("role", roles);
};

export const getUserRoles = (): string[] => {
  const role = storage.getItem("role")
    ? JSON.parse(storage.getItem("role") as string)
    : [];
  return role;
};

export const getUserClaims = (): string[] => {
  const userClaim = storage.getItem("user-claim")
    ? JSON.parse(storage.getItem("user-claim") as string)
    : [];
  return userClaim;
};

const removeAccessToken = (): void => {
  storage.removeItem("token");
};

const setRefreshToken = (token: string): void => {
  storage.setItem("refresh_token", token);
};

const getRefreshToken = (): string | null => {
  if (storage.getItem("refresh_token"))
    return String(storage.getItem("refresh_token"));
  return null;
};

const removeRefreshToken = (): void => {
  storage.removeItem("refresh_token");
};

const loginCallback = (): any => {
  return userManager.signinRedirectCallback();
};

const logout = (): void => {
  userManager.signoutRedirect();
  //userManager.startSilentRenew();
};

const logOutCallback = (): any => {
  return userManager.signoutRedirectCallback();
};

export {
  login,
  logout,
  setLoggedUserInfoToStorage,
  getLoggedUserInfoFromStorage,
  getAccessToken,
  setAccessToken,
  isUserLoggedIn,
  loginCallback,
  removeAccessToken,
  removeLoggedUserInfoFromStorage,
  logOutCallback,
  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,
  getUser,
};
