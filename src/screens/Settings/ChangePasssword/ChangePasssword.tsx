import React, { FC } from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ChangePasswordContainer } from "../../../components/Settings/ChangePasswordContainer/ChangePasswordContainer";

const ChangePasssword: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="پروفایل"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تغییر رمز عبور"
      />
      <ChangePasswordContainer />
    </>
  );
};

export { ChangePasssword };
