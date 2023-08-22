import React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MyTicketsContainer } from "../../../components/Tickets/MyTicketsContainer/";

const MyTickets: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="پیام های من"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="پیام های من"
      />
      <MyTicketsContainer />
    </>
  );
};

export { MyTickets };
