import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useGetUnionRequestUseTypeAndJobsDetails, useGetUnionRequestUseTypeAndJobsDetailsWithMutation, useShowServeUnionFileByAdmins } from "../../../../../../core/services/api";
import { UnionsSubsetOfJobsValidate } from "../../../../../../core/validations/unions-subset-of-job.validations";
import { CheckBoxList, FileInput, MultiSelectOption } from "../../../../../common/Form";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";


interface IPropTypes {
  requestDetail: any;
  refetch:any
}

const SubsetOfJobs: FC<IPropTypes> = ({ requestDetail, refetch }) => {
  const [useTypeOptions, setUseTypeOptions] = useState([]);


  const [initialValues, setInitialValues] = useState<any>({
    useType: null,
    files: null,
  });

  const [checkBoxData, setCheckBoxData] = useState<any>([]);

  const [useTypeValue, setUseTypeValue] = useState<any>(null);

  const { id }: any = useParams();
  


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
              guildRoomRequestId: requestDetail.guildRoomRequestId,
              isUnion: true,
            });
            const result: any = await serveUnionFile.mutateAsync({
              fileName: file,
              guildRoomRequestId: requestDetail.guildRoomRequestId,
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


  useEffect(()=>{
    if(requestDetail && requestDetail.useTypesAndJobs) {
          const result = requestDetail.useTypesAndJobs;
          console.log(result);
          const checkBoxList: any = [];
          const useTypeList: any = [];
          const selectedJobs: any = [];
          result.forEach((item: any) => {
            useTypeList.push({
              value: item.useTypeId,
              label: item.useTypeTitle,
            });

            selectedJobs.push({
              value: item.useTypeId,
              label: item.useTypeTitle,
            });

            const sampleUseType: any = {
              isActive: true,
              groupId: item.useTypeId,
              label: item.useTypeTitle,
              options: [],
            };
            item.jobs.forEach((job: any, index: any) => {
              sampleUseType.options.push({
                value: job.jobId,
                id: job.jobId,
                label: job.jobTitle,
                checked: true,
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
  },[requestDetail])

  const handleOnChange = (e: any, setFieldValue: any) => {
    setFieldValue("useType", e);
    setUseTypeValue(e);
  };

  const onSubmit = (values: any) => {

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
                                isDisabled={true}
                                name="useType"
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
                                disabled={true}
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
