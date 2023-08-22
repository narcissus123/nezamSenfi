import React, { FC, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CurrencyMask,
  RemoveCurrencyMask,
} from "../../../core/utils";
import { SubmitButton } from "../Form";
import { useChargeMyWallet, useGetSepBankToken, usePostSepPayment } from "../../../core/services/api";
import { MoneyMask } from "../Form";
import { SweetAlertCallback } from "../SweetAlert/SweetALertCallback/SweetALertCallback";


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  refetchWallet: any;
  minimumAmount?: string;
}

const AddMoneyModal: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  refetchWallet,
  minimumAmount = "",
}) => {
  const charchWallet = useGetSepBankToken();
  const redirectToBankMutation = usePostSepPayment()

  const formRef = useRef<any>()

  const validate = Yup.object().shape({
    amount: Yup.string()
      .test(
        "amount",
        `حداقل مقدار قابل پرداخت ${CurrencyMask(minimumAmount)} می باشد!`,
        (val: any) =>
          val && minimumAmount
            ? RemoveCurrencyMask(val) >= RemoveCurrencyMask(minimumAmount)
            : true
      )
      .required("لطفا مقدار مورد نظر را درست وارد کنید"),
  });
  const [customAmount, setCustomAmount] = useState("");
  const [Token, setToken] = useState("");
  const [RedirectURL, setRedirectURL] = useState("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const onSubmit = (value: any) => {
    
    charchWallet.mutate(RemoveCurrencyMask(value.amount),{
      onSuccess : (val : any) => {
        const result : { token : string , returnUrl : string} = val.data.result
        const token = result.token
        const returnUrl = result.returnUrl

        setToken(token)
        setRedirectURL(returnUrl)
        setShowConfirmation(true)

      }
    });
  };

  useEffect(() => {
    if (charchWallet.isSuccess) {
      // refetchWallet();
      // toggleModal();
    }
  }, [charchWallet.isSuccess]);

  useEffect(() => {
    setCustomAmount(RemoveCurrencyMask(minimumAmount));
  }, [minimumAmount]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose
      className="modal-dialog-centered"
      backdrop={backdrop}
    >
      <ModalHeader toggle={toggleModal}>افزایش اعتبار</ModalHeader>

      <Formik
        initialValues={{ amount: customAmount }}
        enableReinitialize
        onSubmit={(value) => onSubmit(value)}
        validationSchema={validate}
      >
        {({ values, errors, touched }) => (
          <Form>
            <SweetAlertCallback
              mutation={null}
              title="ورود به درگاه بانک"
              onCancel={() => {
                setShowConfirmation(false);
              }}
              onClose={() => {
                setShowConfirmation(false);
              }}
              onConfirm={() => {
                setShowConfirmation(false);
                formRef.current && formRef.current.submit()
              }}
              show={showConfirmation}
            >
              {`پرداخت ${values.amount} ریال`}
            </SweetAlertCallback>
            <ModalBody>
              <Alert color="info" className="text-center">
                مبلغ مورد نظر را وارد کنید
              </Alert>

              <MoneyMask
                errors={errors}
                lableText="مقدار دلخواه"
                onChange={setCustomAmount}
                name="amount"
                touched={touched}
                value={customAmount}
              />
            </ModalBody>
            <ModalFooter dir="ltr">
              <Button color="danger" onClick={toggleModal} outline>
                انصراف
              </Button>
              <SubmitButton
                isLoading={charchWallet.isLoading}
                btnText="پرداخت"
                color="primary"
                values={{ amount: customAmount }}
                schema={validate}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
      <form
        action="https://sep.shaparak.ir/payment.aspx"
        ref={formRef}
        method="post"
      >
        <input value={Token} type="hidden" name="Token" />
        <input value={RedirectURL} type="hidden" name="RedirectURL" />
      </form>
    </Modal>
  );
};

export { AddMoneyModal };
