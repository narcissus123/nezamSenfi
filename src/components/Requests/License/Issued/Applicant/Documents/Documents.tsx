import React, { FC, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Alert, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { FormDivider, SimpleSubmitButton } from "../../../../../common/Form";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { DocumentsList } from "./DocumentsList/DocumentsList";

interface IPropTypes {
  licenseDetail: any;
}

const Documents: FC<IPropTypes> = ({ licenseDetail }) => {
  const { req_id, status }: any = useParams();
  const history: any = useHistory();
  const [details, setDetails] = useState(
    history.location.state && history.location.state.detail
  );

  return (
    <>
      <FormDivider textHeader="اسناد موردنیاز جهت صدور پروانه">
        <CardBody>
          <Alert color="info">
            توجه: اصل اسناد به منظور اسکن و بارگذاری فایل در سامانه مورد نیاز
            است.
          </Alert>
          <Alert
            color="warning"
            className="d-flex justify-content-between align-items-center p-1"
          >
            <p>بارگذاری اسناد پس از ارسال به کارشناس انجام میگیرد.</p>
            <SimpleSubmitButton
              isLoading={false}
              btnText="ادامه درخواست ( اسناد مالی )"
              onCLick={() =>
                history.push(`/License/Issued/${status}/FinancialDoc/${req_id}`)
              }
            />
          </Alert>

          <Alert
            color="warning"
            className="d-flex justify-content-between align-items-center p-1 mb-3"
          >
            <p>
              حداکثر یک هفته پس از ثبت درخواست و انجام کارشناسی مدارک خواسته شده
              باید توسط متقاضی در سامانه بارگذاری شود.
            </p>
          </Alert>

          <Row>
            <Col>
              <DocumentsList  licenseDetail={licenseDetail} />
            </Col>
          </Row>
        </CardBody>
      </FormDivider>
    </>
  );
};

export { Documents };
