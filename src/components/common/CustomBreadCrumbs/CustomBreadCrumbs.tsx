import React from "react";
import BreadCrumbs from "../@vuexy/breadCrumbs/BreadCrumb";

const CustomBreadCrumbs: React.FC = () => {
  return (
    <BreadCrumbs
      breadCrumbTitle="کاربران اتحادیه "
      breadCrumbParent="لیست اتحادیه ها"
      parentLink="/Unions/"
      //breadCrumbActive={`اتحادیه ${location.state ? location.state.unionName : ''}`}
    />
  );
};

export { CustomBreadCrumbs };
