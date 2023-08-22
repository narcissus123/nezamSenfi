import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Alert, Button, Card, CardBody, FormGroup, Spinner } from "reactstrap";
import { ToastTypes } from "../../../../../core/enums";
import { JobRequestStatus } from "../../../../../core/enums/job-request-status";
import { useServeShowFileByAdmin } from "../../../../../core/services/api";
import {
  removeItem,
  setItem,
} from "../../../../../core/services/common/storage/storage.service";
import { IsIncludes, showToast } from "../../../../../core/utils";
import { FormDivider, SubmitButton } from "../../../../common/Form";
import Repeater from "../../../../common/repeater";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { StatusWrapper } from "../../../../common/Wrapper/StatusWrapper/StatusWrapper";
import { AcceptOrRejectModal } from "./AcceptOrRejectModal";
import { UploadForm } from "./UploadForm/UploadForm";

export interface JobRequestProps {
  getRequestInquiry: any;
  updateMutation: any;
  rejectInquiry?: any;
  acceptInquiry?: any;
  redirectLink?: string;
  getFiles?: any;
  editable?: boolean;
  goToPage?: string;
  rejectRedirectLink?: string;
}

const UploadPositionRequestInquiry: React.FC<JobRequestProps> = ({
  getRequestInquiry,
  updateMutation,
  acceptInquiry,
  rejectInquiry,
  redirectLink,
  getFiles,
  editable,
  goToPage,
  rejectRedirectLink = "",
}) => {
  const [count, setCount] = useState<number>(1);
  const [inquiryList, setInquiryList] = useState<any>([]);
  const [formDatas, setFormData] = useState<any>([]);
  const [myFiles, setmyFiles] = useState<any>([]);
  const [myServerFiles, setmyServerFiles] = useState<any>([]);

  const serveFile = useServeShowFileByAdmin();

  useEffect(() => {
    if (formDatas.length > 0) {
      setItem("ItemFile", formDatas);
    }
  }, [formDatas]);

  const fillInputs = async () => {
    setmyFiles([]);
    if (getRequestInquiry.data && getRequestInquiry.data.data) {
      const result = getRequestInquiry.data.data.result;

      let inquiryList: any = [];

      result.forEach(async (item: any, index: number) => {
        inquiryList.push({
          id: index,
          value: item,
        });

        if (getFiles) {
          const result2 = await getFiles.mutateAsync(item.id);

          const files = result2.data.result;

          const localFile: File[] = [];

          for (let index = 0; index < files.length; index++) {
            const serverFileResult = await serveFile.mutateAsync(files[index]);
            const serverFile: any = serverFileResult.data;
            const fileBlob = new Blob([serverFile]);
            const fileUpload = new File(
              [fileBlob],
              "untitled." + files[index].fileName.split(".").pop()
            );
            localFile.push(fileUpload);
          }

          // const fileUpload = new File(
          //   [fileBlob],
          //   "untitled." + file.split(".").pop()
          // );

          setmyFiles((prev: any) => {
            return [...prev, { id: index, value: files }];
          });
          setmyServerFiles((prev: any) => {
            return [...prev, { id: index, value: localFile }];
          });
        }
      });

      try {
        setInquiryList(inquiryList);
        //setFormData(inquiryList);
      } catch (error) {}
    }
  };

  useEffect(() => {
    fillInputs();
  }, [getRequestInquiry.isSuccess]);

  const history = useHistory();

  const onSubmit = () => {
    const formData = new FormData();

    formDatas.forEach((item: any, index: number) => {
      formData.append(
        `Items[${index}].PositionRequestInquiryId`,
        item.value.id.toString()
      );
      if (item.value.files) {
        for (let i = 0; i < item.value.files.length; i++) {
          formData.append(`Items[${index}].Files`, item.value.files[i]);
        }
      } else if (myServerFiles.length > 0) {
        const files = myServerFiles.filter((file: any) => +file.id === +index);
        const file = files[0];
        file.value.forEach((f: File) =>
          formData.append(`Items[${index}].Files`, f)
        );
      } else {
        showToast(["لطفا فایل رزومه را انتخاب کنید"], ToastTypes.error);
        return;
      }
    });

    if (formDatas.length !== count) {
      return showToast(["لطفا تمامی ثبت موقت ها را بزنید"], ToastTypes.error);
    }
    updateMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        removeItem("ItemFile");
        if (redirectLink && editable) history.push(redirectLink);
      },
    });
  };

  const createResumesForms = () => {
    setCount(inquiryList.length > 0 ? inquiryList.length : 1);
  };

  useEffect(() => {
    createResumesForms();
  }, [inquiryList]);

  const [reject, setReject] = useState<boolean>(false);
  const [accept, setAccept] = useState<boolean>(false);

  const { id, status = "1" }: any = useParams();
  const location = useLocation();

  return (
    <>
      {getRequestInquiry.isLoading ? (
        <FallBackSpinner />
      ) : (
        <>
          <Card>
            <StatusWrapper
              curStatus={[status]}
              status={[JobRequestStatus.MatchAndModifyLetters]}
            >
              <Alert color="info">پاسخ استعلامات با موفقیت انجام شده است</Alert>
            </StatusWrapper>
            {(acceptInquiry || rejectInquiry) && (
              <>
                <AcceptOrRejectModal
                  isOpen={accept}
                  positionRequestId={id}
                  status="تایید"
                  toggleModal={() => setAccept(false)}
                  useMutation={acceptInquiry}
                  redirectLink={redirectLink}
                />
                <AcceptOrRejectModal
                  isOpen={reject}
                  positionRequestId={id}
                  status="رد"
                  toggleModal={() => setReject(false)}
                  useMutation={rejectInquiry}
                  redirectLink={rejectRedirectLink}
                />
              </>
            )}
            {editable &&
              !IsIncludes(location.pathname, "edit") &&
              +status <= 12 && (
                <Alert color="info">
                  پس از ثبت تایید نهایی و ادامه را بزنید
                </Alert>
              )}

            {editable && IsIncludes(location.pathname, "edit") && (
              <Alert color="info">پس از ثبت اصلاح استعلامات را بزنید</Alert>
            )}

            <Repeater count={count}>
              {(i: any) => (
                <section key={i}>
                  {/* <CardTitle>رزومه</CardTitle> */}
                  <FormDivider textHeader={"پاسخ استعلام"}>
                    <CardBody>
                      <UploadForm
                        inquiryList={
                          inquiryList && inquiryList[i]
                            ? inquiryList[i].value
                            : null
                        }
                        files={myFiles.filter((item: any) => +item.id === +i)}
                        serverFile={myServerFiles.filter(
                          (item: any) => +item.id === +i
                        )}
                        index={i}
                        setFormData={setFormData}
                      />
                    </CardBody>
                  </FormDivider>
                  <hr />
                </section>
              )}
            </Repeater>
          </Card>

          <div
            className={`d-flex ${
              !editable && (acceptInquiry || rejectInquiry)
                ? "justify-content-start"
                : "justify-content-center"
            }`}
          >
            {(acceptInquiry || rejectInquiry) && (
              <>
                {!IsIncludes(location.pathname, "UploadInquiry") && !editable && (
                  <FormGroup style={{ marginLeft: "10px" }}>
                    <Button
                      color="warning"
                      onClick={() => history.push(goToPage ? goToPage : "/")}
                      outline
                      className="d-flex align-items-center justify-content-center"
                    >
                      {updateMutation.isLoading && (
                        <Spinner color="white" size="sm" />
                      )}

                      <span className="ml-50">اصلاح اسناد</span>
                    </Button>
                  </FormGroup>
                )}
                {!editable && (
                  <FormGroup>
                    <SubmitButton
                      isLoading={false}
                      btnText="تایید پاسخ استعلام"
                      clearable
                      clearableTxt="رد پاسخ استعلام"
                      onClear={() => setReject(true)}
                      onClick={() => setAccept(true)}
                    />
                  </FormGroup>
                )}
              </>
            )}
            {(IsIncludes(location.pathname, "UploadInquiry") || editable) &&
              (status ? +status <= 12 : true) && (
                <FormGroup className="d-flex">
                  <Button
                    color="primary"
                    onClick={onSubmit}
                    disabled={updateMutation.isLoading}
                    className="d-flex align-items-center justify-content-center"
                  >
                    {updateMutation.isLoading && (
                      <Spinner color="white" size="sm" />
                    )}

                    <span className="ml-50">
                      {IsIncludes(location.pathname, "Edit")
                        ? "اصلاح استعلامات"
                        : "تایید نهایی و ادامه"}
                    </span>
                  </Button>
                  {IsIncludes(location.pathname, "Edit") && (
                    <Button
                      color="primary"
                      outline
                      style={{ marginRight: "10px" }}
                      onClick={() => history.goBack()}
                    >
                      بازگشت
                    </Button>
                  )}
                </FormGroup>
              )}
          </div>
        </>
      )}
    </>
  );
};

export { UploadPositionRequestInquiry };
