import React, { useEffect, useState } from "react";


interface IPropTypes {
  cell: {
    row: {
      values: { role : any };
    };
  };
  noChangeAllServiceState : any
}

const RolesCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { role },
    },
  },
  noChangeAllServiceState
}) => {
  // delete and edit icon in row

  const [rolesNameArray, setRolesNameArray] = useState<any>([]);
  let newRoles: any = [];
  useEffect(() => {
    const roleData = role.forEach((role: any) => {
      noChangeAllServiceState[0].options.forEach((roleName: any) => {
        if (roleName.value === role) {
          newRoles.push(roleName.label);
        }
      });
    });

    setRolesNameArray(newRoles);
  }, [role]);

  return (
    <span>
      {rolesNameArray.map((role: any) => {
        return `${role},`;
      })}
    </span>
  );
};

export { RolesCell };
