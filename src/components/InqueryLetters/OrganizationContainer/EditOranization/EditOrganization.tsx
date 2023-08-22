import { Form, Formik } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { ToastTypes } from '../../../../core/enums';
import { IOrganization } from '../../../../core/models';
import { usePostEditOrganization } from '../../../../core/services/api';
import { showToast } from '../../../../core/utils';
import { AddOrganizationValide } from '../../../../core/validations/organization-add.validations';
import { SubmitButton, TextArea, TextInput } from '../../../common/Form';
import { CardWrapper } from '../../../common/Wrapper/CardWrapper/CardWrapper';

export interface IProps {
  
}

 
const EditOrganization: React.FC<IProps> = ({}) => {


  const [ initialValues , setInitialValues] = useState<IOrganization>({
    id:0,
    title:"",
    description:""
  })

  const editMutation = usePostEditOrganization()
  let { id } = useParams<any>();
  
  const onSubmit = (value: any) => {
    const postOrganizationObject = {
      id: id,
      title : value.title ,
      description : value.description
    }

    editMutation.mutate(postOrganizationObject, {onSuccess : (val:any) => {
      showToast(['با موفقیت انجام شد.'] , ToastTypes.success)
    }})

  }

  return (  
    <>
        <Formik
        initialValues={initialValues}
        validationSchema={AddOrganizationValide}
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
              <CardWrapper text="ویرایش سازمان">
                <Form>
                  <Row>
                    <Col md="4">
                      <TextInput
                        lableText="عنوان سازمان"
                        name="title"
                        placeholder="عنوان سازمان"
                        significant
                      />
                    </Col>
                    <Col md="8">
                      <TextArea
                        lableText="توضیحات"
                        name="description"
                        placeholder="توضیحات"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={editMutation.isLoading}
                        schema={AddOrganizationValide}
                        values={values}
                        initialValue={initialValues}
                      />
                    </Col>
                  </Row>
                </Form>
              </CardWrapper>
            </>
          );
        }}
      </Formik>
   
    </>
  );
}
 
export {EditOrganization};