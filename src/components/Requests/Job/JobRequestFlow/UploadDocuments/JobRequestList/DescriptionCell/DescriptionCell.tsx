import React from "react";

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
  return <span></span>;
};

export { DescriptionCell };
