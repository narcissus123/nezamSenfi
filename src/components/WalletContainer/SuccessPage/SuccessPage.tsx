import React, { FC, Fragment } from "react";
import { DollarSign } from "react-feather";
import { Link } from "react-router-dom";
import { Alert, Button, Card, CardBody, Col, Row } from "reactstrap";
import Styled from './SuccessPage.module.scss'
import SuccessSign from '../../../assets/img/success-sign.png'


const SuccessPage: FC = () => {
  return (
    <>
      <div className={Styled['page-message-container']} >
        <Card>
          <CardBody style={{ padding: "50px 0px" }}>
            <Row>
              <Col className="d-flex justify-content-center">
                <img
                  className={`${Styled["image-size"]}`}
                  src={SuccessSign}
                  alt="موفقیت آمیز"
                />
              </Col>
            </Row>
            <Alert
              className={`text-center ${Styled["alert-container"]}`}
              color={"success"}
            >
              <p>پرداخت با موفقیت انجام شد.</p>
            </Alert>
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

export { SuccessPage };
