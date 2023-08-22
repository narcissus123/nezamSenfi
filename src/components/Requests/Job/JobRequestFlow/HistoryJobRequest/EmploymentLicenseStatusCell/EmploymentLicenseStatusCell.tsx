import React, { FC, useState } from "react";
import { fullOption } from "../../../../../../core/utils";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; name: any ; employmentLicenseStatus : any};
      original: { resumeHistory: any };
    };
  };
}

const EmploymentLicenseStatusCell: FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , employmentLicenseStatus },
      original: { resumeHistory },
    },
  },
}) => {

  const [
    employmentLicenseStatusData,
    setEmploymentLicenseStatusData,
  ] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دارای اعتبار" },
        { value: 2, label: "فاقد اعتبار" },
      ],
    },
  ]);


  return <span>{fullOption(employmentLicenseStatus, employmentLicenseStatusData)?.label}</span>;
};

export { EmploymentLicenseStatusCell };
