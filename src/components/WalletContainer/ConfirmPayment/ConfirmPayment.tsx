import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Spinner,
} from "reactstrap";
import { ToastTypes } from "../../../core/enums";

import { useGetMyWalletBalance } from "../../../core/services/api";
import {
  CurrencyMask,
  IsIncludes,
  RemoveCurrencyMask,
  showToast,
} from "../../../core/utils";
import { AddMoneyModal } from "../../common/AddMoneyModal";
import { SimpleSubmitButton } from "../../common/Form";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";

import Styled from "./ConfirmPayment.module.scss";
import { SweetAlertCallback } from "../../common/SweetAlert/SweetALertCallback/SweetALertCallback";

interface IPropTypes {
  getRequestRate: any;
  payMutation: any;
  redirectLink: string;
  title?: string;
  isLicense?: boolean;
  isDone?: boolean;
}

const ConfirmPayment: FC<IPropTypes> = ({
  getRequestRate,
  payMutation,
  redirectLink,
  title,
  isLicense,
  isDone,
}) => {
  const [amount, setAmount] = useState("0");
  const [cache, setCache] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const { req_id, status }: any = useParams();

  useEffect(() => {
    if (getRequestRate.isSuccess) {
      setCache(getRequestRate.data.data.result);
    }
  }, [getRequestRate.isSuccess]);

  const myWallet = useGetMyWalletBalance();

  useEffect(() => {
    if (myWallet.data && myWallet.data.data) {
      const result = myWallet.data.data.result;
      setAmount(CurrencyMask(result));
    }
  }, [myWallet.isSuccess && myWallet.data.data]);

  const history = useHistory();

  return (
    <Card>
      <SweetAlertCallback
        mutation={payMutation}
        title="پرداخت"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          let paymentObject;
          if (isLicense) {
            paymentObject = {
              licesnseRequestId: +req_id,
              amount: +RemoveCurrencyMask(cache),
            };
          } else
            paymentObject = {
              positionRequestId: +req_id,
              amount: +RemoveCurrencyMask(cache),
            };

          payMutation.mutate(paymentObject, {
            onSuccess: () => {
              showToast(["با موفقیت پرداخت شد"], ToastTypes.success);
              history.push(redirectLink);
            },
          });
        }}
        show={showConfirmation}
      >
        آیا پرداخت وجه انجام شود؟
      </SweetAlertCallback>

      <AddMoneyModal
        isOpen={openModal}
        toggleModal={() => setOpenModal((state) => !state)}
        backdrop={true}
        minimumAmount={
          cache > RemoveCurrencyMask(amount)
            ? String(cache - RemoveCurrencyMask(amount))
            : "0"
        }
        refetchWallet={myWallet.refetch}
      />
      <CardHeader>
        <CardTitle>{title ? title : "تایید تراکنش"}</CardTitle>
      </CardHeader>
      {getRequestRate.isLoading ? (
        <FallBackSpinner />
      ) : (
        <CardBody>
          {IsIncludes(window.location.pathname, "Issued")
            ? status > 18 && (
                <Alert color="info">پرداخت با موفقیت انجام شده است</Alert>
              )
            : status > 15 && (
                <Alert color="info">پرداخت با موفقیت انجام شده است</Alert>
              )}
          <div className="d-flex justify-content-center align-content-center mb-3">
            <img
              src={require("../../../assets/img/svg/wallet.svg").default}
              alt="logo"
              className={Styled.logo}
            />
          </div>

          {!myWallet.isFetching && cache > +RemoveCurrencyMask(amount) && (
            <Alert color="danger" className="text-center mb-2">
              موجودی کافی نیست
            </Alert>
          )}

          <Col sm="7" className="mx-auto">
            <Alert className="text-center" color="warning">
              میزان تراکنش:
              {getRequestRate.isFetching ? (
                <Spinner
                  color={getRequestRate.isFetching ? "secondary" : "warning"}
                  size="lg"
                  style={{ margin: "5px" }}
                />
              ) : (
                <p className={Styled.amount}>{CurrencyMask(cache)} ریال</p>
              )}
              {/* <DollarSign  /> */}
            </Alert>
          </Col>

          <Col sm="7" className="mx-auto mb-3">
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
          </Col>

          {!isDone && (
            <FormGroup>
              {cache > +RemoveCurrencyMask(amount) ? (
                <SimpleSubmitButton
                  isLoading={false}
                  onCLick={() => setOpenModal(true)}
                  btnText="افزایش اعتبار"
                />
              ) : (
                <SimpleSubmitButton
                  isLoading={payMutation.isLoading}
                  btnText="پرداخت"
                  onCLick={() => setShowConfirmation(true)}
                />
              )}
            </FormGroup>
          )}
        </CardBody>
      )}
    </Card>
  );
};

export { ConfirmPayment };
