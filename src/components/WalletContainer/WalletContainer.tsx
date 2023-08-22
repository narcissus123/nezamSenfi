import React, { FC, Fragment, ReactNode } from "react";
import { Card, CardBody } from "reactstrap";

interface IPropTypes {
  children: {
    AddMoney: ReactNode;
    TransactionList: ReactNode;
  };
}

const WalletContainer: FC<IPropTypes> = ({
  children: { AddMoney, TransactionList },
}) => {
  return (
    <Fragment>
      <Card>
        <CardBody>{AddMoney}</CardBody>
      </Card>
      <Card>
        <CardBody>{TransactionList}</CardBody>
      </Card>
    </Fragment>
  );
};

export { WalletContainer };
