import React from "react";
import { stringShorter } from "../../../../../../core/utils/string-shorter.utils";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; name: any; provinceDescription: any };
    };
  };
}

const DescriptionCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id, name, provinceDescription },
    },
  },
}) => {
  return <>{provinceDescription ?<span>{stringShorter(provinceDescription, 40)}</span> : <span></span> }</>;
};

export { DescriptionCell };
