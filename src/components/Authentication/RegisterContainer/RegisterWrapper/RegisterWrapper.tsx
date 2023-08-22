import React from "react";
import { Card, CardHeader, CardTitle, Row, Col, CardBody } from "reactstrap";

import { RegisterImage } from "../RegisterImage";
import { RegisterAlert } from "./RegisterAlert";

const RegisterWrapper: React.FC = ({ children }) => {
  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="10"
        xl="8"
        lg="11"
        md="10"
        className="d-flex justify-content-center"
      >
        <Card className="bg-authentication rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col lg="7" md="12" className="p-0">
              <Card className="rounded-0 mb-0 p-2">
                <CardHeader className="pb-1 pt-50">
                  <CardTitle>
                    <h4 className="mb-0">ثبت نام</h4>
                  </CardTitle>
                </CardHeader>

                <CardBody className="py-0 pt-1">
                  <RegisterAlert />
                </CardBody>
                {children}
              </Card>
            </Col>

            {/* <RegisterImage /> */}
            {/* <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=220683&amp;Code=VZP9gSLrlcQT5y6dWNam"
            >
              <img
                referrerPolicy="origin"
                src="https://trustseal.enamad.ir/logo.aspx?id=220683&amp;Code=VZP9gSLrlcQT5y6dWNam"
                alt=""
                style={{ cursor: "pointer" }}
                id="VZP9gSLrlcQT5y6dWNam"
              />
            </a> */}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export { RegisterWrapper };
