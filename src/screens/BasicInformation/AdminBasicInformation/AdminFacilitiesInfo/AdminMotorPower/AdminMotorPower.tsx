import * as React from "react";
import { MotorPowerContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminFacilities/MotorPowerContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminMotorPower: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="قطعات و تأسیسات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="قدرت موتور"
      />
      <MotorPowerContainer />
    </>
  );
};

export { AdminMotorPower };
