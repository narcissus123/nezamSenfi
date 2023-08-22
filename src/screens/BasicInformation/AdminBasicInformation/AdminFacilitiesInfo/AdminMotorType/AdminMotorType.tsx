import * as React from "react";
import { MotorTypeContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminFacilities/MotorTypeContainer/MotorTypeContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminMotorType: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="قطعات و تأسیسات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="نوع موتور"
      />
      <MotorTypeContainer />
    </>
  );
};

export { AdminMotorType };
