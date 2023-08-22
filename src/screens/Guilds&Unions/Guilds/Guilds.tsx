import * as React from 'react';
import BreadCrumbs from '../../../components/common/@vuexy/breadCrumbs/BreadCrumb';
import { CanRenderByPath } from '../../../components/common/Wrapper/CanRenderByPath/CanRenderByPath';

import { GuildsContainer } from '../../../components/Guilds&UnionsContainer/GuildsContainer/GuildsContainer';

export interface GuildsProps {
  
}
 
const Guilds: React.FC<GuildsProps> = () => {
  const provinceUrl = [
    "/Guilds/province",
  ];
  const countyUrl = [
    "/Guilds/county",
  ];
  return (
    <>
      <CanRenderByPath url={provinceUrl}>
        <BreadCrumbs
          breadCrumbTitle="اصناف استانی"
          breadCrumbParent="لیست اصناف استانی"
        />
      </CanRenderByPath>
      <CanRenderByPath url={countyUrl}>
        <BreadCrumbs
          breadCrumbTitle="اصناف شهرستانی"
          breadCrumbParent="لیست اصناف شهرستانی"
        />
      </CanRenderByPath>

      <GuildsContainer />
    </>
  );
}
 
export {Guilds};