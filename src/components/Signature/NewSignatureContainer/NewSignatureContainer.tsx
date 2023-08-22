import { Formik, Form } from "formik";
import React, {  useEffect, useState } from "react";
import { Alert, Card, CardBody, CardHeader, CardTitle, Col, Row, Spinner } from "reactstrap";
import { ToastTypes } from "../../../core/enums";
import { useGetUserSignature, useSetUserSignature } from "../../../core/services/api";
import { getAccessToken } from "../../../core/services/authentication/authentication.service";
import { showToast } from "../../../core/utils";
import { NewSignatureValidate } from "../../../core/validations/new-signature.validation";
import { DropZone, SubmitButton } from "../../common/Form";
import { ProfileDropZone } from "../../common/Form/ProfileDropZone/ProfileDropZone";


const NewSignatureContainer = () => {
  const [initialValues, setInitialValues] = useState<any>({
    File: null,
  });

  const postRequest = useSetUserSignature()

  const onSubmit = (value: any) => {
    if (!value.File || !(value.File.length > 0)) {
      return showToast(["لطفا فایلی را انتخاب کنید!"], ToastTypes.error);
    } else {
      const formData = new FormData();
      formData.append("file", value.File[0]);

      postRequest.mutate(formData, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          refetch();
        },
      });
    }
  };
  

  const [myFiles, setmyFiles] = useState<any>([]);

  const { isFetching , isSuccess , data , refetch }  = useGetUserSignature();

  console.log('----signature lsit- ---' , data);

  const serve = async (files: any, id: number) => {
    const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
    const token = getAccessToken();
    const result: any = [];
    await files.forEach(async (item: any) => {
      const result = await fetch(
        MainUrl + "/api/Upload/ServeFile?fileName=" + item,
        {
          headers: {
            Authorization: token ? "Bearer " + token : "",
          },
        }
      );

      const arrayBuffer = await result.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      
      const url = URL.createObjectURL(blob);
      setmyFiles([
        {
          id: id,
          value: { file: blob, fileUrl: url, fileName: item },
        },
      ]);
    });
  };
  

  
  useEffect(() => {
    if (data) {
      try {
        const result = data.data.result


        
        serve([result], 1);
        

      } catch (e) {}

    }
  }, [isSuccess,data,refetch]);

  console.log('my files --' , myFiles);


  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>ثبت امضاء</CardTitle>
        </CardHeader>
        <CardBody>
          <div style={{ marginBottom: "15px" }}>
            <Alert color="info" className="w-100 m-0">
              سایز عکس امضاء باید 150 در 150 پیکسل باشد.
            </Alert>
          </div>

          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={NewSignatureValidate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              getFieldProps,
              setFieldValue,
            }) => {
              console.log("---file", values.File);
              return (
                <Form>
                  <Row>
                    <Col sm="4">
                      <ProfileDropZone
                        lableText="انتخاب فایل"
                        name="File"
                        accept={
                          "image/jpeg, image/png, image/jpg, image/tif,image/tiff"
                        }
                        significant={true}
                        isSingle={true}
                      />
                    </Col>
                    <Col sm="4">
                      <p>امضای من</p>
                      {isFetching ? (
                        <>
                          <div
                            style={{
                              position: "absolute",
                              width: "36px",
                              height: "36px",
                              right: "100px",
                              top: "100px",
                            }}
                          >
                            <Spinner color="success" />
                          </div>
                        </>
                      ) : (
                        <>
                          {myFiles[0] ? (
                            <img
                              src={myFiles[0].value.fileUrl}
                              alt="عکس امضای من"
                              width="200"
                              height="200"
                            />
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <SubmitButton
                        isLoading={postRequest.isLoading}
                        schema={NewSignatureValidate}
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

export { NewSignatureContainer };
