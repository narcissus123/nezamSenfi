import React, { FC, Fragment } from "react";

import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyTransactionList } from "../../../components/WalletContainer/AllTransactionList/CountyTransactionList";

const CountyTransactionListPage: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات کیف پول"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست تراکنش ها"
      />

      <CountyTransactionList />
    </Fragment>
  );
};

export { CountyTransactionListPage };
