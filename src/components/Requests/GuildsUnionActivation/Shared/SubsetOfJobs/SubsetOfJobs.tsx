import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../core/enums";
import {
  useGetUnionRequestUseTypeAndJobsDetails,
  useSetUnionRequestUseTypeAndJob,
  useShowServeUnionFileByAdmins,
} from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { UnionsSubsetOfJobsValidate } from "../../../../../core/validations/unions-subset-of-job.validations";
import {
  CheckBoxList,
  FileInput,
  MultiSelectOption,
  SubmitButton,
} from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";

interface IPropTypes {
  requestDetail: any;
  refetch: any;
}

const SubsetOfJobs: FC<IPropTypes> = ({ requestDetail, refetch }) => {
  const [useTypeOptions, setUseTypeOptions] = useState([]);

  const setUseTypes = useSetUnionRequestUseTypeAndJob();

  const [initialValues, setInitialValues] = useState<any>({
    useType: null,
    files: null,
  });

  const [checkBoxData, setCheckBoxData] = useState<any>([]);

  const [useTypeValue, setUseTypeValue] = useState<any>(null);

  const { req_id }: any = useParams();
  const getSubsetJobs = useGetUnionRequestUseTypeAndJobsDetails(+req_id);
  const serveUnionFile = useShowServeUnionFileByAdmins();
  const [fileServer, setFileServer] = useState<Blob[]>([]);
  const [fileServerName, setFileServerName] = useState<File[]>([]);

  const history = useHistory();

  useEffect(() => {
    const loadData = async () => {
      if (requestDetail) {
        const files = requestDetail.useTypeFiles;
        const filesObj: any = [];
        if (files) {
          await files.forEach(async (file: any) => {
            filesObj.push({
              fileName: file,
              guildRoomRequestId: requestDetail.id,
              isUnion: true,
            });
            const result: any = await serveUnionFile.mutateAsync({
              fileName: file,
              guildRoomRequestId: requestDetail.id,
            });

            try {
              const fileBlob = new Blob([result.data]);
              const fileUpload = new File(
                [fileBlob],
                "untitled." + file.split(".").pop()
              );

              setFileServer((old: Blob[]) => [...old, fileBlob]);
              setFileServerName((old: File[]) => [...old, fileUpload]);
            } catch (error) {}
          });
          setInitialValues((old: any) => ({
            ...old,
            files: filesObj,
          }));
        }
      }
    };

    loadData();
  }, [requestDetail]);

  useEffect(() => {
    if (getSubsetJobs.isSuccess) {
      const result = getSubsetJobs.data.data.result.useTypes;
      console.log(result);
      const checkBoxList: any = [];
      const useTypeList: any = [];
      const selectedJobs: any = [];
      result.forEach((item: any) => {
        useTypeList.push({ value: item.useTypeId, label: item.useTypeTitle });
        if (item.isSelectedUseType)
          selectedJobs.push({
            value: item.useTypeId,
            label: item.useTypeTitle,
          });
        const sampleUseType: any = {
          isActive: item.isSelectedUseType,
          groupId: item.useTypeId,
          label: item.useTypeTitle,
          options: [],
        };
        item.jobs.forEach((job: any, index: any) => {
          sampleUseType.options.push({
            value: job.jobId,
            id: job.jobId,
            label: job.jobTitle,
            checked: job.isSelectedJob,
            isDisabled: job.isSelectedJob && requestDetail.status === 10,
          });
        });
        sampleUseType.options.push({
          label: "",
          value: 0,
          id: 0,
          checked: false,
          isAll: true,
        });
        checkBoxList.push(sampleUseType);
      });
      setUseTypeOptions(useTypeList);
      setCheckBoxData(checkBoxList);
      setInitialValues((old: any) => ({ ...old, useType: selectedJobs }));
    }
  }, [getSubsetJobs.isSuccess]);

  const handleOnChange = (e: any, setFieldValue: any) => {
    setFieldValue("useType", e);
    setUseTypeValue(e);
  };

  const onSubmit = (values: any) => {
    if (!values.files || values.files.length === 0) {
      return showToast(
        ["لطفا اسناد مورد نظر را انتخاب کنید"],
        ToastTypes.error
      );
    }
    const formData = new FormData();

    formData.append("Id", req_id);

    if (values.files && !values.files[0].fileName)
      values.files.forEach((file: File) => {
        formData.append(`Files`, file);
      });
    else if (fileServerName.length > 0)
      fileServerName.forEach((img: File) => {
        formData.append("Files", img);
      });

    let counter = 0;
    checkBoxData.forEach((item: any, index: number) => {
      const checkSelected = item.options.some(({ checked }: any) => checked);

      if (checkSelected) {
        formData.append(`UseTypes[${counter}].UseTypeId`, item.groupId);
        item.options.forEach((opt: any) => {
          if (opt.checked && opt.id !== 0)
            formData.append(`UseTypes[${counter}].Jobs`, opt.value);
        });
        counter += 1;
      }
    });

    setUseTypes.mutate(formData, {
      onSuccess: () => {
        showToast(["با موفقیت ثبت شد"], ToastTypes.success);
        refetch.mutate(req_id);
        if (requestDetail.status === 3)
          history.push("/UnionsActivation/Union/4/SubsetOfJobs/" + req_id);
      },
    });
  };

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
            {({ values, setFieldValue }) => {
              return (
                <>
                  {refetch.isLoading ? (
                    <FallBackSpinner />
                  ) : (
                    <Form>
                      <Row>
                        <Col md="4">
                          <Row>
                            <Col>
                              <MultiSelectOption
                                labelText="نوع کاربری"
                                name="useType"
                                isLoading={getSubsetJobs.isLoading}
                                placeHolder="انتخاب کنید..."
                                significant={false}
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
                                outLine
                                fileServer={fileServer}
                                isServerFile={true}
                                accept="image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
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
                            isLoading={setUseTypes.isLoading}
                            schema={UnionsSubsetOfJobsValidate}
                            values={values}
                            initialValue={initialValues}
                          />
                        </Col>
                      </Row>
                    </Form>
                  )}
                </>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { SubsetOfJobs };
