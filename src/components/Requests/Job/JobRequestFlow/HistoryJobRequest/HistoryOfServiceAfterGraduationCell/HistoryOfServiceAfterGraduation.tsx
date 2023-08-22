import React, { FC } from "react";
import { fullOption } from "../../../../../../core/utils";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; name: any ; historyOfServiceAfterGraduation : any};
      original: { resumeHistory: any };
    };
  };
}

const HistoryOfServiceAfterGraduationCell: FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , historyOfServiceAfterGraduation },
      original: { resumeHistory },
    },
  },
}) => {
  const yearOfServicesData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "1 سال" },
        { value: 2, label: "2 سال" },
        { value: 3, label: "3 سال" },
        { value: 4, label: "4 سال" },
        { value: 5, label: "5 سال" },
        { value: 6, label: "6 تا 10 سال" },
        { value: 7, label: "11 تا 15 سال" },
        { value: 8, label: "16 تا 20 سال" },
        { value: 9, label: "21 تا 25 سال" },
        { value: 10, label: "26 تا 30 سال" },
      ],
    },
  ];


  return <span>{fullOption(historyOfServiceAfterGraduation, yearOfServicesData)?.label}</span>;
};

export { HistoryOfServiceAfterGraduationCell };
