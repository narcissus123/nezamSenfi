import { Form, Formik } from "formik";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Eye, X } from "react-feather";
import { useParams } from "react-router-dom";
import { Button, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../core/enums";
import {
  useAllAgriculturalToolsTypes,
  useGetAllCitiesWithPartByCountyId,
  useGetAllCountyByProvinceId,
  useGetAllMachine,
  useGetAllprovinces,
  useGetAllServicesNameWithType,
  useGetAllUserMachinesByLicenseRequestId,
  useGetAllVillagesWithPartByCountyId,
  useGetUserByNationalCode,
  useGetUserSection,
  useSetAgriculturalMechanizationServiceOfLicenseRequest,
  useSetAgriculturalMechanizationServiceOfLicenseRequestSection,
} from "../../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../../core/utils";
import { ExpertMechanisationTabValidate } from "../../../../../../../../../core/validations/expert-mechanisation.validations";
import {
  DropZone,
  FieldWrapper,
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";
import { ListInput } from "../../../../../../../../common/Form/InputComponents/TextInputComponents/ListInput/ListInput";
import { MultiCheckBoxList } from "../../../../../../../../common/Form/MultiCheckBoxList/MultiCheckBoxList";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { EditModal } from "./EditModal/EditModal";
import { List } from "./List/List";
import Styles from "./Mechanization.module.scss";

interface IPropTypes {
  isExpert?: boolean;
  fixedOrMobieTypeByExpert?: number;
  mechanizationServicesData: any;
  refetchMechanizationServices: any;
}

const Mechanisation: React.FC<IPropTypes> = ({
  isExpert,
  fixedOrMobieTypeByExpert,
  mechanizationServicesData,
  refetchMechanizationServices,
}) => {
  const [counter, setCounter] = useState<number>(1);
  const [tableData, setTableData] = useState<any>([]);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [editRowID, setEditRowID] = useState<number>(0);

  const [clientNamesList, setClientNamesList] = useState<any>([]);
  const [noClientNamesList, setNoClientNamesList] = useState<any>([]);

  const setMutation =
    useSetAgriculturalMechanizationServiceOfLicenseRequestSection();

  const setMobilityMutation =
    useSetAgriculturalMechanizationServiceOfLicenseRequest();

  const { data, isSuccess, isFetching } = useGetAllprovinces();
  const getAllcounty = useGetAllCountyByProvinceId();
  const getAllcity = useGetAllCitiesWithPartByCountyId();
  const getAllvillage = useGetAllVillagesWithPartByCountyId();
  const getUserByNationalIdMutation = useGetUserByNationalCode();
  
  const { section_id, req_id } =
  useParams<{ section_id: string; req_id: string }>();

  const {
    data: allMachineData,
    isFetching: allMachineIsFetching,
    isSuccess: allMachineIsSuccess,
  } = useGetAllUserMachinesByLicenseRequestId(+req_id);
  const {
    data: allAgriculturalToolsTypesData,
    isFetching: allAgriculturalToolsTypesIsFetching,
    isSuccess: allAgriculturalToolsTypesIsSuccess,
  } = useAllAgriculturalToolsTypes();

  const getAgriculturalByTypeIdMutation = useGetAllServicesNameWithType();
  const getUserSectionMutation = useGetUserSection();

  const [initialValue, setInitialValue] = useState<any>({
    machinName: null,
    toolsType: null,
    toolsName: null,
    clientName: "",
    totalLicensedArea: "",
    areaOfWithoutLicense: "",
    province: null,
    township: null,
    village: null,
    daysInImmigration: "",
  });



  const [checkBoxData, setCheckBoxData] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mapCurrentSectionId, setMapCurrentSectionId] = useState<number>(0);

  const [province, setProvince] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [township, setTownship] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [city, setCity] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [village, setVillage] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [machinNameData, setMachinNameData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [toolsTypeData, setToolsTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [toolsNameData, setToolsNameData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const getValue = (val: any) => {
    return val ? val : "تعیین نشده";
  };
  useEffect(() => {
    let initialCounter = 1;
    if (mechanizationServicesData && mechanizationServicesData.data) {
      const result =
        mechanizationServicesData.data.result.agriculturalMechanizations;

      if (result && result.length > 0) {
        result.forEach((row: any) => {
          const obj = {
            id: initialCounter,
            machineryIdTitle: row.machineryTitle,
            machineryId: row.userMachineId,
            agriculturalToolsAndServicesIdTitle:
              row.agriculturalToolsAndServicesTitle,
            agriculturalToolsAndServicesId: row.agriculturalToolsAndServicesId,
            agriculturalToolsAndServicesTitle:
              row.agriculturalToolsAndServicesTitle,
            agriculturalToolsAndServicesTypeTitle:
              row.agriculturalToolsAndServicesTypeTitle,
            agriculturalToolsAndServicesTypeId:
              row.agriculturalToolsAndServicesTypeId,
            cityOrVillageIdTitle: row.cityOrVillageTitle,
            cityOrVillageId: row.cityOrVillageId,
            daysOfTarriance: row.daysOfTarriance,
            cleintFarmersVm: row.cleintFarmersVm,
            nonCleintFarmersVm: row.nonCleintFarmersVm,
            agriculturalToolsAndServicesNumber:
              row.agriculturalToolsAndServicesNumber,
          };

          setTableData((prev: any) => {
            return [...prev, obj];
          });

          initialCounter = initialCounter + 1;
        });

        setCounter((prev: number) => {
          return initialCounter;
        });
      }
    }
  }, [mechanizationServicesData]);

  useEffect(() => {
    if (allMachineData) {
      let queryData: any = allMachineData;
      let newOptions: any = [];
      let newList: any = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({
          value: row.id,
          label: row.machineName,
          plateNumber: row.plateNumber,
          serialNumberOrModel: row.serialNumberOrModel,
          chassisNumber: row.chassisNumber,
          engineNumber: row.engineNumber,
          typeOfMachineUseTitle: row.typeOfMachineUseTitle,
          typeOfOwnershipTitle: row.typeOfOwnershipTitle,
        });
      });
      newList[0].options = newOptions;
      setMachinNameData(newList);
    }
  }, [allMachineIsSuccess]);

  useEffect(() => {
    if (allAgriculturalToolsTypesData) {
      let queryData: any = allAgriculturalToolsTypesData;
      let newOptions: any = [];
      let newList: any = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];

      queryData.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newList[0].options = newOptions;
      setToolsTypeData(newList);
    }
  }, [allAgriculturalToolsTypesIsSuccess]);

  useEffect(() => {
    if (data) {
      let queryData: any = data;
      let newOptions: any = [];
      let newProvinces: any = [
        {
          label: "سرلیست استان",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newProvinces[0].options = newOptions;
      setProvince(newProvinces);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (getAllcity.data && getAllcity.data.data) {
      const result = getAllcity.data.data.result;

      let allCity: any = [];

      result.forEach((county: any) => {
        county.citis.forEach((eachCity: any) => {
          delete Object.assign(eachCity, { value: eachCity["id"] })["id"];
          delete Object.assign(eachCity, { label: eachCity["title"] })["title"];
        });

        allCity.push({
          label: county.partTitle,
          options: county.citis,
        });
      });
      setCity(allCity);
    }
  }, [getAllcity.isSuccess]);

  useEffect(() => {
    if (getAllcounty.data && getAllcounty.data.data) {
      const result = getAllcounty.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setTownship(pro);
    }
  }, [getAllcounty.isSuccess]);

  useEffect(() => {
    if (getAllvillage.data && getAllvillage.data.data) {
      const result = getAllvillage.data.data.result;

      let allVillage: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((village: any) => {
        village.villages.forEach((eachVillage: any) => {
          delete Object.assign(eachVillage, { value: eachVillage["id"] })["id"];
          delete Object.assign(eachVillage, { label: eachVillage["title"] })[
            "title"
          ];
        });

        allVillage.push({
          label: village.partTitle,
          options: village.villages,
        });
      });
      setVillage(allVillage);
    }
  }, [getAllvillage.isSuccess]);

  const provinceOnChange = (opt: any, e: any, setFieldValue: any) => {
    getAllcounty.mutate(opt.value);
    setFieldValue("province", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("township", null);
    setFieldValue("city", { value: 0, label: "انتخاب کنید..." });
    setFieldValue("village", { value: 0, label: "انتخاب کنید..." });
    setTownship([]);
    setCity([]);
    setVillage([]);
  };

  const townshipOnChange = (opt: any, e: any, setFieldValue: any) => {
    getAllcity.mutate(opt.value);
    getAllvillage.mutate(opt.value);
    setFieldValue("township", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("city", { value: 0, label: "انتخاب کنید..." });
    setFieldValue("village", { value: 0, label: "انتخاب کنید..." });
    setCity([]);
    setVillage([]);
  };

  const cityOnChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("city", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("village", { value: 0, label: "انتخاب کنید..." });
  };

  const villageOnChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("village", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("city", { value: 0, label: "انتخاب کنید..." });
  };

  const onSubmit = async (values: any, { resetForm }: any) => {
    if (clientNamesList.length < 1) {
      return showToast(
        ["لیست کاربران خدمات گیرنده نمی تواند خالی باشد!"],
        ToastTypes.error
      );
    }

    if (isInEditMode) {
      let totalLicensedAreaCoordinatesList: any = [];
      let areaOfWithoutLicenseCoordinatesList: any = [];

      clientNamesList.forEach((row: any) => {
        let sectionIds: number[] = [];
        let userId: number = row.id;
        console.log("----stage 2 ejra mishe ---");
        values[`clientName${row.id}`].forEach((el: any) => {
          console.log("----stage 4 ejra mishe ---", el);

          el.options.forEach((row: any) => {
            console.log("----stage 6 ejra mishe ---", row);
            if (row.id !== 0 && row.checked && row.value >= 1)
              sectionIds.push(row.value);
          });
        });
        totalLicensedAreaCoordinatesList.push({
          userId: userId,
          sectionIds: sectionIds,
        });
        console.log("----stage 3 ejra mishe ---");
      });

      noClientNamesList.forEach(async (row: any) => {
        let polygons: any = [];

        values[`areaOfWithoutLicense${row.nationalCode}`].forEach(
          async (row: any) => {
            const str = await row.text();
            const doc: any = new window.DOMParser().parseFromString(
              str,
              "text/xml"
            );

            let coordinates: any = [];
            const nodes = [...doc.getElementsByTagName("trkpt")];

            nodes.forEach((node) => {
              var lat = parseFloat(node.getAttribute("lat"));
              var lng = parseFloat(node.getAttribute("lon"));

              coordinates.push({ y: lat, x: lng });
            });

            coordinates.push(coordinates[0]);

            polygons.push(coordinates);
          }
        );
        areaOfWithoutLicenseCoordinatesList.push({
          nationalCode: row.nationalCode,
          polygons: polygons,
        });
      });

      const mechObj = {
        id: counter,
        daysOfTarriance: values.daysInImmigration,
        cleintFarmersVm: totalLicensedAreaCoordinatesList,
        nonCleintFarmersVm: areaOfWithoutLicenseCoordinatesList,
        machineryId: values.machinName.value,
        machineryIdTitle: values.machinName.label,
        agriculturalToolsAndServicesId: values.toolsName.value,
        agriculturalToolsAndServicesIdTitle: values.toolsName.label,
        cityOrVillageId: values.village.value,
        cityOrVillageIdTitle: values.village.label,
        agriculturalToolsAndServicesNumber: values.agriculturalToolsAndServicesNumber,
        usersIds: clientNamesList,
      };

      setTableData((prev: any) => {
        const lastState = [...prev];
        let findIDIndex = lastState.findIndex(
          (row: any) => row.id === editRowID
        );
        lastState[findIDIndex] = mechObj;
        return lastState;
      });

      setIsInEditMode(false);
      setEditRowID(0);
      resetForm();
      setClientNamesList([]);
      setNoClientNamesList([]);
    } else {
      console.log("----stage 1 ejra mishe ---");

      let totalLicensedAreaCoordinatesList: any = [];
      let areaOfWithoutLicenseCoordinatesList: any = [];

      clientNamesList.forEach((row: any) => {
        let sectionIds: number[] = [];
        let userId: number = row.id;
        console.log("----stage 2 ejra mishe ---");
        values[`clientName${row.id}`].forEach((el: any) => {
          console.log("----stage 4 ejra mishe ---", el);

          el.options.forEach((row: any) => {
            console.log("----stage 6 ejra mishe ---", row);
            if (row.id !== 0 && row.checked && row.value >= 1)
              sectionIds.push(row.value);
          });
        });
        totalLicensedAreaCoordinatesList.push({
          userId: userId,
          sectionIds: sectionIds,
        });
        console.log("----stage 3 ejra mishe ---");
      });

      noClientNamesList.forEach(async (row: any) => {
        let polygons: any = [];

        values[`areaOfWithoutLicense${row.nationalCode}`].forEach(
          async (row: any) => {
            const str = await row.text();
            const doc: any = new window.DOMParser().parseFromString(
              str,
              "text/xml"
            );

            let coordinates: any = [];
            const nodes = [...doc.getElementsByTagName("trkpt")];

            nodes.forEach((node) => {
              var lat = parseFloat(node.getAttribute("lat"));
              var lng = parseFloat(node.getAttribute("lon"));

              coordinates.push({ y: lat, x: lng });
            });

            coordinates.push(coordinates[0]);

            polygons.push(coordinates);
          }
        );
        areaOfWithoutLicenseCoordinatesList.push({
          nationalCode: row.nationalCode,
          polygons: polygons,
        });
      });

      const mechObj = {
        id: counter,
        daysOfTarriance: values.daysInImmigration,
        cleintFarmersVm: totalLicensedAreaCoordinatesList,
        nonCleintFarmersVm: areaOfWithoutLicenseCoordinatesList,
        machineryId: values.machinName.value,
        machineryIdTitle: values.machinName.label,
        agriculturalToolsAndServicesId: values.toolsName.value,
        agriculturalToolsAndServicesIdTitle: values.toolsName.label,
        cityOrVillageId: values.village.value,
        cityOrVillageIdTitle: values.village.label,
        agriculturalToolsAndServicesNumber:
          values.agriculturalToolsAndServicesNumber,
        usersIds: clientNamesList,
      };

      setTableData((prev: any) => {
        return [...prev, mechObj];
      });
      setCounter((prev: number) => {
        return prev + 1;
      });
    }
    resetForm();
    setClientNamesList([]);
    setNoClientNamesList([]);
  };

  const onFinalSubmit = (values: any) => {

    let array: any = [];

    tableData.forEach((row: any) => {
      let nonClientFarmersVmArray: any = [];
      // let usersIds: any = [];

      // row.usersIds.forEach((row: any) => {
      //   usersIds.push(row.id);
      // });

      array.push({
        daysOfTarriance: row.daysOfTarriance,
        cleintFarmersVm: row.cleintFarmersVm,
        nonCleintFarmersVm: row.nonCleintFarmersVm,
        userMachineId: row.machineryId,
        agriculturalToolsAndServicesId: row.agriculturalToolsAndServicesId,
        cityOrVillageId: row.cityOrVillageId,
        agriculturalToolsAndServicesNumber:
          row.agriculturalToolsAndServicesNumber,
      });
    });

    let finalObj: any = {
      licenseRequestSectionId: +section_id,
      agriculturalMechanizations: array,
      licenseRequestId: +req_id,
    };

    if (fixedOrMobieTypeByExpert === 1)
      setMutation.mutate(finalObj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          refetchMechanizationServices();
        },
      });
    else if (fixedOrMobieTypeByExpert === 2)
      setMobilityMutation.mutate(finalObj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          refetchMechanizationServices();
        },
      });
  };

  const ShowMapButton = ({ id }: { id: number }) => (
    <Button
      style={{ margin: "3px" }}
      size="sm"
      color="primary"
      onClick={() => {
        setOpenModal(true);
        setMapCurrentSectionId(id);
      }}
    >
      مشاهده &nbsp;
      <Eye
        style={{
          position: "relative",
          top: "-2px",
        }}
        size={12}
        color="white"
      />
    </Button>
  );

  const onClientAddClick = (values: any) => {
    const submitedNationalId = values.clientName;
    if (
      clientNamesList.some(
        (row: any) => row.nationalCode === submitedNationalId
      )
    ) {
      return showToast(
        ["کاربر مورد نظر از قبل در لیست وجود دارد!"],
        ToastTypes.error
      );
    }
    getUserByNationalIdMutation.mutate(values.clientName, {
      onSuccess: (value: any) => {
        if (value.data && value.data.result) {
          getUserSectionMutation.mutate(value.data.result.id, {
            onSuccess: (val: any) => {
              if (val.data.result && val.data.result.length > 0) {
                const user = value.data.result;
                const sections = val.data.result;

                let newCheckBox: any = [];

                sections.forEach((row: any) => {
                  let sectionIds: any = [];

                  row.sections.forEach((row: any) => {
                    sectionIds.push({
                      label: `قطعه شماره ${row.sectionId}`,
                      value: row.sectionId,
                      coordinates: row.coordinates,
                      id: row.sectionId,
                      checked: false,
                    });
                  });

                  let rand = Math.random();
                  sectionIds.push({
                    label: "",
                    value: rand * 0.2542,
                    id: rand * 0.2542,
                    checked: false,
                    isAll: true,
                  });

                  newCheckBox.push({
                    groupId: row.licenseReqiestId,
                    isActive: true,
                    label: `درخواست شماره ${row.licenseReqiestId}`,
                    options: sectionIds,
                  });
                });

                const userObj = {
                  sections: newCheckBox,
                  id: user.id,
                  nationalCode: submitedNationalId,
                  fullName: `${user.name} ${user.lastName}`,
                  email: user.email,
                };

                setClientNamesList((prev: any) => {
                  return [...prev, userObj];
                });
              } else {
                showToast(
                  ["کاربر مورد نظر پروانه ای ندارد!"],
                  ToastTypes.error
                );
              }
            },
          });
        }
      },
    });
  };

  return (
    <>
      <Row>
        {openModal && (
          <EditModal
            backdrop
            isOpen={openModal}
            data={mapCurrentSectionId}
            toggleModal={() => setOpenModal(false)}
          />
        )}
        <Col>
          <Formik
            initialValues={initialValue}
            onSubmit={isExpert ? onSubmit : () => {}}
            enableReinitialize={true}
            validationSchema={ExpertMechanisationTabValidate}
          >
            {({ values, setFieldError, setFieldValue }) => (
              <FieldWrapper
                setFieldError={setFieldError}
                useMutate={() => null}
              >
                <Form>
                  <div style={{ margin: "30px 0px" }}>
                    <p style={{ fontWeight: "bolder" }}>
                      خدمات مکانیزاسیون کشاورزی
                    </p>
                    <Row>
                      <Col sm="6">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="نام ماشین"
                              name="machinName"
                              data={machinNameData}
                              isDisabled={!isExpert}
                              isLoading={allMachineIsFetching}
                              placeHolder="نام ماشین"
                              significant
                            />
                          </Col>
                        </Row>
                        {values.machinName ? (
                          <Row style={{ marginBottom: "20px" }}>
                            <Col>
                              <ListGroup tag="div" className="mt-1">
                                <ListGroupItem tag="a" active>
                                  اطلاعات ماشین
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  شماره شاسی:{" "}
                                  {getValue(values.machinName.chassisNumber)}
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  شماره سریال/ مدل:{" "}
                                  {getValue(
                                    values.machinName.serialNumberOrModel
                                  )}
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  شماره موتور:{" "}
                                  {getValue(values.machinName.engineNumber)}
                                </ListGroupItem>

                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  شماره پلاک:{" "}
                                  {getValue(values.machinName.plateNumber)}
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  نوع استفاده از ماشین:{" "}
                                  {getValue(
                                    values.machinName.typeOfMachineUseTitle
                                  )}
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  نوع مالکیت:{" "}
                                  {getValue(
                                    values.machinName.typeOfOwnershipTitle
                                  )}
                                </ListGroupItem>
                              </ListGroup>
                            </Col>
                          </Row>
                        ) : (
                          <></>
                        )}
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="نوع ادوات و خدمات"
                              name="toolsType"
                              data={toolsTypeData}
                              isDisabled={!isExpert}
                              placeHolder="نوع ادوات و خدمات"
                              significant
                              isLoading={allAgriculturalToolsTypesIsFetching}
                              onChange={(opt: any, e: any) => {
                                setToolsNameData([]);
                                setFieldValue("toolsType", {
                                  value: opt.value,
                                  label: opt.label,
                                });
                                getAgriculturalByTypeIdMutation.mutate(
                                  opt.value,
                                  {
                                    onSuccess: (val: any) => {
                                      let newOptions: any = [];
                                      let newList: any = [
                                        {
                                          label: "انتخاب کنید ...",
                                          options: [],
                                        },
                                      ];

                                      val.forEach((row: any) => {
                                        newOptions.push({
                                          value: row.id,
                                          label: row.title,
                                        });
                                      });
                                      newList[0].options = newOptions;
                                      setToolsNameData(newList);
                                    },
                                  }
                                );
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="نام ادوات و خدمات"
                              name="toolsName"
                              data={toolsNameData}
                              isDisabled={!isExpert}
                              placeHolder="نام ادوات و خدمات"
                              isLoading={
                                getAgriculturalByTypeIdMutation.isLoading
                              }
                              significant
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              lableText="تعداد ادوات و خدمات"
                              name="agriculturalToolsAndServicesNumber"
                              placeholder="وارد کنید ..."
                              significant
                              disabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <ListInput
                              lableText="نام کشاورزان خدمات گیرنده دارای پروانه"
                              name="clientName"
                              placeholder="کد ملی کشاورز را وارد کنید ..."
                              significant={true}
                              listData={clientNamesList}
                              disabled={!isExpert}
                              setListData={setClientNamesList}
                              isLoading={
                                getUserByNationalIdMutation.isLoading ||
                                getUserSectionMutation.isLoading
                              }
                              onAddClick={() => onClientAddClick(values)}
                            >
                              {clientNamesList.map((row: any, key: any) => {
                                return (
                                  <>
                                    <hr></hr>
                                    <Row>
                                      <Col sm="11">
                                        {" "}
                                        <p>
                                          {" "}
                                          {`کد ملی کاربر: ${row.nationalCode}`}
                                        </p>
                                      </Col>
                                      <Col sm="1">
                                        <X
                                          color="red"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setClientNamesList((prev: any) => {
                                              return prev.filter(
                                                (val: any) => val.id !== row.id
                                              );
                                            });
                                          }}
                                        />
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        <MultiCheckBoxList
                                          data={row.sections}
                                          setFieldValue={setFieldValue}
                                          ActionCell={({
                                            id,
                                          }: {
                                            id: number;
                                          }) => <ShowMapButton id={id} />}
                                          name={`clientName${row.id}`}
                                        />
                                      </Col>
                                    </Row>
                                    <hr></hr>
                                  </>
                                );
                              })}
                            </ListInput>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <ListInput
                              lableText="نام کشاورزان خدمات گیرنده فاقد پروانه"
                              name="noClientName"
                              placeholder="کد ملی کشاورز را وارد کنید ..."
                              significant={true}
                              listData={noClientNamesList}
                              disabled={!isExpert}
                              setListData={setNoClientNamesList}
                              isLoading={false}
                              onAddClick={() => {
                                const submitedNationalId = values.noClientName;
                                if (
                                  noClientNamesList.some(
                                    (row: any) =>
                                      row.nationalCode === submitedNationalId
                                  )
                                ) {
                                  return showToast(
                                    [
                                      "کاربر مورد نظر از قبل در لیست وجود دارد!",
                                    ],
                                    ToastTypes.error
                                  );
                                }

                                const userObj = {
                                  nationalCode: values.noClientName,
                                };

                                setNoClientNamesList((prev: any) => {
                                  return [...prev, userObj];
                                });
                              }}
                            >
                              {noClientNamesList.map((row: any, key: any) => {
                                return (
                                  <>
                                    <hr></hr>
                                    <Row>
                                      <Col sm="11">
                                        {" "}
                                        <p>
                                          {" "}
                                          {`کد ملی کاربر: ${row.nationalCode}`}
                                        </p>
                                      </Col>
                                      <Col sm="1">
                                        <X
                                          color="red"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setNoClientNamesList(
                                              (prev: any) => {
                                                return prev.filter(
                                                  (val: any) =>
                                                    val.id !== row.id
                                                );
                                              }
                                            );
                                          }}
                                        />
                                      </Col>
                                    </Row>

                                    <Row>
                                      <Col>
                                        <DropZone
                                          name={`areaOfWithoutLicense${row.nationalCode}`}
                                          accept=".gpx"
                                          lableText="مجموع مساحت قطعات مورد خدمات فاقد پروانه"
                                          placeholder="فایل مختصات را اینجا بکشید و رها کنید..."
                                        />
                                      </Col>
                                    </Row>
                                    <hr></hr>
                                  </>
                                );
                              })}
                            </ListInput>
                          </Col>
                        </Row>
                      </Col>
                      <Col sm="6">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="نام استان خارج از شهرستان مقیم"
                              significant={true}
                              name="province"
                              placeHolder="انتخاب کنید..."
                              data={province}
                              isDisabled={!isExpert}
                              isLoading={isFetching}
                              onChange={(opt: any, e: any) =>
                                provinceOnChange(opt, e, setFieldValue)
                              }
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="نام شهرستان خارج از شهرستان مقیم"
                              significant={true}
                              isDisabled={!isExpert}
                              name="township"
                              placeHolder="انتخاب کنید..."
                              data={township}
                              isLoading={getAllcounty.isLoading}
                              onChange={(opt: any, e: any) =>
                                townshipOnChange(opt, e, setFieldValue)
                              }
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="نام روستای خارج از شهرستان مقیم"
                              significant={true}
                              isDisabled={!isExpert}
                              placeHolder="انتخاب کنید..."
                              name="village"
                              data={village}
                              isLoading={getAllvillage.isLoading}
                              onChange={(opt: any, e: any) =>
                                villageOnChange(opt, e, setFieldValue)
                              }
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              lableText="مدت روز های اقامت در مهاجرت"
                              name="daysInImmigration"
                              placeholder="وارد کنید ..."
                              significant
                              disabled={!isExpert}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {isExpert && (
                      <Row>
                        <Col>
                          <SubmitButton
                            isLoading={false}
                            initialValue={initialValue}
                            schema={ExpertMechanisationTabValidate}
                            values={values}
                            btnText={isInEditMode ? "ثبت ویرایش" : "ثبت موقت"}
                            clearable={isInEditMode ? true : false}
                            clearableTxt="لغو ویرایش"
                            onClear={() => {
                              setIsInEditMode(false);
                              setEditRowID(0);
                              setInitialValue({
                                machinName: null,
                                toolsType: null,
                                toolsName: null,
                                clientName: "",
                                totalLicensedArea: "",
                                areaOfWithoutLicense: "",
                                province: null,
                                township: null,
                                village: null,
                                daysInImmigration: "",
                              });
                              setClientNamesList([]);
                              setNoClientNamesList([]);
                            }}
                          />
                        </Col>
                      </Row>
                    )}
                  </div>
                </Form>

                <Row style={{ marginTop: "25px" }}>
                  <Col>
                    <List
                      tableData={tableData}
                      setTableData={setTableData}
                      setInitialValues={setInitialValue}
                      setIsInEditMode={setIsInEditMode}
                      setEditRowID={setEditRowID}
                      setClientNamesList={setClientNamesList}
                      onClientAddClick={onClientAddClick}
                      setNoClientNamesList={setNoClientNamesList}
                    />
                  </Col>
                </Row>
              </FieldWrapper>
            )}
          </Formik>
          {isExpert && (
            <Formik
              initialValues={tableData}
              onSubmit={onFinalSubmit}
              enableReinitialize={true}
            >
              {({ values, setFieldError, setFieldValue }) => (
                <FieldWrapper
                  setFieldError={setFieldError}
                  useMutate={() => null}
                >
                  <Form style={{ marginTop: "25px" }}>
                    <SubmitButton
                      btnText="ثبت نهایی"
                      isLoading={
                        setMutation.isLoading || setMobilityMutation.isLoading
                      } //finalSetMutation.isLoading}
                      initialValue={tableData}
                      values={values}
                    />
                  </Form>
                </FieldWrapper>
              )}
            </Formik>
          )}
        </Col>
      </Row>
    </>
  );
};

export { Mechanisation };
