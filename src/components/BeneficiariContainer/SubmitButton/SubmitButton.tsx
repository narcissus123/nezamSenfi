import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, Spinner } from "reactstrap";

interface IPropTypes {
  isLoading: boolean;
  nextPath? : string,
  prePath? : string,
  Styled: any;
}

const SubmitButton: React.FC<IPropTypes> = ({ isLoading, Styled , nextPath , prePath}) => {
  return (
    <Row className={`justify-content-between ${Styled["mobile-btn"]}`}>
      <Button
        className={`${Styled.submit} d-flex align-items-center justify-content-center`}
        color="primary"
      >
        {isLoading && <Spinner color="white" size="sm" />}
        <span className="ml-50">ذخیره اطلاعات</span>
      </Button>

      <Row>
        <Col className="justify-content-center d-flex">
          {prePath ? (
            <Link
              to={prePath}
              color="primary"
              className={`btn btn-primary ${Styled["back-page"]}`}
            >
              قبلی
            </Link>
          ) : (
            <></>
          )}

          {nextPath ? (
            <Link to={nextPath} color="primary" className="btn btn-primary">
              بعدی
            </Link>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Row>
  );
};

export { SubmitButton };
