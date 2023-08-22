import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import { TypeOfDependenceEnum } from "../../../../../../../../core/enums/type-of-dependence.enums";
import { OptionRow } from "../../../../../../../../core/models";
import {
  useEditJobProduct,
  useGetAllProductCategory,
  useGetAllProductUnitId,
  useGetMaxProductCode,
} from "../../../../../../../../core/services/api/job.api";
import { getAccessToken } from "../../../../../../../../core/services/authentication/authentication.service";
import { showToast } from "../../../../../../../../core/utils";
import { refetchContext } from "../../../../../../../../core/utils/context/EventContext";
import { addProductiValidation } from "../../../../../../../../core/validations/product-tools.validation";
import {
  DropZone,
  SubmitButton,
  TextInput,
} from "../../../../../../../common/Form";
import { CarouselSlider } from "../../../../../../../common/CarouselSlider/CarouselSlider"
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

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
  const editMutation = useEditJobProduct();

  const [initialValue, setInitialValues] = useState<any>({
    name: "",
    productCode: "",
    unit: null,
    file: null,
    productCategory: null,
  });

  const [unitData, setUnitData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [dependTypeData, setDependTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: TypeOfDependenceEnum.Machinery, label: "ماشین آلات" },
        {
          value: TypeOfDependenceEnum.AreaOfBuildingsAndFacilities,
          label: "مساحت ساختمان و تاسیسات",
        },
        { value: TypeOfDependenceEnum.Trees, label: "درختان" },
        { value: TypeOfDependenceEnum.TotalArea, label: "مساحت کل" },
      ],
    },
  ]);

  const [imageUrl, setImageUrl] = useState<any>([]);
  const [imageSliderUrls, setImageSliderUrls] = useState<any>([]);
  const getProductCategory = useGetAllProductCategory();

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

  console.log("sliderimageurl ---", imageSliderUrls);
  

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const {
    data: productionUnitData,
    isFetching: productionUnitIsFetching,
    isSuccess: productionUnitIsSuccess,
  } = useGetAllProductUnitId();
  const postMutation = useGetMaxProductCode()

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
        name: data.title,
        productCode: data.productCode,
        order: data.viewOrder,
        unit: { value: data.productUnitId, label: data.productUnitTitle },
        productCategory: {
          value: data.productCategoryId,
          label: data.productCategoryTitle,
        },
      });
    }
  }, [currentId, isOpen]);

  useEffect(() => {
    if (currentId && imageUrl) {
      setInitialValues({
        name: data.title,
        productCode: data.productCode,
        order: data.viewOrder,
        unit: { value: data.productUnitId, label: data.productUnitTitle },
        file: imageUrl.url,
        productCategory: {
          value: data.productCategoryId,
          label: data.productCategoryTitle,
        },
      });
    }
  }, [imageUrl]);

  const onSubmit = (values: any) => {

    const formData = new FormData();
    if (imageUrl && imageUrl.length > 0) {
      for (let file of imageUrl) {
        formData.append(`Files`, file.blob);
      }
    } else {
      if (values.file) {
        for (let file of values.file) {
          formData.append(`Files`, file);
        }
      }
    }

    formData.append(`Title`, values.name);
    formData.append(`Id`, data.id);
    formData.append(`ProductCode`, values.productCode);
    formData.append(`ProductUnitId`, values.unit.value);
    formData.append(`ProductCategoryId`, values.productCategory.value);

    editMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.productionList = !newEvent.productionList;
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
            validationSchema={addProductiValidation}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="12">
                        <TextInput
                          lableText="نام محصول "
                          name="name"
                          placeholder="نام"
                          significant
                        />
                      </Col>
                      <Col md="12">
                        <TextInput
                          lableText="کد محصول"
                          name="productCode"
                          placeholder="کد محصول"
                          significant
                        />
                      </Col>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="واحد سنجش فعالیت"
                          significant={true}
                          placeHolder="انتخاب کنید..."
                          name="unit"
                          data={unitData}
                          isLoading={productionUnitIsFetching}
                        />
                      </Col>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="دسته"
                          significant={true}
                          placeHolder="انتخاب کنید..."
                          name="productCategory"
                          data={
                            getProductCategory.data?.data.result
                              ? getProductCategory.data?.data.result.map(
                                  (item: OptionRow) => ({
                                    value: item.id,
                                    label: item.title,
                                  })
                                )
                              : []
                          }
                          isLoading={getProductCategory.isFetching}
                          onChange={(opt) => {
                            setFieldValue("productCategory", {
                              value: opt.value,
                              label: opt.label,
                            });
                            if (opt) {
                              postMutation.mutate(
                                { ProductCategoryId: opt.value },
                                {
                                  onSuccess: (val: any) => {
                                    setInitialValues((prevState: any) => ({
                                      ...prevState,
                                      productCode: val.data.result,
                                      productCategory: {
                                        value: opt.value,
                                        label: opt.label,
                                      },
                                    }));
                                  },
                                }
                              );
                            }
                          }}
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
                          تصاویر محصول
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
                      schema={addProductiValidation}
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
