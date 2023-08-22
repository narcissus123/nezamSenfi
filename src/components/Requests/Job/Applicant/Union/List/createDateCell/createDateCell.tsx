import React from "react";
import { stringShorter } from "../../../../../../../core/utils/string-shorter.utils";

interface IPropTypes {
  cell: {
    row: {
      values: { createDate: any };
    };
  };
}

const createDateCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { createDate },
    },
  },
}) => {
  return <span>{stringShorter(createDate, 40)}</span>;
};

export { createDateCell };
