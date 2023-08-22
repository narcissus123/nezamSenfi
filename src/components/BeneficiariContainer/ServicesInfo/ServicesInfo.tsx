import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import Select from "react-select";
import { Alert, ListGroup, ListGroupItem } from "reactstrap";
import { ServicesValidation } from "../../../core/validations/Agricultural-and-services.validation";
import { InpuLable } from "../../common/Form";
import BasicSelectOption from "../../common/Form/SelectOptionComponent/BasicSelectOption";
import { SubmitButton } from "../../common/Form/SubmitButtonComponent/SubmitButton";
import { ComponentSpinner } from "../../common/Spinner/LoadingSpinner";
import { SweetAlertCallback } from "../../common/SweetAlert/SweetALertCallback";
import { TwoColumn } from "../../common/Wrapper/ColumnWrapper/TwoColumn";
import {
  useAllAgriculturalToolsTypes,
  useCreateUserAgriculturalToolsAndService,
  useDeleteUserServiceById,
  useGetAllAgriculturalToolsAndServiceByTypeID,
  useGetAllUserAgriculturalToolsAndService,
} from "./../../../core/services/api";
import { showToast } from "./../../../core/utils";
import Styled from "./ServicesInfo.module.scss";

const ServicesInfo: React.FC = () => {
  const initialValue = {
    agriculturalToolsAndServicesId: 0,
    typesId: { value: 0, label: "نوع خدمات را انتخاب کنید" },
  };

  const [showConfirmation, setShowConfirmation] = useState<any>(false);
  const [deleteSelected, setDeleteSelected] = useState<any>(null);
  const [servicesId, setServicesId] = useState([]);
  const [serviceTypeId, setServiceTypeId] = useState(0);

  const {
    data: AllAgriculturalToolsTypes,
    isSuccess: isAllAgriculturalToolsTypesSuccess,
    isLoading: isAllAgriculturalToolsTypesLoading,
  }: any = useAllAgriculturalToolsTypes();

  const ServiceByTypeID: any = useGetAllAgriculturalToolsAndServiceByTypeID();

  const {
    data: AllUserAgriculturalToolsAndService,
    isSuccess: isAllUserAgriculturalToolsAndServiceSuccess,
    isLoading: isAllUserAgriculturalToolsAndServiceLoading,
  }: any = useGetAllUserAgriculturalToolsAndService();

  const CreateAndServiceMutation: any =
    useCreateUserAgriculturalToolsAndService();
  const DeleteService: any = useDeleteUserServiceById();

  const [selectOptionList, setSelectOptionList] = useState([
    {
      label: " نوع خدمت را انتخاب کنید",
      options: [],
    },
  ]);

  const [AllServiceState, setAllServiceState] = useState([
    {
      label: " نام خدمت را انتخاب کنید",
      options: [],
    },
  ]);

  const [AllUsersServiceState, setAllUsersServiceState] = useState([]);

  useEffect(() => {
    if (AllAgriculturalToolsTypes) {
      let pro: any = [
        {
          label: " نوع خدمات را انتخاب کنید",
          options: [],
        },
      ];
      AllAgriculturalToolsTypes.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setSelectOptionList(pro);
    }
  }, [isAllAgriculturalToolsTypesSuccess]);

  useEffect(() => {
    if (ServiceByTypeID.data) {
      let pro: any = [
        {
          label: " نام خدمات را انتخاب کنید",
          options: [],
        },
      ];
      ServiceByTypeID.data.forEach((county: any) => {
        pro[0].options.push({
          value: county.agriculturalToolsAndServicesId,
          label: county.agriculturalToolsAndServicesTitle,
        });
      });
      setAllServiceState(pro);
    }
  }, [ServiceByTypeID.isSuccess]);

  useEffect(() => {
    if (AllUserAgriculturalToolsAndService && AllAgriculturalToolsTypes) {
      let res: any = [];
      AllAgriculturalToolsTypes.map((type: any) => {
        let options: any = [];
        AllUserAgriculturalToolsAndService.map((item: any) => {
          if (type.id === item.agriculturalToolsTypeId) {
            options.push(item);
          }
        });
        res.push({
          label: type.title,
          options: options,
        });
      });
      setAllUsersServiceState(res);
    }
  }, [
    isAllUserAgriculturalToolsAndServiceSuccess,
    isAllAgriculturalToolsTypesSuccess,
  ]);

  const serviceTypeOnChange = (opt: any, e: any, setFieldValue: any) => {
    ServiceByTypeID.mutate(opt.value);
    setServiceTypeId(opt.value);
    setServicesId([]);
    setFieldValue("typesId", { value: opt.value, label: opt.label });
  };

  const handleOnchange = (e: any, setFieldValue: any) => {
    setFieldValue("agriculturalToolsAndServicesId", e);
    setServicesId(e);
  };

  const onSubmit = (value: any, { resetForm }: any) => {
    let submitData: any = [];
    servicesId.map((item: any) => {
      submitData.push({ agriculturalToolsAndServicesId: item.value });
    });
    CreateAndServiceMutation.mutate(submitData, {
      onSuccess: () => {
        setServicesId([]);
        resetForm();
        ServiceByTypeID.mutate(serviceTypeId);
      },
    });
  };

  const deleteClickHandler = (id: any) => {
    setDeleteSelected(id);
    setShowConfirmation(true);
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={ServicesValidation}
    >
      {({ setFieldValue, errors, setFieldTouched, touched, values }) => (
        <Form>
          <div className="py-1">
            <SweetAlertCallback
              mutation={DeleteService}
              title="آیا مطمئنید؟"
              onCancel={() => {
                setShowConfirmation(false);
              }}
              onClose={() => {
                setShowConfirmation(false);
              }}
              onConfirm={() => {
                setShowConfirmation(false);
                DeleteService.mutate(deleteSelected, {
                  onSuccess: (val: any) => {
                    setShowConfirmation(false);
                    ServiceByTypeID.mutate(serviceTypeId);
                    showToast([".با موفقیت حذف شد"], "success");
                  },
                  onError: (err: any) => {
                    showToast(["مشکلی پیش آمد!"], "error");
                  },
                });
              }}
              show={showConfirmation}
            >
              آیا از پاک کردن این داده مطمئنید؟
            </SweetAlertCallback>

            <TwoColumn>
              <div>
                <BasicSelectOption
                  lableText="نوع خدمات"
                  name="typesId"
                  placeHolder="نوع خدمات را انتخاب کنید"
                  onChange={(opt: any, e: any) =>
                    serviceTypeOnChange(opt, e, setFieldValue)
                  }
                  data={selectOptionList}
                  isLoading={isAllAgriculturalToolsTypesLoading}
                  significant
                />
                <InpuLable lableText="نام خدمات" significant={true} />
                <Select
                  placeholder="نام خدمات را انتخاب کنید"
                  isMulti
                  name="agriculturalToolsAndServicesId"
                  options={AllServiceState}
                  className="React"
                  value={servicesId}
                  classNamePrefix="select"
                  isLoading={ServiceByTypeID.isLoading}
                  onChange={(e) => handleOnchange(e, setFieldValue)}
                  onBlur={() =>
                    setFieldTouched("agriculturalToolsAndServicesId", true)
                  }
                  isDisabled={!ServiceByTypeID.isSuccess}
                />

                {touched.agriculturalToolsAndServicesId &&
                  errors.agriculturalToolsAndServicesId && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "11px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.agriculturalToolsAndServicesId}
                    </p>
                  )}
              </div>
              <div className="h-100">
                <div className={Styled["list-header-margin"]}>
                  <Alert color="info" className="w-100 m-0 text-center">
                    خدمات شما
                  </Alert>
                </div>
                <div>
                  {isAllUserAgriculturalToolsAndServiceLoading ||
                  !isAllUserAgriculturalToolsAndServiceSuccess ? (
                    <ComponentSpinner isRelative={true} />
                  ) : (
                    AllUsersServiceState.map((item: any) => {
                      if (item.options.length > 0) {
                        return (
                          <ListGroup tag="div" className="mt-1">
                            <ListGroupItem tag="a" active>
                              {item.label}
                            </ListGroupItem>
                            {item.options.map((i: any) => {
                              return (
                                <ListGroupItem
                                  tag="a"
                                  className="d-flex justify-content-between"
                                >
                                  <span>
                                    {i.agriculturalToolsAndServicesTitle}
                                  </span>
                                  <span>
                                    <X
                                      color="red"
                                      onClick={() => deleteClickHandler(i.id)}
                                    />
                                  </span>
                                </ListGroupItem>
                              );
                            })}
                          </ListGroup>
                        );
                      } else {
                        return null;
                      }
                    })
                  )}
                </div>
              </div>
            </TwoColumn>
          </div>
          <SubmitButton
            isLoading={CreateAndServiceMutation.isLoading}
            backTo="/PersonalInfo/Machinery"
            schema={ServicesValidation}
            values={values}
            initialValue={initialValue}
            isDisabled={CreateAndServiceMutation.isLoading}
          />
        </Form>
      )}
    </Formik>
  );
};

export { ServicesInfo };
