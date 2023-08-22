import React, { FC } from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { GuildsDetails } from "../../../../../components/Guilds&UnionsContainer/GuildsContainer/County/GuildDetails/GuildDetails";


const CountyScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صنف شهرستانی"
        breadCrumbParent="پیشخوان"
        parentLink={`/`}
        breadCrumbActive={"جزئیات صنف شهرستانی"}
      />
      <GuildsDetails />
    </>
  );
};

export { CountyScreen };
