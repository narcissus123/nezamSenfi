import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Col,
  Modal,
  Row,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { TextArea } from "../../../../common/Form";
import { DropZone } from "../../../../common/Form";
import { UploadDocumentsValidate } from "../../../../../core/validations/upload-documents.validations";
import { usePostUploadUserDocument } from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { useAllUnUsedDocument } from "../../../../../core/services/api";
import { useUpload } from "../../../../../core/services/api";
import { LoadingModal } from "../../../../common/LoadingModal/LoadingModal";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  setRefetchFromUpload: () => void;
}

const UploadDocuments: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  setRefetchFromUpload,
}) => {
  const { data, isFetching, refetch, isSuccess } = useAllUnUsedDocument();

  const [loadingModal, setLoadingModal] = useState<any>(false);

  const uploadMutation = useUpload();

  useEffect(() => {
    if (isOpen) {
      try {
        refetch();
      } catch {}
    }
  }, [isSuccess, isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (data && data.data.result) {
        const result = data.data.result;
        let newOptions: any = [];
        data.data.result.forEach((row: any) => {
          let eachGroupItems: any = [];
          let eachGroup: any = {
            label: row.categoryTitle,
            options: [],
          };
          row.documents.forEach((doc: any) => {
            let label: string = doc.documentTitle;
            if (doc.userLicenseDocumentId) {
              label += ` با درخواست به شماره ${doc.licenseId}`;
              if (doc.sectionId) {
                label += ` و قطعه به شماره ${doc.sectionId} به مساحت ${doc.sectionArea}`;
                if (doc.cityOdVillageTitle) {
                  label += ` در ${doc.cityOdVillageTitle}`;
                }
                if (doc.farmName) {
                  label += ` در ${doc.farmName}`;
                }
              } else if (doc.cityOdVillageTitle) {
                label += ` در ${doc.cityOdVillageTitle}`;
              }
              if (doc.requirementDocumentStatusTitle) {
                label += ` (${doc.requirementDocumentStatusTitle})`;
              }
            }
            eachGroupItems.push({
              value: doc.userLicenseDocumentId
                ? doc.userLicenseDocumentId
                : doc.documentId,
              label: label,
              userLicenseDocumentId: doc.userLicenseDocumentId,
              documentId: doc.documentId,
            });
          });
          eachGroup.options = eachGroupItems;

          newOptions.push(eachGroup);
        });
        setDocumentTypeOptions(newOptions);
      }
    }
  }, [isSuccess, data]);

  const [initialValues, setInitialValues] = useState<any>({
    documentType: null,
    documentInfo: "",
    file: null,
  });

  const [documentTypeOptions, setDocumentTypeOptions] = useState<any>([]);

  const postUploadUserDocumentMutation = usePostUploadUserDocument();

  useEffect(() => {
    setInitialValues({ documentInfo: "", documentType: null, file: null });
  }, [
    postUploadUserDocumentMutation.data,
    postUploadUserDocumentMutation.isSuccess,
  ]);

  const onSubmit = (value: any) => {
    if (!value.file || !(value.file.length > 0)) {
      showToast(["لطفا فایل را انتخاب کنید!"], "error");
    } else {
      const formData = new FormData();
      for (let i = 0; i < value.file.length; i++) {
        formData.append(`Files`, value.file[i]);
      }

      setLoadingModal(true);

      console.log(value);

      const createObject: any = {
        DocumentId: !value.documentType.userLicenseDocumentId
          ? value.documentType.documentId
          : 0,
        Description: value.documentInfo,
        UserLicenseDocumentId: value.documentType.userLicenseDocumentId,
      };
      Object.keys(createObject).map(function (key, index) {
        formData.append(key, createObject[key]); //append the values with key, value pair
      });
      postUploadUserDocumentMutation.mutate(formData, {
        onSuccess: (val: any) => {
          refetch();
          showToast(["با موفقیت انجام شد"], "success");
          setLoadingModal(false);
          setRefetchFromUpload();
          toggleModal();
        },
        onError: (err: any) => {
          showToast(["مشکلی پیش آمد!"], "error");
          setLoadingModal(false);
        },
      });

      // uploadMutation.mutate(formData, {
      //   onSuccess: (data) => {
      //     if (data && data.data.result) {
      //       const result = data.data.result;

      //     }
      //   },
      //   onError: (error) => {
      //     showToast(["مشکلی پیش آمد!"], "error");
      //     Swal.close();
      //   },
      // });
    }
  };

  return (
    <>
      <LoadingModal isOpen={loadingModal}></LoadingModal>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>بارگذاری اسناد</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={UploadDocumentsValidate}
            enableReinitialize
          >
            {({ values, errors, handleChange, touched, getFieldProps }) => {
              return (
                <div>
                  <Form>
                    <Row>
                      <Col md="12" sm="12">
                        <BasicSelectOption
                          isLoading={isFetching}
                          significant={true}
                          name="documentType"
                          // handleChange={handleChange}
                          data={documentTypeOptions}
                          lableText="انواع سند"
                          placeHolder="نوع سند را انتخاب کنید ..."
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12" sm="12">
                        <TextArea
                          lableText="شرح سند"
                          name="documentInfo"
                          placeholder="شرح سند"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12" sm="12">
                        <DropZone
                          lableText="انتخاب فایل"
                          name="file"
                          significant={true}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        style={{ display: "flex", justifyContent: "center" }}
                        md="12"
                        sm="12"
                      >
                        <Button
                          type="submit"
                          color="primary"
                          onClick={() => {}}
                        >
                          ثبت
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export { UploadDocuments };
