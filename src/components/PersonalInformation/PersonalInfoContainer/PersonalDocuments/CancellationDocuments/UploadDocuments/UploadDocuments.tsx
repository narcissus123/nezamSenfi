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
import { useAllUnUsedDocument, usePostUploadUserDocument, useUpload } from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { LoadingModal } from "../../../../../common/LoadingModal/LoadingModal";
import { UploadDocumentsValidate } from "../../../../../../core/validations/upload-documents.validations";

import { DropZone, SubmitButton, TextArea } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { useGetMyUnUsedLicenseRequestCancellationReason, useUploadMyLicenseRequestCancellationReasonFile } from "../../../../../../core/services/api/cancelation.api";
import { UploadCancellationDocumentsValidate } from "../../../../../../core/validations/upload-cancellation-documents.validations";


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
  const { data, isFetching, refetch, isSuccess } = useGetMyUnUsedLicenseRequestCancellationReason();

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
        let newOptions: any = [];
        data.data.result.forEach((row: any) => {
          newOptions.push({
            label: `${row.resonTitle} - درخواست شماره ${row.licnseRequestId}`,
            value: row.id,
            resonId: row.resonId,
          });
        });
        setDocumentTypeOptions(newOptions);
      }
    }
  }, [isSuccess, data]);

  const [initialValues, setInitialValues] = useState<any>({
    CancellationReasonLicenseRequestId: null,
    description: "",
    file: null,
  });

  const [documentTypeOptions, setDocumentTypeOptions] = useState<any>([]);

  const postUploadUserDocumentMutation = useUploadMyLicenseRequestCancellationReasonFile();

  const onSubmit = (value: any) => {
    
    console.log('---value -- ' , value);
    if (!value.file || !(value.file.length > 0)) {
      showToast(["لطفا فایل را انتخاب کنید!"], "error");
    } else {
      const formData = new FormData();

      console.log('---value -- ' , value);
      
      for (let i = 0; i < value.file.length; i++) {
        formData.append(`Files`, value.file[i]);
      }

      setLoadingModal(true);

      console.log(value);

      const createObject: any = {
        CancellationReasonLicenseRequestId:
          value.CancellationReasonLicenseRequestId.value,
        Description: value.description,
      };
      Object.keys(createObject).map(function (key, index) {
        formData.append(key, createObject[key]);
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
          setLoadingModal(false);
        },
      });
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
            validationSchema={UploadCancellationDocumentsValidate}
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
                          name="CancellationReasonLicenseRequestId"
                          // handleChange={handleChange}
                          data={documentTypeOptions}
                          lableText="دلیل رد"
                          placeHolder="نوع سند را انتخاب کنید ..."
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12" sm="12">
                        <TextArea
                          lableText="توضیحات"
                          name="description"
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
                        <SubmitButton  isLoading={postUploadUserDocumentMutation.isLoading} btnText="ثبت" schema={UploadCancellationDocumentsValidate}/>
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
