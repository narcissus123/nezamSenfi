import React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { NotificationContainer } from "../../../components/Settings/NotificationContainer/NotificationContainer";

const Notification: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اعلان ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تنظیمات اعلان ها"
      />
      <NotificationContainer />
    </>
  );
};

export { Notification };
