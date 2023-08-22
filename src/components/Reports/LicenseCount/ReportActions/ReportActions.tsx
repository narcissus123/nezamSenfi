import React, { FC, Fragment, Ref } from "react";
import { Alert, Col, Row } from "reactstrap";
import {  SubmitButton } from "../../../common/Form";
import { useReactToPrint } from 'react-to-print'

export interface ICountReport {
  counts: {
    issuedCount: number;
    extendedCount: number;
    changedCount: number;
    finishedCount: number;
  };
  jobId: number;
  jobTitle: string;
}

interface IPropTypes {
  data: ICountReport[];
  componentRef: any
}

const ReportActions: FC<IPropTypes> = ({ data , componentRef }) => {

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  return (
    <Fragment>
      <Row>
        <Col>
          {data.length > 0 ? (
            <>
              <SubmitButton
                isLoading={false}
                btnText="چاپ"
                onClick={handlePrint}
                clearable
                clearableTxt="ذخیره به عنوان PDF"
              />
            </>
          ) : (
            <>
              <Alert color="danger"> داده ای وجود ندارد! </Alert>
            </>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export { ReportActions };

