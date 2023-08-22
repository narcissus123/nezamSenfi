import { Field, Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { FullOptionSel, OptionRowSel } from "../../../../../../../core/models";
import {
  useGetAllSectionProximity,
  useSetLicenseRequestBoundaries,
} from "../../../../../../../core/services/api";
import { fullOption, showToast } from "../../../../../../../core/utils";
import { useGlobalState } from "../../../../../../../core/utils/context/GlobalContext";
import { BoundariesValidation } from "../../../../../../../core/validations/inspection.boundaries.validations";
import {
  SimpleSubmitButton,
  SubmitButton,
  TextInput,
  Toggle,
} from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTablePaginate } from "../../../../../../common/ListTablePaginate/ListTablePaginate";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner";
import { columns } from "./Columns";
import { ShowBoundariesMap } from "./ShowBoundariesMap";

interface IValue {
  hasBoundaries: boolean;
  boundaryTypeId: any;
  ownerName: string;
  distance: string;
  realDistance:string;
  geographicalDirection: OptionRowSel | null;
  x: number;
  y: number;
  id?: number | null;
}

interface IPropTypes {
  useMutation: any;
  isExpert: boolean;
  getSection: any;
}

const DistancesBoundaries: FC<IPropTypes> = ({
  isExpert,
  useMutation,
  getSection,
}) => {
  const [distancesBoundariesList, setDistancesBoundariesList] = useState<any>(
    []
  );
  const [validationControll, setValidationControll] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(8);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [realDistance, setRealDistance] = useState<number>(0);
  const [typeDistance, setTypeDistance] = useState<FullOptionSel[]>([]);

  const { boundaryList } = useGlobalState();

  const geoDirection = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "شمال" },
        { value: 2, label: "جنوب" },
        { value: 3, label: "شرق" },
        { value: 4, label: "غرب" },
        { value: 5, label: "شمال شرقی" },
        { value: 6, label: "شمال غربی" },
        { value: 7, label: "جنوب شرقی" },
        { value: 8, label: "جنوب غربی" },
      ],
    },
  ];

  const [initialValues, setInitialValues] = useState<IValue>({
    hasBoundaries: false,
    boundaryTypeId: null,
    ownerName: "",
    distance: "",
    realDistance:"",
    geographicalDirection: null,
    y: 0,
    x: 0,
    id: null,
  });

  const { section_id } = useParams<{ section_id: string }>();

  const getAllSectionProximity = useGetAllSectionProximity();
  const setBoundaries = useSetLicenseRequestBoundaries();
  const getBoundaries = useMutation(+section_id);

  useEffect(() => {
    if (lat === 0 && lng === 0 && distance === 0 && realDistance === 0)
      setInitialValues((old: IValue) => ({
        ...old,
        y: 0,
        x: 0,
        distance: "",
        realDistance:"",
        hasBoundaries: true,
      }));
    else
      setInitialValues((old: IValue) => ({
        ...old,
        y: lat,
        x: lng,
        distance: distance.toString(),
        realDistance: realDistance.toString(),
        hasBoundaries: true,
      }));
  }, [lat, lng, distance, realDistance]);

  useEffect(() => {
    if (validationControll) getAllSectionProximity.mutate();
  }, [validationControll]);

  useEffect(() => {
    if (
      getBoundaries.isSuccess &&
      validationControll &&
      boundaryList[0].length === 0
    ) {
      try {
        const result = getBoundaries.data.data.result.boundaries;
        const localBounds: any = [];
        result.forEach((item: any) => {
          localBounds.push({
            ownerName: item.ownerName,
            distance: parseFloat(item.distance).toFixed(2),
            realDistance: item.distance,
            geographicalDirection: fullOption(
              item.geographicalDirection,
              geoDirection
            )
              ? fullOption(item.geographicalDirection, geoDirection)
              : null,
            x: item.x,
            y: item.y,
            boundaryTypeId: {
              value: item.boundaryTypeId,
              label: item.boundaryTypeTitle,
            },
            id: item.id,
          });
        });
        setDistancesBoundariesList(localBounds);
        boundaryList[1](localBounds);
      } catch (error) {}
    } else if (getBoundaries.isSuccess) {
      setValidationControll(true);
    } else if (boundaryList[0].length > 0) {
      setDistancesBoundariesList(boundaryList[0]);
      console.log("done");
    }
  }, [getBoundaries.isSuccess, validationControll]);

  useEffect(() => {
    if (getAllSectionProximity.isSuccess) {
      try {
        const result = getAllSectionProximity.data?.data.result;
        const typeObj: any[] = [
          { label: "یک گزینه را انتخاب کنید...", options: [] },
        ];
        result.forEach((item: any) => {
          typeObj[0].options.push({ value: item.id, label: item.name, type: 2 });
        });
        setTypeDistance(typeObj);
      } catch (error) {}
    }
  }, [getAllSectionProximity.isSuccess]);

  useEffect(() => {
    if (getAllSectionProximity.data && getAllSectionProximity.data.data) {
      try {
        const result = getAllSectionProximity.data?.data.result;
        if (result.length > 0) {
          setInitialValues((prev: any) => {
            return { ...prev, hasBoundaries: true };
          });
        }
      } catch (error) {}
    }
  }, [getAllSectionProximity.data]);

  const onAddBoundry = (values: IValue, { resetForm }: any) => {
    const itemData = {
      geographicalDirection: values.geographicalDirection,
      boundaryTypeId: values.boundaryTypeId,
      ownerName: values.ownerName,
      distance: values.distance,
      realDistance: values.realDistance,
      y: values.y,
      x: values.x,
      id: values.id
        ? values.id
        : distancesBoundariesList.length > 0
        ? distancesBoundariesList.reduce((it: any, cur: any) =>
            it.id >= cur.id ? it : cur
          ).id + 1
        : 1,
    };

    if (values.id) {
      const distanceItemIndex = distancesBoundariesList.findIndex(
        ({ id }: any) => id === values.id
      );
      const allData = distancesBoundariesList;
      allData[distanceItemIndex] = itemData;

      setDistancesBoundariesList([]);
      setDistancesBoundariesList(allData);
      boundaryList[1](allData);
    } else {
      boundaryList[1]([...distancesBoundariesList, itemData]);
      setDistancesBoundariesList((old: any) => [...old, itemData]);
    }
    resetForm();
    setInitialValues({
      hasBoundaries: true,
      boundaryTypeId: null,
      ownerName: "",
      distance: "",
      realDistance: "",
      geographicalDirection: null,
      y: 0,
      x: 0,
      id: null,
    });
  };

  const onFinalSubmit = () => {

    const boundaries: {
      ownerName: string;
      distance: string;
      geographicalDirection: number;
      x: string;
      y: string;
      boundaryTypeId: number;
    }[] = [];

    distancesBoundariesList.forEach((item: any) => {
      boundaries.push({
        ownerName: item.ownerName,
        distance: item.realDistance,
        geographicalDirection: item.geographicalDirection
          ? item.geographicalDirection.value
          : 0,
        x: item.x,
        y: item.y,
        boundaryTypeId: item.boundaryTypeId ? item.boundaryTypeId.value : 0,
      });
    });

    const boundariesObj = {
      sectionId: +section_id,
      boundaries: boundaries,
    };

    setBoundaries.mutate(boundariesObj, {
      onSuccess: () => {
        showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
      },
    });
  };

  return (
    <>
      {getBoundaries.isLoading ? (
        <FallBackSpinner />
      ) : (
        <>
          <hr />

          <Formik
            initialValues={initialValues}
            onSubmit={isExpert ? onAddBoundry : () => {}}
            enableReinitialize
            validationSchema={BoundariesValidation}
          >
            {({ resetForm, setFieldValue, values }) => (
              <Form className="w-100 mb-2">
                <Row>
                  <Col>
                    <Toggle
                      id="hasBoundaries"
                      name="hasBoundaries"
                      lableText="فواصل و حرایم"
                      significant
                      direction="ltr"
                      className="my-1"
                      disabled={!isExpert || distancesBoundariesList.length > 0}
                      onChange={(opt: any) => {
                        setFieldValue("hasBoundaries", opt.target.checked);
                        setValidationControll(opt.target.checked);
                      }}
                    />
                  </Col>
                </Row>

                {values.hasBoundaries && (
                  <>
                    <Row>
                      <Col>
                        {isExpert && boundaryList[0].length > 0 && (
                          <Alert color="info">
                            لطفا برای ثبت اطلاعات وارد شده ثبت نهایی را بزنید
                          </Alert>
                        )}
                        {isExpert && (
                          <Row>
                            <Field name="id" className="d-none" />
                            <Col sm="4">
                              <BasicSelectOption
                                data={typeDistance}
                                name="boundaryTypeId"
                                isLoading={getAllSectionProximity.isLoading}
                                lableText="نوع"
                                placeHolder="یک مورد را انتخاب کنید..."
                                significant
                                onChange={(opt) => {
                                  setFieldValue("boundaryTypeId", opt);
                                  setInitialValues((old) => ({
                                    ...old,
                                    boundaryTypeId: opt,
                                  }));
                                }}
                              />
                            </Col>
                            {values.boundaryTypeId &&
                              values.boundaryTypeId.type === 2 && (
                                <Col sm="4">
                                  <TextInput
                                    name="ownerName"
                                    lableText="نام مالک"
                                    placeholder="نام مالک را وارد کنید"
                                    significant
                                    onChange={(val) => {
                                      setFieldValue("ownerName", val);
                                      setInitialValues((old) => ({
                                        ...old,
                                        ownerName: val,
                                      }));
                                    }}
                                  />
                                </Col>
                              )}

                            <Col sm="4">
                              <TextInput
                                name="distance"
                                lableText="فاصله (متر)"
                                placeholder="فاصله را وارد کنید"
                                significant
                              />
                            </Col>
                            <Col sm="4">
                              <BasicSelectOption
                                data={geoDirection}
                                name="geographicalDirection"
                                lableText="جهت جغرافیایی"
                                placeHolder="یک مورد را انتخاب کنید..."
                                significant
                                onChange={(opt) => {
                                  setFieldValue("geographicalDirection", opt);
                                  setInitialValues((old) => ({
                                    ...old,
                                    geographicalDirection: opt,
                                  }));
                                }}
                              />
                            </Col>
                            <Col sm="4">
                              <TextInput
                                name="y"
                                lableText="طول جغرافیایی"
                                onChange={(val: any) => setLat(val)}
                                placeholder="طول جغرافیایی را وارد کنید"
                                significant
                              />
                            </Col>
                            <Col sm="4">
                              <TextInput
                                name="x"
                                lableText="عرض جغرافیایی"
                                placeholder="عرض جغرافیایی را وارد کنید"
                                significant
                                onChange={(val: any) => setLng(val)}
                              />
                            </Col>
                          </Row>
                        )}
                        {isExpert && (
                          <Row>
                            <Col>
                              {" "}
                              <SubmitButton
                                isLoading={false}
                                btnText="ثبت موقت"
                                clearable
                                onClear={() => {
                                  resetForm();
                                  setInitialValues({
                                    hasBoundaries: true,
                                    boundaryTypeId: null,
                                    ownerName: "",
                                    distance: "",
                                    realDistance: "",
                                    geographicalDirection: null,
                                    y: 0,
                                    x: 0,
                                    id: null,
                                  });
                                  setLat(0);
                                  setLng(0);
                                }}
                              />
                            </Col>
                          </Row>
                        )}
                        <ListTablePaginate
                          columns={columns}
                          setPageCountList={setPageCount}
                          isLoading={false}
                          onPageChange={() => {}}
                          pageCountList={pageCount}
                          customPageSize={4}
                          getCustomProps={{
                            setDistancesBoundariesList:
                              setDistancesBoundariesList,
                            setInitialValues: setInitialValues,
                            isExpert: isExpert,
                          }}
                          tableData={distancesBoundariesList}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {isExpert && (
                          <SimpleSubmitButton
                            type="button"
                            isLoading={setBoundaries.isLoading}
                            btnText="ثبت نهایی "
                            onCLick={onFinalSubmit}
                            className="mt-2"
                          />
                        )}

                        <ShowBoundariesMap
                          getSection={getSection}
                          lat={lat}
                          lng={lng}
                          setLat={setLat}
                          setLng={setLng}
                          setDistance={setDistance}
                          setRealDistance={setRealDistance}
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export { DistancesBoundaries };
