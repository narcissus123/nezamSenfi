import { Formik } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { IInquery } from '../../../../core/models';
import { AddInqueryValidate } from '../../../../core/validations/inquery-add.validations';
import { SubmitButton, TextArea, TextInput } from '../../../common/Form';
import BasicSelectOption from '../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { CardWrapper } from '../../../common/Wrapper/CardWrapper/CardWrapper';

export interface IProps {
  
}

 
const EditInquery: React.FC<IProps> = ({}) => {


  const [ initialValues , setInitialValues] = useState<IInquery>({
    inqueryTitle:"",
    description:"",
    defaultLetterContent: "",
    defaultLetterTitle : "" ,
    organizationId : null ,
  })

  const onSubmit = (value: any) => {
    const postInqueryObject = {
      inqueryTitle : value.inqueryTitle ,
      description : value.description,
      defaultLetterContent : value.defaultLetterContent,
      defaultLetterTitle : value.defaultLetterTitle,
      organizationId : value.organizationId ? value.organizationId.value : 0
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={AddInqueryValidate}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldTouched,
          setFieldValue,
        }) => {
          return (
            <>
              <CardWrapper text="ویرایش استعلام">
                <Row>
                  <Col md="4">
                    <TextInput
                      lableText="موضوع استعلام"
                      name="inqueryTitle"
                      placeholder="موضوع استعلام"
                      significant
                    />
                  </Col>
                  <Col md="5">
                    <TextInput
                      lableText="موضوع پیشفرض نامه"
                      name="defaultLetterTitle"
                      placeholder="موضوع"
                      significant
                    />
                  </Col>
                  <Col md="3">
                    <BasicSelectOption
                      lableText="نام سازمان"
                      name="organizationId"
                      placeHolder="انتخاب نام سازمان "
                      data={[]}
                      isLoading={false}
                      significant
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <TextArea
                      lableText="توضیحات"
                      name="description"
                      placeholder="توضیحات"
                    />
                  </Col>
                  <Col md="6">
                    <TextArea
                      lableText="محتوای پیشفرض نامه"
                      name="defaultLetterContent"
                      placeholder="محتوا"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={false}
                      schema={AddInqueryValidate}
                      values={values}
                      initialValue={initialValues}
                    />
                  </Col>
                </Row>
              </CardWrapper>
            </>
          );
        }}
      </Formik>
    </>
  );
}
 
export {EditInquery};