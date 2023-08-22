import React, { FC } from "react";
import { Badge } from "reactstrap";
import { FinancialTransactionStatusName } from "../../../../../../../../core/enums";


interface IPropTypes {
  cell: {
    row: {
      values: { status: string };
    };
  };
}

const TransactionEvent: FC<IPropTypes> = ({
  cell: {
    row: {
      values: { status },
    },
  },
}) => {
  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      <Badge
        color={
          status === FinancialTransactionStatusName.Succeeded
            ? "success"
            : "warning"
        }
      >
        {status}
      </Badge>
    </div>
  );
};

export { TransactionEvent };
