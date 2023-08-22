import React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { TicketDetails as TicketDetailsContaier } from "../../../components/Tickets/TicketDetails";

const TicketDetails: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="پیام های من"
        breadCrumbParent="لیست تیکت ها"
        parentLink="/Tickets/MyTickets"
        breadCrumbActive="جزییات پیام"
      />
      <TicketDetailsContaier />
    </>
  );
};

export { TicketDetails };
