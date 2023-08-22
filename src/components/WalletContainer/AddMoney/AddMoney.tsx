import React, { FC, Fragment, useEffect, useState } from "react";
import { Alert, Button, CardBody, CardTitle, Spinner } from "reactstrap";

import { AddMoneyModal } from "../../common/AddMoneyModal";
import {
  CurrencyMask,
  RemoveCurrencyMask,
} from "../../../core/utils";
import { useGetMyWalletBalance } from "../../../core/services/api";

import Styled from "./AddMoney.module.scss";



const AddMoney: FC = () => {
  const [amount, setAmount] = useState("0");
  const [openModal, setOpenModal] = useState(false);

  const myWallet = useGetMyWalletBalance();

  useEffect(() => {
    if (myWallet.data && myWallet.data.data) {
      const result = myWallet.data.data.result;
      setAmount(CurrencyMask(result));
    }
  }, [myWallet.isSuccess && myWallet.data.data]);

  return (
    <Fragment>
      <AddMoneyModal
        isOpen={openModal}
        toggleModal={() => setOpenModal((state) => !state)}
        backdrop={true}
        refetchWallet={() => myWallet.refetch()}
      />
      <CardTitle>افزایش اعتبار</CardTitle>
      <CardBody>
        <div className="d-flex justify-content-center align-content-center">
          <img
            src={require("../../../assets/img/svg/wallet.svg").default}
            alt="logo"
            className={Styled.logo}
          />
        </div>

        <Alert
          className={`text-center ${Styled["alert-container"]}`}
          color={
            myWallet.isFetching
              ? "secondary"
              : +RemoveCurrencyMask(amount) === 0
              ? "warning"
              : "success"
          }
        >
          <p>میزان اعتبار:</p>
          {myWallet.isFetching ? (
            <Spinner
              color={
                myWallet.isFetching
                  ? "secondary"
                  : +RemoveCurrencyMask(amount) === 0
                  ? "warning"
                  : "success"
              }
              size="lg"
              style={{ margin: "5px" }}
            />
          ) : (
            <p className={Styled.amount}>{amount} ریال</p>
          )}
        </Alert>

        <Button color="primary" onClick={() => setOpenModal(true)}>
          افزایش اعتبار
        </Button>
      </CardBody>
    </Fragment>
  );
};

export { AddMoney };
