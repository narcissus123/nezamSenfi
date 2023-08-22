import React, { useContext, useState } from 'react';
import { Formik , Form } from "formik";

import { TextInput } from '../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput';
import { SubmitButton } from '../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton';
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { Col, Row } from 'reactstrap';
import { TreeCategoryValidation } from '../../../../../../core/validations/tree-category.validation';
import { useNewTreeCategory } from '../../../../../../core/services/api/base-tree-category.api';
import { showToast } from '../../../../../../core/utils';
import { ToastTypes } from '../../../../../../core/enums';
import { Toggle } from '../../../../../common/Form';


const Add: React.FC = () => {

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  
  const [initialValue, setInitialValue] = useState<{
    title: string;
    isActive: boolean;
  }>({
    title: "",
    isActive: false,
  });

  const createMutation = useNewTreeCategory()

  const onSubmit = (value : any) => {
    
    const setObj ={
      title: value.title,
      isActive: value.isActive
    }

    createMutation.mutate(setObj , {
      onSuccess: (val : any) => {
        showToast(["با موفقیت ایجاد شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.treesCategoryList = !newEvent.treesCategoryList;
        setRefetchEvent(newEvent);
      }
    })
  }
  

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={TreeCategoryValidation}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col md="4">
                    <TextInput
                      lableText="نام دسته بندی درخت"
                      name="title"
                      placeholder="نام دسته بندی درخت ..."
                      significant
                    />
                  </Col>
                  <Col md="4" style={{ marginTop: "18px" }}>
                    <Toggle
                      id="isActive"
                      name="isActive"
                      lableText="وضعیت"
                      significant
                      direction="ltr"
                      className="my-1"
                      onChange={(opt: any) => {
                        setFieldValue("isActive", opt.target.checked);
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={createMutation.isLoading}
                      initialValue={initialValue}
                      schema={TreeCategoryValidation}
                      values={values}
                    />
                  </Col>
                </Row>
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
 
export { Add }