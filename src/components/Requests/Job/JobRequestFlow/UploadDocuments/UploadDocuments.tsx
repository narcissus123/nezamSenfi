import React, { useEffect, useState } from "react";
import { Delete, Plus } from "react-feather";
import { useHistory, useLocation, useParams } from "react-router";
import { Alert, Button, Card, CardBody, FormGroup, Spinner } from "reactstrap";
import { ToastTypes } from "../../../../../core/enums";
import { JobRequestStatus } from "../../../../../core/enums/job-request-status";
import {
  usePostCreateResumeInPositionRequest,
  usePostGetMyResumesInPositionRequest,
  usePostUpdateMyPositionRequest,
  useServeShowFile,
} from "../../../../../core/services/api";
import {
  getItem,
  removeItem,
  setItem,
} from "../../../../../core/services/common/storage/storage.service";
import { fullOption, IsIncludes, showToast } from "../../../../../core/utils";
import { useGlobalState } from "../../../../../core/utils/context/GlobalContext";
import { FormDivider } from "../../../../common/Form";
import Repeater from "../../../../common/repeater";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { UploadForm } from "./UploadForm/UploadForm";

export interface JobRequestProps {
  detailValues?: any;
  validate?: any;
  redirectLink?: string;
}

const UploadDocuments: React.FC<JobRequestProps> = ({
  detailValues = null,
  validate,
  redirectLink,
}) => {
  const { req_id } = useGlobalState();

  const { req_id: requestId }: any = useParams();

  const [count, setCount] = useState<number>(1);
  const [resumeList, setResumeList] = useState<any>([]);
  const [formDatas, setFormData] = useState<any>([]);
  const [myFiles, setmyFiles] = useState<any>([]);
  const [myFilesUploader, setMyFilesUploader] = useState<any>([]);

  const resumeFile = getItem("resumeFile");

  const checkUrlToRedirect = () => {
    if (IsIncludes(location.pathname, "UploadDocuments")) {
      if (IsIncludes(location.pathname, "county")) {
        history.push("/Requests/CountyJobRequest/List");
      } else if (IsIncludes(location.pathname, "province")) {
        history.push("/Requests/ProvinceJobRequest/List");
      } else if (IsIncludes(location.pathname, "union")) {
        history.push("/Requests/UnionJobRequest/List");
      } else if (IsIncludes(location.pathname, "MainLocation")) {
        history.push("/Requests/MainLocationJobRequest/List");
      }
    }
  };

  useEffect(() => {
    if (formDatas.length > 0) {
      setItem("resumeFile", formDatas);
    }
    // const resumeFileData: any = getItem("resumeFile");

    // if (resumeFileData && resumeFileData.length > 0) {
    //   setFormData(resumeFileData);
    // }
  }, [formDatas]);

  const [insuranceTypeData, setInsuraceTypeData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "فاقد بیمه" },
        { value: 2, label: "دارای بیمه" },
      ],
    },
  ]);

  const createResumeMutation = usePostCreateResumeInPositionRequest();
  const updateResumeMutation = usePostUpdateMyPositionRequest();
  const getResumeMutation = usePostGetMyResumesInPositionRequest();

  const location = useLocation();

  useEffect(() => {
    getResumeMutation.mutate({
      page: 1,
      pageSize: 50,
      positionRequestId: +requestId,
    });
  }, []);

  const serveToUploadFiles = useServeShowFile();

  const fillInputs = async () => {
    if (getResumeMutation.data && getResumeMutation.data.data) {
      const result = getResumeMutation.data.data.result.items;
      let resumeList: any = [];

      result.forEach(async (item: any, index: number) => {
        resumeList.push({
          id: index,
          value: {
            companyName: item.organizationTitle,
            startDate: item.startDate,
            finishDate: item.endDate,
            insuranceType:
              item.inSuranceStatus === true
                ? fullOption(+item.inSuranceStatus, insuranceTypeData)
                : item.inSuranceStatus === false
                ? fullOption(2, insuranceTypeData)
                : null,
            insuranceHistory: item.inSuranceDuration,
            files: item.resumeFilePaths,
            county: { value: item.countyId, label: item.countyTitle },
            province: { value: item.provinceId, label: item.provinceTitle },
            jobType: {
              value: item.positionType,
              label: item.positionTypeTilte,
            },
            serviceType: { value: item.positionId, label: item.positionTitle },
          },
        });

        if (item.resumeFilePaths && item.resumeFilePaths.length > 0) {
          item.resumeFilePaths.forEach(async (image: any) => {
            const result: any = await serveToUploadFiles.mutateAsync(
              image.fullFileName
            );
            const img: Blob = result.data;
            let data = new Blob([img]);
            const fileUpload = new File(
              [data],
              "untitled." + image.fullFileName.split(".").pop()
            );
            setmyFiles((old: any) => [...old, { id: index, value: data }]);
            setMyFilesUploader((old: any) => [
              ...old,
              { id: index, value: fileUpload },
            ]);
          });
        }
      });

      try {
        setResumeList(resumeList);
        // setFormData(resumeList);
      } catch (error) {}
    } else {
      if (resumeFile && location.pathname.includes("EditResume")) {
        const rezumeObj = JSON.parse(
          typeof resumeFile === "string" ? resumeFile : ""
        );
        try {
          setResumeList(rezumeObj);
          // setFormData(rezumeObj);
        } catch (error) {}
      }
    }
  };

  console.log(resumeList, formDatas);

  const history = useHistory();

  useEffect(() => {
    fillInputs();
  }, [getResumeMutation.isSuccess]);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("PositionRequestId", req_id[0].toString());

    formDatas.forEach((item: any, index: number) => {
      if (
        item.value.files &&
        item.value.files.length > 0 &&
        !item.value.files[0].fullFileName
      ) {
        // console.log(item.value.files);

        for (let i = 0; i < item.value.files.length; i++) {
          formData.append(`Resumes[${index}].ResumeFiles`, item.value.files[i]);
        }
      } else if (myFilesUploader.length > 0) {
        const files = myFilesUploader.filter(
          (file: any) => +file.id === +index
        );
        files.forEach((file: any) => {
          formData.append(`Resumes[${index}].ResumeFiles`, file.value);
        });
      } else {
        showToast(["لطفا فایل رزومه را انتخاب کنید"], ToastTypes.error);
        return;
      }

      const resumeObject: any = {
        OrganizationTitle: item.value.companyName,
        StartDate: item.value.startDate,
        EndDate: item.value.finishDate,
        PositionId: item.value.serviceType ? item.value.serviceType.value : 0,
        InSuranceStatus: item.value.insuranceType.value === 1 ? true : false,
        InSuranceDuration: item.value.insuranceHistory,
        PositionRequestId: parseInt(req_id[0]),
        CountyId: item.value.county ? item.value.county.value : 0,
      };

      Object.keys(resumeObject).map(function (key) {
        formData.append(`Resumes[${index}].${key}`, resumeObject[key]);
      });
    });

    if (detailValues) {
      validate
        .validate(detailValues)
        .then((val: any) => {
          formData.append("id", req_id[0].toString());
          formData.append(
            "EmploymentLicenseStatus",
            detailValues.employmentLicenseStatus.value
          );
          formData.append(
            "HistoryOfServiceAfterGraduation",
            detailValues.yearOfServices.value
          );
          // formData.append(
          //   "CertificateExaminationStatus",
          //   detailValues.certificateExaminationStatus
          // );
          // formData.append(
          //   "TradeUnionLicenseStatus",
          //   detailValues.tradeUnionLicenseStatus
          // );
          formData.append("RatingTitle", detailValues.employmentLicense);
          formData.append("RatingStatus", detailValues.rankStatus.value);

          if (formDatas.length !== count) {
            return showToast(
              ["ابتدا تمامی فرم ها را ثبت موقت کنید!"],
              ToastTypes.error
            );
          }

          updateResumeMutation.mutate(formData, {
            onSuccess: (val: any) => {
              showToast(["با موفقیت انجام شد"], "success");
              removeItem("resumeFile");
              if (redirectLink) history.push(redirectLink);
              else checkUrlToRedirect();
            },
          });
        })
        .catch((val: any) => {
          showToast(["لطفا اطلاعات را درست وارد کنید"], "error");
        });
    }

    if (!detailValues) {
      if (formDatas.length !== count) {
        return showToast(["لطفا تمامی ثبت موقت ها را بزنید"], ToastTypes.error);
      }

      createResumeMutation.mutate(formData, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد"], "success");
          removeItem("resumeFile");
          if (redirectLink) history.push(redirectLink);
          else checkUrlToRedirect();
        },
      });
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const createResumesForms = () => {
    setCount(resumeList.length > 0 ? resumeList.length : 1);
  };

  useEffect(() => {
    createResumesForms();
  }, [resumeList]);

  const deleteForm = (e: any, id: number) => {
    // console.log(id);

    e.preventDefault();
    setFormData((old: any) => old.filter((item: any) => item.id !== id));
    //setResumeList((old: any) => old.filter((item: any) => item.id !== id));
    //setmyFiles((old: any) => old.filter((item: any) => item.id !== id));
    //console.log(e.target.closest("section"));

    // e.target.closest("section").remove();
    setCount(count - 1);
  };

  const { status }: any = useParams();

  return (
    <>
      {getResumeMutation.isLoading ? (
        <FallBackSpinner />
      ) : (
        <>
          <Card>
            {(JobRequestStatus.ResumeFile === +status ||
              +status === JobRequestStatus.RejectBySecretariat) && (
              <Alert color="info">
                با زدن دکمه ثبت رزومه به صورت موقت ذخیره میشود. سپس برای ذخیره
                نهایی دکمه ارسال را لمس کنید
              </Alert>
            )}
            <Repeater count={count}>
              {(i: any) => (
                <section key={i}>
                  {/* <CardTitle>رزومه</CardTitle> */}
                  <FormDivider
                    textHeader={
                      JobRequestStatus.ResumeFile === +status ||
                      +status === JobRequestStatus.RejectBySecretariat
                        ? "بارگذاری رزومه"
                        : "رزومه"
                    }
                  >
                    <CardBody>
                      {(JobRequestStatus.ResumeFile === +status ||
                        +status === JobRequestStatus.RejectBySecretariat) && (
                        <Button
                          outline
                          className="btn-icon"
                          color="danger"
                          onClick={(e: any) => deleteForm(e, i)}
                          style={{ marginBottom: "10px" }}
                        >
                          <Delete size={14} />
                          <span className="align-middle ml-25">حذف رزومه</span>
                        </Button>
                      )}

                      <UploadForm
                        resumeList={
                          resumeList && resumeList[i]
                            ? resumeList[i].value
                            : null
                        }
                        files={null}
                        index={i}
                        serverFile={myFiles
                          .filter((item: any) => item.id === i)
                          .map((row: any) => row.value)}
                        setFormData={setFormData}
                      />
                    </CardBody>
                  </FormDivider>
                  <hr />
                </section>
              )}
            </Repeater>
            {(JobRequestStatus.ResumeFile === +status ||
              +status === JobRequestStatus.RejectBySecretariat) && (
              <FormGroup>
                <Button
                  outline
                  className="btn-icon"
                  color="primary"
                  onClick={increaseCount}
                >
                  <Plus size={14} />
                  <span className="align-middle ml-25">رزومه جدید</span>
                </Button>
              </FormGroup>
            )}
          </Card>
          {(JobRequestStatus.ResumeFile === +status ||
            +status === JobRequestStatus.RejectBySecretariat) && (
            <div className="d-flex justify-content-center">
              <FormGroup>
                <Button
                  color="primary"
                  onClick={onSubmit}
                  disabled={
                    createResumeMutation.isLoading ||
                    updateResumeMutation.isLoading
                  }
                  className="d-flex align-items-center justify-content-center"
                >
                  {(createResumeMutation.isLoading ||
                    updateResumeMutation.isLoading) && (
                    <Spinner color="white" size="sm" />
                  )}
                  <span className="ml-50">ارسال</span>
                </Button>
              </FormGroup>
            </div>
          )}
        </>
      )}
    </>
  );
};

export { UploadDocuments };
