import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MaxPayableValueContainer } from "../../../../components/Settings/Finance/MaxPayableValueContainer/MaxPayableValueContainer";


const MaxPayableValue: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مالی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درصد تسهیم تعرفه"
      />
      <MaxPayableValueContainer />
    </>
  );
};

export { MaxPayableValue };
