import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, CardBody, CardTitle, Col } from "reactstrap";
import {
  useGetLocationInformation,
  useUserRealContactById,
} from "../../../../../core/services/api";
import { ContactInfoValidate } from "../../../../../core/validations/contact-info.validations";
import { ChangeCell } from "../../../../common/ChangeCell/ChangeCell";
import { FormDivider, TextArea, TextInput } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { TwoColumn } from "../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import Styled from "./UserRealContactInfo.module.scss";

interface IPropTypes {
  id: string;
}

const UserRealContactInfo: React.FC<IPropTypes> = ({ id }) => {
  const { data, isFetching, isSuccess } = useUserRealContactById(+id);

  const LocationInfo = useGetLocationInformation();

  const [modal, setModal] = useState(false);
  const [initialValues, setInitialValues] = useState<any>({
    addresses: [
      {
        province: null,
        township: null,
        city: null,
        homePhone: "",

        postalCode: "",
        village: null,
        address: null,
      },
    ],
    cellphone: "09111111111",
    email: "",
  });

  const [isLoadingLoc, setisLoadingLoc] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      if (isSuccess) {
        setisLoadingLoc(true);
        const values = data?.data.result;

        let addresses: any = [];

        for (let index = 0; index < values.addresses.length; index++) {
          const ad = values.addresses[index];

          let localAddress: any = {
            homePhone: ad.homePhone,
            address: ad.address,
            postalCode: ad.postalCode,
          };

          if (ad.locationId) {
            try {
              const locInfo = await LocationInfo.mutateAsync(ad.locationId);

              localAddress["province"] = locInfo.data.result.provinceId
                ? {
                    value: locInfo.data.result.provinceId,
                    label: locInfo.data.result.province,
                  }
                : { value: 0, label: "تعیین نشده" };

              localAddress["township"] = locInfo.data.result.countyId
                ? {
                    value: locInfo.data.result.countyId,
                    label: locInfo.data.result.county,
                  }
                : { value: 0, label: "تعیین نشده" };

              localAddress["city"] = locInfo.data.result.city
                ? {
                    value: locInfo.data.result.cityOrVillageId,
                    label: locInfo.data.result.city,
                  }
                : { value: 0, label: "تعیین نشده" };

              localAddress["village"] = locInfo.data.result.village
                ? {
                    value: locInfo.data.result.cityOrVillageId,
                    label: locInfo.data.result.village,
                  }
                : { value: 0, label: "تعیین نشده" };
            } catch (error) {}
          }

          addresses.push(localAddress);
        }

        setInitialValues((state: any) => {
          return {
            ...state,
            email: values.email,
            addresses: addresses,
            cellphone: values.cellphone,
          };
        });
        setisLoadingLoc(false);
      }
    };
    try {
      loadData();
    } catch (error) {
      setisLoadingLoc(false);
    }
  }, [isSuccess]);

  return isFetching || isLoadingLoc ? (
    <FallBackSpinner />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactInfoValidate}
      enableReinitialize={true}
      onSubmit={() => {}}
    >
      {({ values }) => {
        return (
          <Form noValidate>
            <CardTitle>اطلاعات تماس</CardTitle>
            <ChangeCell
              isOpen={modal}
              toggleModal={() => setModal((val) => !val)}
            />
            <TwoColumn>
              <TextInput
                lableText="ايميل"
                name="email"
                type="email"
                placeholder="مثلا name@email.com"
                disabled
              />
              <TextInput
                lableText="تلفن همراه"
                name="cellphone"
                placeholder="تلفن همراه"
                type="tell"
                disabled
                className={Styled.disabled}
              />
            </TwoColumn>

            <FieldArray
              name="addresses"
              render={(arrayHelpers) => (
                <div>
                  {values.addresses && values.addresses.length > 0 ? (
                    values.addresses.map((friend: any, index: any) => (
                      <div key={index}>
                        {/* <Field name={`addresses.${index}`} /> */}

                        <FormDivider textHeader="آدرس">
                          <CardBody>
                            <TwoColumn>
                              <div>
                                <BasicSelectOption
                                  lableText="استان محل سکونت"
                                  name={`addresses.${index}.province`}
                                  placeHolder="انتخاب کنید..."
                                  data={[]}
                                  isDisabled
                                />
                                <BasicSelectOption
                                  lableText="شهرستان محل سکونت"
                                  name={`addresses.${index}.township`}
                                  placeHolder="انتخاب کنید..."
                                  data={[]}
                                  isDisabled
                                />
                                <BasicSelectOption
                                  lableText="شهر محل سکونت"
                                  name={`addresses.${index}.city`}
                                  placeHolder="انتخاب کنید..."
                                  data={[]}
                                  isDisabled
                                />
                                <TextArea
                                  lableText="آدرس دقیق پستی محل سکونت"
                                  name={`addresses.${index}.address`}
                                  placeholder="آدرس دقیق پستی محل سکونت"
                                  disabled
                                />
                              </div>

                              <div>
                                <TextInput
                                  lableText="تلفن محل سکونت"
                                  name={`addresses.${index}.homePhone`}
                                  type="tell"
                                  placeholder="تلفن محل سکونت"
                                  disabled
                                />
                                <TextInput
                                  lableText="کد پستي محل سکونت"
                                  name={`addresses.${index}.postalCode`}
                                  placeholder="کد پستي محل سکونت"
                                  disabled
                                />

                                <BasicSelectOption
                                  lableText="روستاي محل سکونت"
                                  placeHolder="انتخاب کنید..."
                                  name={`addresses.${index}.village`}
                                  data={[]}
                                  isDisabled
                                />
                              </div>
                            </TwoColumn>
                          </CardBody>
                        </FormDivider>
                        {arrayHelpers.form.values.addresses.length - 1 >
                          +index && <hr />}
                      </div>
                    ))
                  ) : (
                    <Alert color="info">آدرسی ثبت نشده است!</Alert>
                  )}
                </div>
              )}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export { UserRealContactInfo };
