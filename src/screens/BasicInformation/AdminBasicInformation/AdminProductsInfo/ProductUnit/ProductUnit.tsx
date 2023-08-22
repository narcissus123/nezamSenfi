import * as React from 'react';
import { ProductsUnitContainer } from '../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/ProductsUnitContainer/ProductsUnitContainer';
import BreadCrumbs from '../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb';


export interface PersonalInfoProps {}
 
const ProductUnit: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="واحد اندازه گیری محصولات"
      />
      <ProductsUnitContainer />
    </>
  );
}
 
export { ProductUnit };