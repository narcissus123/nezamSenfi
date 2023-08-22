import React, { FC } from "react";

interface IPropTypes {
  dataList: any[];
  objToSearch: any;
  isFromMachinery? : boolean
}

const ShowConsompotionToggle: FC<IPropTypes> = ({
  dataList,
  objToSearch,
  children,
  isFromMachinery
}) => {
  let result = false ;

  if(isFromMachinery) {
    result = dataList.some(
      (consomption) => consomption.machineryConsumptionTypeEnum === objToSearch
    );
  }else{
    result = dataList.some(
      (consomption) => consomption.consomptionTabsEnum === objToSearch
    );
  }


  if (result) return <>{children}</>;
  else return null;
};

export { ShowConsompotionToggle };
