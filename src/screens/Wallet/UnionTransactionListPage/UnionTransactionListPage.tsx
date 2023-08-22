import React, { FC, Fragment } from "react";

import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionTransactionList } from "../../../components/WalletContainer/AllTransactionList/UnionTransactionList";

const UnionTransactionListPage: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات کیف پول"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست تراکنش ها"
      />

      <UnionTransactionList />
    </Fragment>
  );
};

export { UnionTransactionListPage };
