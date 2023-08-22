import React from "react";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";

interface ICanStatus{
  roles: any;
}

const Can:React.FC<ICanStatus> = ({children,roles,}) => {

  const { role } = useUserAuth();

  const valid = roles.some((p: any) => role.includes(p)); //roles.includes(role)

  if (valid) {
    return <>{children}</>;
  } else {

    return <></>;
  }
  
}

export { Can };


