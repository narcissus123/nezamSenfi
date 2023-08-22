import React, { useContext, useState } from 'react';
import { Formik , Form } from "formik";

import { TextInput } from '../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput';
import { SubmitButton } from '../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton';
import { refetchContext } from '../../../../../../core/utils/context/EventContext';
import { useCreateFacilityBuildings } from '../../../../../../core/services/api/parts-and-facilities.api';
import { Col, Row } from 'reactstrap';
import BasicSelectOption from '../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { OptionRow, OptionRowSel } from '../../../../../../core/models';
import { NewTreeValidation } from '../../../../../../core/validations/new-tree.validation';
import { useGetAllTreeCategory } from '../../../../../../core/services/api/base-tree-category.api';
import { Toggle } from '../../../../../common/Form';
import { useNewTree } from '../../../../../../core/services/api/base-tree.api';
import { showToast } from '../../../../../../core/utils';
import { ToastTypes } from '../../../../../../core/enums';

const Add: React.FC = () => {

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  
  const [initialValue, setInitialValue] = useState<{
    title: string;
    baseTreeCategoryId: OptionRow | null;
    isActive: boolean;
  }>({
    title: "",
    baseTreeCategoryId: null,
    isActive: false,
  });

  const createMutation = useNewTree()

  const { isFetching, data } = useGetAllTreeCategory();

  const onSubmit = (value : any) => {
    const setObj = {
      title: value.title,
      isActive: value.isActive,
      baseTreeCategoryId: value.baseTreeCategoryId.value,
    };

    createMutation.mutate(setObj , {
      onSuccess: (val : any) => {
        showToast(["با موفقیت ایجاد شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.treeList = !newEvent.treeList;
        setRefetchEvent(newEvent);
      }
    })


  }
  const [categoryData, setCategoryData] = useState<OptionRowSel[]>([]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={NewTreeValidation}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col md="4">
                    <BasicSelectOption
                      lableText="عنوان دسته بندی درخت"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="baseTreeCategoryId"
                      data={
                        data?.data.result
                          ? data?.data.result.map((item: OptionRow) => ({
                              value: item.id,
                              label: item.title,
                            }))
                          : []
                      }
                      isLoading={isFetching}
                    />
                  </Col>
                  <Col md="4">
                    <TextInput
                      lableText="عنوان درخت"
                      name="title"
                      placeholder="عنوان درخت ..."
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
                      schema={NewTreeValidation}
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