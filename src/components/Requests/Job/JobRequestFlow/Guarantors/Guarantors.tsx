import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { CurrencyMask } from "../../../../../core/utils";
import { TextArea, TextInput } from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";

interface IPropTypes {
  useGetGuarantors: any;
}

const Guarantors: FC<IPropTypes> = ({ useGetGuarantors }) => {
  const [initialValues, setInitialValues] = useState<any>(null);
  const { req_id } = useParams<{ req_id: string }>();

  const getGuarantors = useGetGuarantors(req_id);

  useEffect(() => {
    if (getGuarantors.isSuccess) {
      try {
        setInitialValues(getGuarantors.data.data.result);
      } catch (error) {}
    }
  }, [getGuarantors.isSuccess]);

  return (
    <Row>
      {getGuarantors.isLoading ? (
        <FallBackSpinner setHeight={300} />
      ) : (
        <>
          <Col md="6">
            <Row>
              <Col>
                <TextInput
                  placeholder="نوع تضمین"
                  name="guaranteeTypeTitle"
                  disabled={true}
                  value={initialValues && initialValues.guaranteeTypeTitle}
                  lableText="نوع تضمین"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextInput
                  value={initialValues && initialValues.guarantorCount + " نفر"}
                  lableText="تعداد ضامن"
                  name="guarantorCount"
                  placeholder="تعداد ضامن"
                  disabled={true}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextArea
                  placeholder="توضیحات ضمانت"
                  name="guaranteeDescription"
                  lableText="توضیحات ضمانت"
                  disabled={true}
                  value={initialValues && initialValues.guaranteeDescription}
                />
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <Row>
              <Col>
                <TextInput
                  disabled
                  lableText="مبلغ"
                  name="guaranteeAmount"
                  placeholder="مبلغ"
                  value={
                    initialValues &&
                    CurrencyMask(initialValues.guaranteeAmount) + " ریال"
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextInput
                  disabled
                  lableText="تاریخ حضور"
                  name="invitationDate"
                  placeholder="تاریخ حضور"
                  value={initialValues && initialValues.invitationDate}
                />
              </Col>
            </Row>
          </Col>
        </>
      )}
    </Row>
  );
};

export { Guarantors };
