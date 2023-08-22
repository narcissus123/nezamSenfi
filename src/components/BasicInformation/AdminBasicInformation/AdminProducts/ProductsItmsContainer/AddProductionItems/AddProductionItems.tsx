import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { OptionRow } from "../../../../../../core/models";
import { useAllUseTypes } from "../../../../../../core/services/api";
import {
  useCreateJobFigure,
  useGetAllJobByUseTypeForDropDown,
  useGetAllJobProductByProductCategoryId,
  useGetAllJobProductByProductionFactorId,
  useGetAllJobProductionFactorByJobId,
  useGetAllProductCategory,
  useGetMaxFigureCode,
} from "../../../../../../core/services/api/job.api";
import { showToast } from "../../../../../../core/utils";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { addProductItemValidation } from "../../../../../../core/validations/product-items.validation";
import { FileInput } from "../../../../../common/Form";
import { DetailsPopover } from "../../../../../common/Form/DetaillsPopover/DetailsPopover";
import { DropZone } from "../../../../../common/Form/DropZone/DropZone";
import { TextArea } from "../../../../../common/Form/InputComponents/TextArea";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { Toggle } from "../../../../../common/Form/Toggle/Toggle";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";


interface IPropTypes {
  setProductCategories?: any
}
const AddProductionItems: React.FC<IPropTypes> = ({setProductCategories}) => {

  const [initialValue, setInitialValue] =  useState<any>({
    itemName: "",
    order: "",
    file: null,
    code:"",
    product: null,
    periodProduct: null,
    describe: "",
    productCategory: null
  });

  const getProductCategory = useGetAllProductCategory();
  const getProductMutation = useGetAllJobProductByProductCategoryId();
  const postMutation = useGetMaxFigureCode()

  useEffect(() => {
    if (getProductCategory.data) {
      const data = getProductCategory.data?.data.result
        ? getProductCategory.data?.data.result.map((item: OptionRow) => ({
            value: item.id,
            label: item.title,
          }))
        : [];
      if (setProductCategories) setProductCategories(data);
    }
  }, [getProductCategory.isSuccess]);

  const location :any = useLocation();
  useEffect(() => {
    if (
      location.state &&
      location.state.productId &&
      location.state.productCategoryId
    ) {
      setInitialValue((oldState: any) => ({
        ...oldState,
        productCategory: { value: location.state.productCategoryId, label: "" },
        product: {
          value: location.state.productId,
          label: "",
        },
      }));

      getProductMutation.mutate(location.state.productCategoryId, {
        onSuccess: (val: any) => {

          let data = val.data.result;

          if (data) {
            let pro: any = [
              {
                label: "انتخاب کنید...",
                options: [],
              },
            ];
            data.forEach((job: any) => {
              pro[0].options.push({
                value: job.id,
                label: job.title,
              });
            });
            setProductData(pro);
          }
        },
      });   

      postMutation.mutate(
        { ProductCategoryId: location.state.productId },
        {
          onSuccess: (val: any) => {
            setInitialValue((prevState: any) => ({
              ...prevState,
              code: val.data.result,
              productCategory: {
                value: location.state.productCategoryId,
                label: "",
              },
              product: {
                value: location.state.productId,
                label: "",
              },
            }));
          },
        }
      );
    }
  }, [location, getProductCategory.isSuccess]);
  
  const [productionFactorData, setProductionFactorData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [useTypeData, setUseTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [jobsData, setJobsData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [productData, setProductData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [productFactorData, setProductFactorData] = useState<any>([
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

  // const getJobsMutation = useGetAllJobByUseTypeForDropDown();

  // const getJobFactorMutation = useGetAllJobProductionFactorByJobId();


  const createMutation = useCreateJobFigure();

  // const {
  //   data: useTypesData,
  //   isFetching: useTypesIsFetching,
  //   isSuccess: useTypesIsSuccess,
  // } = useAllUseTypes();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  // useEffect(() => {
  //   if (useTypesData && useTypesData.data) {
  //     const result = useTypesData.data.result;

  //     console.log("---usetypedata----", useTypesData);

  //     let pro: any = [
  //       {
  //         label: "انتخاب کنید...",
  //         options: [],
  //       },
  //     ];
  //     result.forEach((useType: any) => {
  //       pro[0].options.push({
  //         value: useType.id,
  //         label: useType.title,
  //         useTypeEnum: useType.useTypeEnum,
  //       });
  //     });
  //     setUseTypeData(pro);
  //   }
  // }, [useTypesIsSuccess]);

  const onSubmit = (value: any , { resetForm }: any ) => {
    if (!value.file || !(value.file.length > 0)) {
      showToast(["لطفا فایل را انتخاب کنید!"], ToastTypes.error);
      return;
    }

    const formData = new FormData();
    for (let file of value.file) {
      formData.append(`Files`, file);
    }

    formData.append(`Title`, value.itemName);
    formData.append(`Code`, value.code);
    formData.append(`Description`, value.describe);
    formData.append(`ProductionCycle`, value.periodProduct.value);
    formData.append(`ProductId`, value.product.value);

    createMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.productionFigureList = !newEvent.productionFigureList;
        setRefetchEvent(newEvent);
        setInitialValue((oldState: any) => { 
            
          return {
            ...oldState,
            code: +value.code >= 9 ? +value.code + 1 : `0${+value.code + 1}`,
            product: value.product,
            name: "",
            unit: null,
            file: null,
            itemName: "",
            periodProduct: null,
            describe: "",
          };});
      },
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={addProductItemValidation}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              {/* <DetailsPopover
                id="unique3"
                placement="top"
                title="راهنما"
                text="توضیحات پاپ اور توضیحات پاپ اور توضیحات پاپ اور توضیحات پاپ اور توضیحات پاپ اور توضیحات پاپ اور توضیحات پاپ اور توضیحات پاپ اورتوضیحات پاپ اور توضیحات پاپ اور "
              /> */}
              <>
                <TwoColumn>
                  <div>
                    <BasicSelectOption
                      infoUniqueId="productCategory"
                      lableText="دسته بندی محصول"
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
                      isLoading={getProductCategory.isLoading}
                      onChange={(opt: any, e: any) => {
                        setFieldValue("productCategory", {
                          value: opt.value,
                          label: opt.label,
                        });
                        setFieldValue("product", null);
                        setFieldValue("code", "");

                        if (opt) {
                          getProductMutation.mutate(opt.value, {
                            onSuccess: (val: any) => {
                              let data = val.data.result;

                              if (data) {
                                let pro: any = [
                                  {
                                    label: "انتخاب کنید...",
                                    options: [],
                                  },
                                ];
                                data.forEach((job: any) => {
                                  pro[0].options.push({
                                    value: job.id,
                                    label: job.title,
                                  });
                                });
                                setProductData(pro);
                              }
                            },
                          });
                        }
                      }}
                    />
                    <TextInput
                      lableText="کد رقم"
                      name="code"
                      placeholder="کد رقم ..."
                      significant
                    />
                    <BasicSelectOption
                      lableText="دوره تولید"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="periodProduct"
                      data={periodProductData}
                      isLoading={false}
                      hasInfo
                      info="توضیحات راهنما توضیحات راهنما توضیحات راهنما توضیحات راهنما توضیحات راهنما توضیحات راهنما توضیحات راهنما توضیحات راهنما"
                      infoTitle="راهنما"
                      popoverPlacement="bottom"
                      infoUniqueId="periodProduct"
                    />
                  </div>
                  <div>
                    <BasicSelectOption
                      lableText="محصول"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="product"
                      data={productData}
                      isLoading={getProductMutation.isLoading}
                      onChange={(opt: any, e: any) => {
                        setFieldValue("product", {
                          value: opt.value,
                          label: opt.label,
                        });
                        if (opt) {
                          postMutation.mutate(
                            { ProductCategoryId: opt.value },
                            {
                              onSuccess: (val: any) => {
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  code: val.data.result,
                                  productCategory: {
                                    value: values.productCategory.value,
                                    label: values.productCategory.label,
                                  },
                                  product: {
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

                    <TextInput
                      lableText="نام رقم "
                      name="itemName"
                      placeholder="نام"
                      significant
                    />
                    <TextArea
                      lableText="توضیحات"
                      name="describe"
                      placeholder="توضیحات"
                      significant
                    />
                  </div>
                </TwoColumn>

                <Row>
                  <Col md="6">
                    <FileInput
                      files={values.file}
                      outLine
                      name="file"
                      inputText="انتخاب فایل"
                      setFieldValue={(val: any) => {
                        setFieldValue("file", val);
                      }}
                    />
                  </Col>
                </Row>
                <SubmitButton
                  isLoading={createMutation.isLoading}
                  initialValue={initialValue}
                  schema={addProductItemValidation}
                  values={values}
                  isDisabled={false}
                />
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { AddProductionItems };
