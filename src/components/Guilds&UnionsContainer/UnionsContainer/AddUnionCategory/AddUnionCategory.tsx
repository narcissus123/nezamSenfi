import React, { FC, Fragment, ReactNode } from "react";
import { Card, CardBody } from "reactstrap";

interface IPropTypes {
  children: {
    addUnion: ReactNode;
    unionList: ReactNode;
  };
}

const AddUnionCategory: FC<IPropTypes> = ({
  children: { addUnion, unionList },
}) => {
  return (
    <Fragment>
      <Card>
        <CardBody>{addUnion}</CardBody>
      </Card>

      <Card>
        <CardBody>{unionList}</CardBody>
      </Card>
    </Fragment>
  );
};

export { AddUnionCategory };
