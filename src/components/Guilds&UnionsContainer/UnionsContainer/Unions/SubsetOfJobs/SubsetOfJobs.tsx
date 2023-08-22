import { Formik , Form } from "formik";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useAllUseTypes } from "../../../../../core/services/api";

import { UnionsSubsetOfJobsValidate } from "../../../../../core/validations/unions-subset-of-job.validations";
import { CheckBoxList } from "../../../../common/Form";
import { FileInput } from "../../../../common/Form";
import { MultiSelectOption } from "../../../../common/Form";
import { SubmitButton } from "../../../../common/Form";


const SubsetOfJobs = () => {
  const [useTypeOptions , setUseTypeOptions] = useState<any>([

  ]);

  const [initialValues, setInitialValues] = useState<any>({
    useType: null,
    files: null,
  });

  const [checkBoxData, setCheckBoxData] = useState<any>([
    {
      groupId: 1,
      isActive: false,
      label: "زراعت",
      options: [
        { label: "شغل 1", value: 1, id: 1, checked: true },
        { label: "شغل 2", value: 2, id: 2, checked: true },
        { label: "شغل 3", value: 3, id: 3, checked: false },
        { label: "شغل 4", value: 4, id: 4, checked: true },
        { label: "شغل 2", value: 5, id: 5, checked: true },
        { label: "شغل 3", value: 6, id: 6, checked: false },
        { label: "شغل 4", value: 7, id: 7, checked: true },
        { label: "", value: 5, id: 8, checked: false, isAll: true },
      ],
    },
    {
      groupId: 2,
      isActive: false,
      label: "طیور",
      options: [
        { label: "شغل 1", value: 5, id: 1, checked: false },
        { label: "شغل 2", value: 6, id: 2, checked: true },
        { label: "شغل 3", value: 7, id: 3, checked: false },
        { label: "شغل 4", value: 8, id: 4, checked: true },
        { label: "", value: 9, id: 5, checked: false, isAll: true },
      ],
    },
  ]);

  const [useTypeValue, setUseTypeValue] = useState<any>(null);

  const { data : useTypesData , isFetching : useTypesIsFetching , isSuccess : useTypesIsSuccess } = useAllUseTypes()

  useEffect(() => {
    if ( useTypesData && useTypesData.data) {
      const result = useTypesData.data.result;

      console.log('---usetypedata----', useTypesData);
      

      let pro: any = [];
      result.forEach((useType: any) => {
        pro.push({
          value: useType.id,
          label: useType.title,
          code: useType.code,
          identityCode: useType.identityCode,
          viewOrder: useType.viewOrder,
        });
      });
      setUseTypeOptions(pro);
    }
  }, [useTypesIsSuccess]);

  const handleOnChange = (e: any, setFieldValue: any) => {
    setFieldValue("useType", e);
    setUseTypeValue(e);
  };

  const onSubmit = () => {};

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>مشاغل زیرمجموعه</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={UnionsSubsetOfJobsValidate}
            onSubmit={onSubmit}
          >
            {({
              values,
              setFieldValue,
            }) => {
              

              return (
                <Form>
                  <Row>
                    <Col md="4">
                      <Row>
                        <Col>
                          <MultiSelectOption
                            labelText="نوع کاربری"
                            name="useType"
                            placeHolder="انتخاب کنید..."
                            significant={false}
                            isLoading={useTypesIsFetching}
                            value={useTypeValue}
                            options={useTypeOptions}
                            onChange={(e) => {
                              handleOnChange(e, setFieldValue);
                              let newData = [...checkBoxData];
                              newData.forEach((group) => {
                                group.isActive = false;
                              });
                              if (e) {
                                e.forEach((val: any) => {
                                  let group = newData.find(
                                    (g) => g.groupId === val.value
                                  );
                                  if (group) {
                                    group.isActive = true;
                                  }
                                });
                              }
                              setCheckBoxData(newData);
                            }}
                            hasLabel={true}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <CheckBoxList
                            data={checkBoxData}
                            setCheckBoxData={setCheckBoxData}
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col md="6">
                      <Row>
                        <Col>
                          <FileInput
                            files={values.files}
                            setFieldValue={(val: any) =>
                              setFieldValue("files", val)
                            }
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={false}
                        schema={UnionsSubsetOfJobsValidate}
                        values={values}
                        initialValue={initialValues}
                      />
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { SubsetOfJobs };
