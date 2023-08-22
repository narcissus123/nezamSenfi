import React, { FC, Fragment } from "react";

import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceTransactionList } from "../../../components/WalletContainer/AllTransactionList/ProvinceTransactionList";

const ProvinceTransactionListPage: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات کیف پول"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست تراکنش ها"
      />

      <ProvinceTransactionList />
    </Fragment>
  );
};

export { ProvinceTransactionListPage };
