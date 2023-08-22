import React, { FC } from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { GuildDetails } from "../../../../../components/Guilds&UnionsContainer/GuildsContainer/Provincial/GuildDetails/GuildDetails";

const ProvinceScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صنف استانی"
        breadCrumbParent="پیشخوان"
        parentLink={`/`}
        breadCrumbActive={"جزئیات صنف استانی"}
      />
      <GuildDetails />
    </>
  );
 
};

export { ProvinceScreen };
