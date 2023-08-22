import { Form, Formik } from 'formik';
import * as React from 'react';
import { useContext, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { ToastTypes } from '../../../../core/enums';
import { IOrganization } from '../../../../core/models';
import { usePostCreateOrganization } from '../../../../core/services/api';
import { showToast } from '../../../../core/utils';
import { refetchContext } from '../../../../core/utils/context/EventContext';
import { AddOrganizationValide } from '../../../../core/validations/organization-add.validations';
import { SubmitButton, TextArea, TextInput } from '../../../common/Form';

export interface IProps {
  
}

 
const AddOrganization: React.FC<IProps> = ({}) => {

  const [ initialValues , setInitialValues] = useState<IOrganization>({
    id:0,
    title:"",
    description:""
  })

  const addMutation = usePostCreateOrganization()

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  const onSubmit = (value: any) => {
    const postOrganizationObject = {
      title : value.title ,
      description : value.description
    }

    addMutation.mutate(postOrganizationObject, {onSuccess : (val:any) => {
      showToast(['با موفقیت انجام شد.'] , ToastTypes.success)
      const newEvent = {...refetchEvent}
      newEvent.organizationList = !newEvent.organizationList
      setRefetchEvent(newEvent)
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
                      isLoading={addMutation.isLoading}
                      schema={AddOrganizationValide}
                      values={values}
                      initialValue={initialValues}
                    />
                  </Col>
                </Row>{" "}
              </Form>
            </>
          );
        }}
      </Formik>
   
    </>
  );
}
 
export {AddOrganization};