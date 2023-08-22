import React, { FC, Fragment } from "react";

import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { AdminTransactionList } from "../../../components/WalletContainer/AllTransactionList/AdminTransactionList";

const AllTransactionListPage: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات کیف پول"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست تراکنش ها"
      />

      <AdminTransactionList />
    </Fragment>
  );
};

export { AllTransactionListPage };
