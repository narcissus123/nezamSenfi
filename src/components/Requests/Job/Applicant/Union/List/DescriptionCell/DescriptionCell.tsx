import React from "react";
import { stringShorter } from "../../../../../../../core/utils/string-shorter.utils";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; name: any; description: any };
    };
  };
}

const DescriptionCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id, name, description },
    },
  },
}) => {
  return <span>{stringShorter(description, 40)}</span>;
};

export { DescriptionCell };
