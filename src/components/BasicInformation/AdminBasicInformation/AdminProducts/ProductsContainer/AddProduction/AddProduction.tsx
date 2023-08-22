import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastTypes } from "../../../../../../core/enums";
import { OptionRow } from "../../../../../../core/models";
import { useAllUseTypes } from "../../../../../../core/services/api";
import {
  useCreateJobProduct,
  useGetAllProductCategory,
  useGetAllProductUnitId,
  useGetMaxProductCode,
} from "../../../../../../core/services/api/job.api";
import { showToast } from "../../../../../../core/utils";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { addProductiValidation } from "../../../../../../core/validations/product-tools.validation";
import { FileInput } from "../../../../../common/Form";
import { DropZone } from "../../../../../common/Form/DropZone/DropZone";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";


const AddProduction: React.FC = () => {
  const [initialValue, setInitialValue] =  useState<any>({
    name: "",
    unit: null,
    productCategory: null,
    file: null,
    productCode: ""
  });
  

  const [unitData, setUnitData] = useState<any
  >([
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

  const {
    data: productionUnitData,
    isFetching: productionUnitIsFetching,
    isSuccess: productionUnitIsSuccess,
  } = useGetAllProductUnitId();

  const postMutation = useGetMaxProductCode()

  const {
    data: useTypesData,
    isFetching: useTypesIsFetching,
    isSuccess: useTypesIsSuccess,
  } = useAllUseTypes();

  const getProductCategory = useGetAllProductCategory();
  const createProductionMutation = useCreateJobProduct();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const location :any = useLocation();
  useEffect(() => {
    if (location.state && location.state.productId) {
      setInitialValue((oldState: any) => ({
        ...oldState,
        productCategory: { value: location.state.productId, label: "" },
      }));

      postMutation.mutate(
        { ProductCategoryId: location.state.productId },
        {
          onSuccess: (val: any) => {
            setInitialValue((prevState: any) => ({
              ...prevState,
              productCode: val.data.result,
              productCategory: { value: location.state.productId, label: "" },
            }));
          },
        }
      );
    }
  }, [location, getProductCategory.isSuccess]);

  useEffect(() => {
    if (useTypesData && useTypesData.data) {
      const result = useTypesData.data.result;

      console.log("---usetypedata----", useTypesData);

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((useType: any) => {
        pro[0].options.push({
          value: useType.id,
          label: useType.title,
          useTypeEnum: useType.useTypeEnum,
        });
      });
      setUseTypeData(pro);
    }
  }, [useTypesIsSuccess]);

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

  const onSubmit = (value: any) => {

    const formData = new FormData();
    if(value.file){
      for (let file of value.file) {
        formData.append(`Files`, file);
      } 
    }

    formData.append(`Title`, value.name);
    formData.append(`ProductUnitId`, value.unit.value);
    formData.append("ProductCategoryId", value.productCategory.value);
    formData.append("ProductCode", value.productCode);

    createProductionMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.productionList = !newEvent.productionList;
        setRefetchEvent(newEvent);
        setInitialValue((oldState: any) => ({
          ...oldState,
          productCode:
            +value.productCode >= 9
              ? +value.productCode + 1
              : `0${+value.productCode + 1}`,
          name: "",
          unit: null,
          file: null,
        }));
        
      },
    });
  };

  return (
    <>
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
                <TwoColumn>
                  <div>
                    <BasicSelectOption
                      lableText="دسته بندی محصول ( +CPC )"
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
                                setInitialValue((prevState: any) => ({
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
                    <BasicSelectOption
                      lableText="واحد"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="unit"
                      data={unitData}
                      isLoading={productionUnitIsFetching}
                    />
                    <FileInput
                      files={values.file}
                      outLine
                      name="file"
                      inputText="انتخاب فایل"
                      setFieldValue={(val: any) => {
                        setFieldValue("file", val);
                      }}
                    />
                  </div>
                  <div>
                    <TextInput
                      lableText="کد محصول"
                      name="productCode"
                      placeholder="کد محصول ..."
                      significant
                    />
                    <TextInput
                      lableText="نام محصول "
                      name="name"
                      placeholder="نام"
                      significant
                    />
                  </div>
                </TwoColumn>
                <SubmitButton
                  isLoading={createProductionMutation.isLoading}
                  initialValue={initialValue}
                  schema={addProductiValidation}
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

export { AddProduction };
