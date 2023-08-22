import React, { useState, useContext } from "react";
import { Switch } from "react-router-dom";

import { IPotentialUser } from "../../../core/models";
import { getItemGeneric } from "../../../core/services/common/storage/storage.service";
import { registerRoutes } from "../../../configs/RouteConfig/UnAuthRouteConfig";
import { UnAuthorizeRoute } from "../../common/RouteComponents/UnAuthorizeRoute/UnAuthorizeRoute";


export interface IRegisterContext {
  userInfoRegister: IPotentialUser;
  setUserInfoRegister: React.Dispatch<React.SetStateAction<IPotentialUser>>;
  securityStamp: string;
  setSecurityStamp: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterContext = React.createContext<IRegisterContext | null>(null);

export const useRegisterContext = () => {
  const contextData = useContext(RegisterContext);
  if (contextData === null) {
    throw new Error("useRegisterContext Must be inside of Provider");
  }
  return contextData;
};

const initialValues: IPotentialUser = {
  userType: 1,
  nationalCode: "",
  nationalId: "",
  cellphone: "",
};

const nationalCode: any = getItemGeneric("nationalCodeRegister")
  ? getItemGeneric("nationalCodeRegister")
  : "";
const nationalId: any = getItemGeneric("nationalIdRegister")
  ? getItemGeneric("nationalIdRegister")
  : "";

const initialSecurityStamp: any = getItemGeneric("securityStamp")
  ? getItemGeneric("securityStamp")
  : "";

const RegisterContainer: React.FC = () => {
  const [userState, setUserInfoRegister] = useState({
    ...initialValues,
    nationalCode: nationalCode,
    nationalId: nationalId,
  });
  const [securityStamp, setSecurityStamp] = useState(initialSecurityStamp);

  return (
    <>
      <RegisterContext.Provider
        value={{
          userInfoRegister: userState,
          setUserInfoRegister,
          securityStamp,
          setSecurityStamp,
        }}
      >
        <Switch>
          {registerRoutes.map((item, index) => {
            return (
              <UnAuthorizeRoute
                key={index}
                exact
                redirectPath={item.redirectPath}
                redirectName={item.redirectName}
                path={item.path}
                statusKey={item.statusKey}
                status={item.status}
                Layout={item.layout}
                component={item.component}
              />
            );
          })}
        </Switch>
      </RegisterContext.Provider>
    </>
  );
};

export { RegisterContainer };
