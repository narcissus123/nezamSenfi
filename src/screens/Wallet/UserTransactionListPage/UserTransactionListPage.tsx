import React, { FC, Fragment } from "react";

import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UserTransactionListContainer } from "../../../components/WalletContainer/AllTransactionList/UserTransactionListContainer";

const UserTransactionListPage: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات کیف پول"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست تراکنش ها"
      />

      <UserTransactionListContainer />
    </Fragment>
  );
};

export { UserTransactionListPage };
