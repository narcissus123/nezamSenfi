import { Formik, Form } from "formik";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import {  UseQueryResult } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { IdentityChangeStatusEnum } from "../../../../../../core/enums/identity-change-status.enum";
import { useReadyAfterUploadDocument } from "../../../../../../core/services/api/change-user-identity-request.api";
import { showToast } from "../../../../../../core/utils";
import { SubmitButton } from "../../../../../common/Form";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { RequestDetail } from "./RequestDetail/RequestDetail";

interface IPropTypes {
  userType : "legal" | "real"
  getQuery: any
}
const Details: FC<IPropTypes> = ({userType, getQuery}) => {

  const [requestInfo, setRequestInfo] = useState<any>(null);


  const continueMutation = useReadyAfterUploadDocument()
  const { id } = useParams<any>();
  const { isSuccess, data, isFetching } = getQuery(+id);
  const history = useHistory();
  
  useEffect(() => {
    if (data && data.data.result)
      try {
        const result = data.data.result;
        setRequestInfo(result);
      } catch (err) {
        console.log("errr", err);
      }
  }, [isSuccess]);

  return (
    <>
      {isFetching && requestInfo ? (
        <FallBackSpinner />
      ) : (
        <>
          <Row>
            <Col>
              <RequestDetail requestInfo={requestInfo} />
            </Col>
          </Row>

          {requestInfo &&
            (requestInfo.status ===
              IdentityChangeStatusEnum.WatingForUploadDocunet ||
              requestInfo.status ===
                IdentityChangeStatusEnum.WatingForUploadDocunet) && (
              <>
                <Row style={{ marginTop: "20px" }}>
                  <Col>
                    <Alert color="info" className="w-100 m-0 text-center">
                      بعد از بارگذاری مدارک هویتی جدید روی دکمه ثبت کلیک کنید.
                    </Alert>
                  </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                  <Col>
                    <SubmitButton
                      type="button"
                      isLoading={false}
                      btnText="بارگذاری مدارک جدید هویتی"
                      clearable
                      clearableTxt="ثبت و ادامه درخواست"
                      isClearableLoading={continueMutation.isLoading}
                      clearableDisable={false}
                      onClear={() => {
                        continueMutation.mutate(+id, {
                          onSuccess: (val: any) => {
                            showToast(
                              ["با موفقیت انجام شد."],
                              ToastTypes.success
                            );
                            history.push("/ChangePersonalInfo/List");
                          },
                        });
                      }}
                      onClick={() => {
                        history.push("/PersonalInfo/PersonalDocuments");
                      }}
                    />
                  </Col>
                </Row>
              </>
            )}
        </>
      )}
    </>
  );
};

export { Details };
