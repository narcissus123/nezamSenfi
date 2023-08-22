import React, { FC, Fragment } from "react";
import { Card, CardBody, CardHeader, CardTitle} from "reactstrap";
import { TicketList } from "./TicketList/TicketList";

interface IPropTypes {
  
}

const MyTicketsContainer: FC<IPropTypes> = ({

}) => {
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>پیام های من</CardTitle>
        </CardHeader>
        <CardBody>
          <TicketList />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { MyTicketsContainer };
