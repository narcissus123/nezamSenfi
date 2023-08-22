import * as React from 'react';

import { ProductTreeContainer } from '../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/ProductTreeContainer';
import BreadCrumbs from '../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb';

export interface PersonalInfoProps {}
 
const ProductTree: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخت محصولات"
      />
      <ProductTreeContainer />
    </>
  );
}
 
export { ProductTree };