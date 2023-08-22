import React, { FC } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { fullOption, simpleOption } from "../../../../../../core/utils";
import Styles from "./BankInfo.module.scss";


interface IPropTypes {
  initialValues:any
}

const BankInfo: FC<IPropTypes> = ({ initialValues }) => {

  const bankAccountTypeData = [
    { value: 1, label: "حساب قرض الحسنه" },
    { value: 2, label: "حساب قرض الحسنه جاری" },
    { value: 3, label: "حساب قرض الحسنه پس انداز" },
    { value: 4, label: "حساب سرمایه گذاری" },
    { value: 5, label: "حساب سرمایه گذاری کوتاه مدت" },
    { value: 6, label: "حساب سرمایه گذاری مدت دار" },
  ];
  
  return (
    <div>
      {initialValues && (
        <>
          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`کد شبا: ${initialValues.bankShabaNumber}`}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`شماره حساب: ${initialValues.bankAcountNumber} `}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`نوع حساب: ${
                simpleOption(initialValues.bankAccountType, bankAccountTypeData)
                  .label
              } `}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`نام بانک: ${initialValues.bankName}`}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`نام شعبه: ${initialValues.bankBranchName}`}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              {`کد شعبه: ${initialValues.bankBranchCode}`}
            </ListGroupItem>
          </ListGroup>
        </>
      )}
    </div>
  );
};

export { BankInfo };
