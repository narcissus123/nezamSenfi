import * as React from "react";
import { Col, Row } from "reactstrap";

interface IPropsType {
  firstSm?: string;
  secondSm?: string;
}

const TwoColumn: React.FC<IPropsType> = ({ children, firstSm, secondSm }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <Row>
      <Col md={firstSm ? firstSm : "6"} sm="12">
        {childrenArray[0]}
      </Col>
      <Col md={secondSm ? secondSm : "6"} sm="12">
        {childrenArray[1]}
      </Col>
    </Row>
  );
};

export { TwoColumn };
