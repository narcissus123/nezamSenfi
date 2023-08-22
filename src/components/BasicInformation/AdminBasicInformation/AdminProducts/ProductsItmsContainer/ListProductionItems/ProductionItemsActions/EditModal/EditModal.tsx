import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader, Alert } from "reactstrap";
import {
  DropZone,
  SubmitButton,
  TextArea,
  TextInput,
} from "../../../../../../../common/Form";
import {
  useEditJobFigure,
  useGetAllProductUnitId,
} from "../../../../../../../../core/services/api/job.api";
import { fullOption, showToast } from "../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../core/enums";
import { refetchContext } from "../../../../../../../../core/utils/context/EventContext";
import { TypeOfDependenceEnum } from "../../../../../../../../core/enums/type-of-dependence.enums";

import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { addProductItemEditValidation } from "../../../../../../../../core/validations/product-items-edit.validation";
import { getAccessToken } from "../../../../../../../../core/services/authentication/authentication.service";
import { CarouselSlider } from "../../../../../../../common/CarouselSlider/CarouselSlider";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  currentId: number;
  data: any;
}

const EditModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  currentId,
  data,
}) => {
  const editMutation = useEditJobFigure();

  const [initialValue, setInitialValues] = useState<any>({
    itemName: "",
    code: "",
    order: "",
    periodProduct: null,
    file: null,
  });

  const [unitData, setUnitData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [periodProductData, setPeriodProductData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "1 ماه" },
        { value: 2, label: "45 روز" },
        { value: 3, label: "2 ماهه" },
        { value: 4, label: "3 ماهه" },
        { value: 5, label: "4 ماهه" },
        { value: 6, label: "5 ماهه" },
        { value: 7, label: " 6 ماهه" },
        { value: 8, label: "7 ماهه" },
        { value: 9, label: "8 ماهه" },
        { value: 10, label: "9 ماهه" },
        { value: 11, label: "10 ماهه" },
        { value: 12, label: "11 ماهه" },
        { value: 13, label: "1 سال" },
        { value: 14, label: "2 ساله" },
        { value: 15, label: "3 ساله" },
        { value: 16, label: "4 ساله" },
        { value: 17, label: "5 ساله" },
        { value: 18, label: " 6 ساله" },
        { value: 19, label: "7 ساله" },
        { value: 20, label: "8 ساله" },
        { value: 21, label: "9 ساله" },
        { value: 22, label: "10 ساله" },
        { value: 23, label: "11 ساله" },
        { value: 24, label: "12 ساله" },
        { value: 25, label: "13 ساله" },
        { value: 26, label: "14 ساله" },
        { value: 27, label: "15 ساله" },
      ],
    },
  ]);

  const [imageUrl, setImageUrl] = useState<any>([]);
  const [imageSliderUrls, setImageSliderUrls] = useState<any>([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (data.images.length > 0) {
      serve(data.images);
    }
  }, [data.images, currentId, isOpen]);

  const serve = async (files: any) => {
    const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
    const token = getAccessToken();

    await files.forEach(async (item: any) => {
      const result = await fetch(
        MainUrl + "​/api/Upload/ServePublicPicture?fileName=" + item,
        {
          headers: {
            Authorization: token ? "Bearer " + token : "",
          },
        }
      );
      if (result.status === 200 || result.ok) {
        const arrayBuffer = await result.arrayBuffer();
        const blob = new Blob([arrayBuffer]);

        const url = URL.createObjectURL(blob);

        setImageUrl((prev: any) => [...prev, { url: url, blob: blob }]);
        setImageSliderUrls((prev: any) => [...prev, url]);
      }
    });


  };

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const {
    data: productionUnitData,
    isFetching: productionUnitIsFetching,
    isSuccess: productionUnitIsSuccess,
  } = useGetAllProductUnitId();

  useEffect(() => {
    if (productionUnitData && productionUnitData.data) {
      const result = productionUnitData.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((unit: any) => {
        pro[0].options.push({
          value: unit.id,
          label: unit.title,
        });
      });
      setUnitData(pro);
    }
  }, [productionUnitIsSuccess]);

  useEffect(() => {
    if (currentId) {
      setInitialValues({
        itemName: data.title,
        // itemCode: data.code,
        order: data.viewOrder,
        periodProduct: { value: data.productionCycle, label: "" },
        describe: data.description,
      });
    }
  }, [currentId, isOpen]);

  useEffect(() => {
    if (currentId && imageUrl) {
      setInitialValues({
        itemName: data.title,
        code: data.code,
        order: data.viewOrder,
        periodProduct: { value: data.productionCycle, label: "" },
        describe: data.description,
        file: imageUrl.url,
      });
    }
  }, [imageUrl]);

  const onSubmit = (values: any) => {
     if (imageUrl.length < 1 && (!values.file || !(values.file.length > 0))) {
       showToast(["لطفا فایل را انتخاب کنید!"], ToastTypes.error);
       return;
     }

    const formData = new FormData();
    if (imageUrl.length > 0) {
      for (let file of imageUrl) {
        formData.append(`Files`, file.blob);
      }
    } else {
      for (let file of values.file) {
        formData.append(`Files`, file);
      }
    }

    formData.append(`Id`, data.id);
    formData.append(`Title`, values.itemName);
    formData.append(`Code`, values.code);
    formData.append(`Description`, values.describe);
    formData.append(`ProductionCycle`, values.periodProduct.value);

    editMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.productionFigureList = !newEvent.productionFigureList;
        setRefetchEvent(newEvent);
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>ویرایش</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={addProductItemEditValidation}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="12">
                        <TextInput
                          lableText="نام رقم "
                          name="itemName"
                          placeholder="نام"
                          significant
                        />
                      </Col>
                      <Col md="12">
                        <TextInput
                          lableText="کد رقم"
                          name="code"
                          placeholder="کد رقم"
                          significant
                        />
                      </Col>


                      <Col md="12">
                        <BasicSelectOption
                          lableText="دوره تولید"
                          significant={true}
                          placeHolder="انتخاب کنید..."
                          name="periodProduct"
                          data={periodProductData}
                          isLoading={false}
                        />
                      </Col>
                      <Col md="12">
                        <TextArea
                          lableText="توضیحات"
                          name="describe"
                          placeholder="توضیحات"
                          significant
                        />
                      </Col>
                      <Col md="12">
                        <hr />
                        <Alert
                          color="info"
                          className="w-100 m-0 text-center"
                          style={{
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          }}
                        >
                          تصاویر رقم
                        </Alert>

                        <CarouselSlider images={imageSliderUrls} />
                        <hr />
                      </Col>
                      <Col md="12">
                        <DropZone
                          lableText="انتخاب فایل"
                          name="file"
                          significant={true}
                          removeServedFiles={() => {
                            setImageUrl([]);
                          }}
                        />
                      </Col>
                    </Row>

                    <SubmitButton
                      isLoading={editMutation.isLoading}
                      initialValue={initialValue}
                      schema={addProductItemEditValidation}
                      values={values}
                      isDisabled={false}
                    />
                  </>
                </Form>
              );
            }}
          </Formik>{" "}
        </ModalBody>
      </Modal>
    </>
  );
};

export { EditModal };
