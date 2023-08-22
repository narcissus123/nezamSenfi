import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ComponentSpinner } from "../../common/Spinner/LoadingSpinner";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { setItem } from "../../../core/services/common/storage/storage.service";
import * as auth from "../../../core/services/authentication/authentication.service";
import { GetAllUserClaims } from "../../../core/services/api";

const SigninOidc: React.FC = () => {
  const history = useHistory();
  const {
    setRoleState,
    setTokenState,
    setUserInfoState,
    setUserClaimState,
    userInfo,
  } = useUserAuth();

  useEffect(() => {
    async function signinAsync() {
      try {
        const result = await auth.loginCallback();
        console.log(result);

        const exp = new Date(result.expires_at * 1000);

        let role: string | string[] = result.profile.role
          ? result.profile.role
          : ["UserReal"]; // edit after more user types
        // redirect user to home page

        // check if its string when convert to string
        if (typeof role === "string") {
          role = [role];
        }

        const family = result.profile.family_name;
        // set user information in context
        setRoleState(role);
        setTokenState(result.access_token);
        setUserInfoState((prev) => {
          return {
            ...prev,
            userName: result.profile.preferred_username,
            name: result.profile.name,
            userType: +result.profile.UserType,
            family: family,
            userInfoId: +result.profile.UserInfoId,
            authTime: result.profile.auth_time,
          };
        });

        // set user information in local-storage
        setItem("token", result.access_token);
        setItem("expiry", exp.getTime());
        // setItem("refresh_token", result.refresh_token);
        // auth.setLoggedUserInfoToStorage({
        //   ...userInfo,
        //   userName: result.profile.preferred_username,
        //   name: result.profile.name,
        //   family: family,
        //   userInfoId: +result.profile.UserInfoId,
        //   authTime: result.profile.auth_time,
        //   userType: +result.profile.UserType,
        // });
        // auth.setUserRoles(role);

        // const userClaim = await GetAllUserClaims();

        // setItem("user-claim", userClaim);
        // setUserClaimState(userClaim);

        history.push("/");
      } catch (error) {
        // console.log(error);
      }
    }
    signinAsync();
  }, [history]);
  return <ComponentSpinner />;
};

export { SigninOidc };
