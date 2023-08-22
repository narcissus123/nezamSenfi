import React, { useEffect, useState } from "react";
import { Button, Row, Col, Spinner } from "reactstrap";
import { SimpleSubmitButton, TextInput } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";


export interface IPropsProps {
  getMutation:any
  setFieldValue : any

}

const ListFilter: React.FC<IPropsProps> = ({
  getMutation,
  setFieldValue,
}) => {



  const [operatorData, setOperatorData] = useState<any>([
    { value: 1, label: "مساوی" },
    { value: 2, label: "بزرگتر" },
    { value: 3, label: "کوچک تر" },
    { value: 4, label: "مابین" },
  ]);
  const [typeData, setTypeData] = useState<any>([
    {value : 1, label : "هزینه آب" },
    {value : 2, label : "هزینه برق سالیانه" },
    {value : 3, label : "هزینه گازشهری" },
    {value : 4, label : "هزینه کود" },
    {value : 5, label : "هزینه سم" },
    {value : 6, label : "هزینه تعمیرات" },
    {value : 7, label : "هزینه لاستیک" },
  ]);

  return (
    <>
      <Row className="d-flex align-items-start">
        <Col sm="4">
          <TextInput
            name="from1"
            placeholder="عدد وارد کنید ..."
            lableText="قیمت - از (ریال)"
          />
        </Col>
        <Col sm="4">
          <TextInput
            name="from2"
            placeholder="عدد وارد کنید ..."
            lableText="قیمت - تا (ریال)"
          />
        </Col>
        <Col sm="4">
          <BasicSelectOption
            isLoading={false}
            name="oprator"
            placeHolder="انتخاب کنید ..."
            data={operatorData}
            lableText="حالات قیمت ها "
          />
        </Col>
        <Col sm="4">
          <BasicSelectOption
            isLoading={false}
            name="type"
            placeHolder="انتخاب کنید ..."
            data={typeData}
            lableText="قسمت مورد استفاده"
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingTop: "23px" }} lg="1">
          <SimpleSubmitButton
            isLoading={getMutation.isLoading}
            btnText="جستجو"
          />
        </Col>
      </Row>
    </>
  );
};

export { ListFilter };
