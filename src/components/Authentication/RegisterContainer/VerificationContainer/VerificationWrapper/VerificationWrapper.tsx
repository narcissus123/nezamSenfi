import React from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  CardBody,
  Alert
} from "reactstrap"
import { RegisterImage } from '../../RegisterImage';



const VerificationWrapper: React.FC = ({ children }) => {
  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="10" xl="8" lg="11" md="10"
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
                <CardBody>
                  <Row>
                    <Col
                      sm="12" xl="12" lg="12" md="12"
                      className={`d-flex justify-content-center`}
                    >
                    <div className="bg-white w-100 rounded">
                        <Alert color="info" className="w-100 m-0 text-center">
                            کد پیامک شده را وارد نمایید
                        </Alert>
                      </div>
                    </Col>
                  </Row>
                </CardBody>

                {
                  children
                }

              </Card>

            </Col>

            <RegisterImage />

          </Row>

        </Card>
      </Col>
    </Row>
   

  );
}

export { VerificationWrapper }