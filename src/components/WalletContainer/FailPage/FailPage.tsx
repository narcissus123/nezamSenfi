import React, { FC, Fragment } from "react";
import { DollarSign } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import { Alert, Button, Card, CardBody, Col, Row } from "reactstrap";
import Styled from './FailPage.module.scss'
import FailSign from "../../../assets/img/fail-sign.png";

const queryString = require('query-string');


const FailPage: FC = () => {

  const location = useLocation()
  const parsed = queryString.parse(location.search);

  return (
    <>
      <div className={Styled['page-message-container']}>
        <Card>
          <CardBody style={{ padding: "50px 0px" }}>
            <Row>
              <Col className="d-flex justify-content-center">
                <img
                  className={`${Styled["image-size"]}`}
                  src={FailSign}
                  alt="پرداخت ناموفق"
                />
              </Col>
            </Row>
            <Alert
              className={`text-center ${Styled["alert-container"]}`}
              color={"danger"}
            >
              <p>پرداخت انجام نشد !</p>
            </Alert>
            {parsed.q && (
              <Alert
                className={`text-center ${Styled["alert-container"]}`}
                color={"warning"}
              >
                <p>{parsed.q}</p>
              </Alert>
            )}
            <Row>
              <Col className="d-flex justify-content-center">
                <Link to={`/Wallet/ChargeWallet`}>
                  <Button
                    style={{ margin: "3px" }}
                    color="primary"
                    onClick={() => {}}
                  >
                    بازگشت به کیف پول &nbsp;
                    <DollarSign
                      style={{ position: "relative", top: "-2px" }}
                      size={16}
                      color="white"
                    />
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export { FailPage };
