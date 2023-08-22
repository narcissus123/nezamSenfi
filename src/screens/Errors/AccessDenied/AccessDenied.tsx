import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import notAuthImg from "../../../assets/img/pages/not-authorized.png";

interface IPropsType {
  redirectPath?: string;
  redirectName?: string;
  goBack?: boolean;
}

const AccessDenied: React.FC<IPropsType> = ({
  goBack = true,
  redirectName,
  redirectPath = "",
}) => {
  const history = useHistory();
  return (
    <>
      <div></div>
      <Row className="m-0">
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              <img
                src={notAuthImg}
                alt="notAuthImg"
                className="img-fluid align-self-center mt-75"
              />
              <h1 className="font-large-1 my-2">
                شما به این صفحه دسترسی ندارید
              </h1>

              {goBack ? (
                <Button
                  onClick={() => history.push("/")}
                  color="primary"
                  outline
                  size="lg"
                  className="mt-2"
                >
                  بازگشت
                </Button>
              ) : (
                <Button
                  onClick={() => history.push(redirectPath)}
                  color="primary"
                  outline
                  size="lg"
                  className="mt-2"
                >
                  بازگشت به {redirectName}
                </Button>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export { AccessDenied };
