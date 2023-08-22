import * as React from 'react';
import { ActivityMeasurementUnit as ActivityMeasurementUnitContainer } from '../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/ActivityMeasurementUnit';
import BreadCrumbs from '../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb';


export interface PersonalInfoProps {}
 
const ActivityMeasurementUnit: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="واحد اندازه گیری فعالیت"
      />
      <ActivityMeasurementUnitContainer />
    </>
  );
}
 
export { ActivityMeasurementUnit };