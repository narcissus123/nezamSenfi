import React, { FC, Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { AddMoney } from "../../../components/WalletContainer/AddMoney";



const AddMoneyPage: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات کیف پول"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="افزایش اعتبار"
      />

      <Card>
        <CardBody>
          <AddMoney />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { AddMoneyPage };
