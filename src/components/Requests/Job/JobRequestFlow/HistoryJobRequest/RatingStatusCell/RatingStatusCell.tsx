import React, { FC, useState } from "react";
import { fullOption } from "../../../../../../core/utils";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; name: any ; ratingStatus : any};
      original: { resumeHistory: any };
    };
  };
}

const RatingStatusCell: FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , ratingStatus },
      original: { resumeHistory },
    },
  },
}) => {
  const [rankStatusData, setRankStatusData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "رتبه A" },
        { value: 2, label: "رتبه B" },
        { value: 3, label: "رتبه C" },
        { value: 4, label: "فاقد رتبه" },
      ],
    },
  ]);

  return <span>{fullOption(ratingStatus, rankStatusData)?.label}</span>;
};

export { RatingStatusCell };
