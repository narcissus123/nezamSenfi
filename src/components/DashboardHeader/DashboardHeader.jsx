import React from "react"
import { Row, Col } from "reactstrap"
import {SubscribersGained} from "./SubscribersGained"
import {RevenueGenerated} from "./RevenueGenerated"
import {QuaterlySales} from "./QuaterlySales"
import {OrdersReceived} from "./OrdersReceived"

const DashboardHeader = () => {
  return ( 
    <>
      <Row className="match-height">
        <Col lg="3" md="6" sm="6">
          <SubscribersGained />
        </Col>
        <Col lg="3" md="6" sm="6">
          <RevenueGenerated />
        </Col>
        <Col lg="3" md="6" sm="6">
          <QuaterlySales />
        </Col>
        <Col lg="3" md="6" sm="6">
          <OrdersReceived />
        </Col>
      </Row>
    </>
  );
}
 
export default DashboardHeader;