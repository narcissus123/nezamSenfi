import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

type PermissionContextValue = {
  permissions: string[];
};

const PermissionsContext = React.createContext<PermissionContextValue | null>(
  null
);

const usePermissions = () => {
  const pc = useContext(PermissionsContext);
  if (pc === null) {
    throw new Error("usePermissions Must be inside of Provider");
  }
  return pc;
};

const PermissionsProvider: React.FC = ({ children }) => {
  const [permissions, setPermissions] = useState<string[]>([
    "admin:write",
    "admin:read",
    "admin:delete",
  ]);
  return (
    <PermissionsContext.Provider value={{ permissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};

interface CanProps {
  permissions?: string | string[];
  isScreen?: boolean;
}

const checkMatch = (userPermissions: string[], canProps: CanProps) => {
  let match = false;
  const { permissions = [] } = canProps;
  const permissionsArr = Array.isArray(permissions)
    ? permissions
    : [permissions];
  if (permissionsArr.length === 0) {
    match = true;
  } else {
    match = permissionsArr.some((p: any) => userPermissions.includes(p));
  }
  return match;
};

const CanPermission: React.FC<CanProps> = (props) => {
  const { children } = props;
  const { permissions: userPermissions } = usePermissions();
  const history = useHistory();
  const match = checkMatch(userPermissions, props);
  if (match) {
    return <>{children}</>;
  } else {
    if (props.isScreen) history.push("/access-denied");
    return null;
  }
};

// const PermissionSwitch: React.FC = ({ children }) => {
//   const { permissions: userPermissions } = usePermissions();

//   let element: React.ReactNode = null;
//   let match = false;

//   React.Children.forEach(children, (child) => {
//     if (!match && React.isValidElement(child) && child.type === Can) {
//       element = child;
//       match = checkMatch(userPermissions, child.props as CanProps);
//     }
//   });

//   return match ? element : null;
// };

export {
  PermissionsContext,
  PermissionsProvider,
  usePermissions,
  CanPermission,
  //PermissionSwitch,
};
