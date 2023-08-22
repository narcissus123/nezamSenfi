import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Spinner,
} from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { showToast } from "../../../../../../../core/utils";
import { FormDivider } from "../../../../../../common/Form/FormDivider/FormDivider";
import Repeater from "../../../../../../common/repeater";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { NoticeLettersForm } from "./NoticeLettersForm/NoticeLettersForm";

interface IPropTypes {
  getRequestInquiries?: any;
  useMutate: any;
  sendUrl: string;
  useFinalMutate: any;
}

const NoticeLetters: FC<IPropTypes> = ({
  getRequestInquiries,
  useMutate,
  useFinalMutate,
  sendUrl,
}) => {
  const [count, setCount] = useState<number>(0);
  const [inquiriesLetter, setInquiriesLetter] = useState<any>([]);

  useEffect(() => {
    if (
      getRequestInquiries &&
      getRequestInquiries.data &&
      getRequestInquiries.data.data
    ) {
      try {
        const result = getRequestInquiries.data.data.result;
        setInquiriesLetter(result);

        setCount(result.length);
      } catch (error) {}
    }
  }, [getRequestInquiries && getRequestInquiries.isSuccess]);

  const { id }: any = useParams();
  const history = useHistory();

  const onFinalSubmit = () => {
    useFinalMutate.mutate(id, {
      onSuccess: () => {
        showToast(["با موفقیت تایید شد"], ToastTypes.success);
        history.push(sendUrl);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>اعلان نامه ها</CardTitle>
      </CardHeader>
      {getRequestInquiries && getRequestInquiries.isLoading ? (
        <FallBackSpinner />
      ) : (
        <CardBody>
          {!inquiriesLetter.some((item: any) => !item.creditStartDate) && (
            <Alert color="info">
              ثبت اعلان نامه ها انجام گردید.در صورت نبود تغییرات، ثبت نهایی را
              بزنید
            </Alert>
          )}
          <Repeater count={count}>
            {(i: any) => (
              <section key={i}>
                <FormDivider textHeader="ثبت اعلان">
                  <NoticeLettersForm
                    formData={inquiriesLetter[i]}
                    useMutate={useMutate}
                    setInquiriesLetter={setInquiriesLetter}
                  />
                </FormDivider>
                <hr />
              </section>
            )}
          </Repeater>
          {count > 0 && (
            <div className="d-flex justify-content-center">
              <FormGroup>
                <Button
                  disabled={
                    inquiriesLetter.some(
                      (item: any) => !item.creditStartDate
                    ) || useFinalMutate.isLoading
                  }
                  color="primary"
                  onClick={onFinalSubmit}
                  className="d-flex align-items-center justify-content-center"
                >
                  {useFinalMutate && useFinalMutate.isLoading && (
                    <Spinner color="white" size="sm" />
                  )}
                  <span className="ml-50">ثبت نهایی</span>
                </Button>
              </FormGroup>
            </div>
          )}
          {count === 0 && (
            <Alert color="info">اعلان نامه ها با موفقیت تکمیل شد</Alert>
          )}
        </CardBody>
      )}
    </Card>
  );
};

export { NoticeLetters };
