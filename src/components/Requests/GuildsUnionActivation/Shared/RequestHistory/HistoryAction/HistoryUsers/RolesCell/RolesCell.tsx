import React, { useEffect, useState } from "react";

interface IPropTypes {
  cell: {
    row: {
      values: { posts: any };
    };
  };
}

const RolesCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { posts },
    },
  },
}) => {
  // delete and edit icon in row
  console.log(posts);
  
  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: 1,
          label: "رییس هیات مدیره",
        },
        {
          value: 2,
          label: "ناییب رییس",
        },
        {
          value: 3,
          label: "خزانه دار",
        },
        {
          value: 4,
          label: "عضو عادی",
        },
        {
          value: 5,
          label: "مدیر اجرایی",
        },
        {
          value: 6,
          label: "دبیر",
        },
      ],
    },
  ];

  const [rolesNameArray, setRolesNameArray] = useState<any>([]);
  let newRoles: any = [];
  useEffect(() => {
    const roleData = posts.forEach((role: any) => {
      noChangeAllServiceState[0].options.forEach((roleName: any) => {
        if (roleName.value === role) {
          newRoles.push(roleName.label);
        }
      });
    });

    setRolesNameArray(newRoles);
  }, [posts]);

  return (
    <span>
      {rolesNameArray.map((role: any) => {
        return `${role},`;
      })}
    </span>
  );
};

export { RolesCell };
