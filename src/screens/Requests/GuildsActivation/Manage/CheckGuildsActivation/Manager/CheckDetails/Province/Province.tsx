import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Province } from "../../../../../../../../components/Requests/GuildsUnionActivation/Manage/CheckGuildsActivation/Province/Province";

const ProvinceScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست ها"
        //parentLink2="/GuildsActivation/CountyItManagerCartable"
        breadCrumbActive="جزییات درخواست"
      />
      <Province isManagerCartable />
    </>
  );
};

export { ProvinceScreen };
