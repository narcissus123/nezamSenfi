import React from "react";
export interface IPropsType {}

interface IPropTypes {
  cell: {
    row: {
      values: { amount: any };
    };
  };
}

const TreasurerJobRequestsAmount: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { amount },
    },
  },
}) => {
  return <span>{`${amount} ریال`}</span>;
};

export { TreasurerJobRequestsAmount };
