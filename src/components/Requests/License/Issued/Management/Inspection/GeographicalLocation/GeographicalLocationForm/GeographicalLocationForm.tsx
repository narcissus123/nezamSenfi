import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as utm from "utm";
import { locationTypes } from "../../../../../../../../core/data";
import { ToastTypes } from "../../../../../../../../core/enums";
import { DocumentTypeEnum } from "../../../../../../../../core/enums/document-category-type.enum";
import {
  useGetDocumentByDocumentCategoryTypeEnum,
  useSetOwnershipOfLicenseRequest,
} from "../../../../../../../../core/services/api";
import { fullOption, showToast } from "../../../../../../../../core/utils";
import { useGlobalState } from "../../../../../../../../core/utils/context/GlobalContext";
import { geographicalLocationValidation } from "../../../../../../../../core/validations/geographical-location.validation";
import {
  FieldWrapper,
  MultiSelectOption,
  SubmitButton,
  TextArea,
  TextInput,
} from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { TwoColumn } from "../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import $ from 'jquery'

interface IPropTypes {
  useMutation: any;
  isExpert: boolean;
  useGetSectionOfLicenseRequestById: any;
}

const GeographicalLocationForm: React.FC<IPropTypes> = ({
  useMutation,
  isExpert,
  useGetSectionOfLicenseRequestById,
}) => {
  const [initialValues, setinitialValues] = useState<any>({
    // must create model in core
    ownershipType: null,

    address: "",
    farmName: "",
    location: null,
    postalCode: "",

    area: 0,
    environment: 0,
    centerCoordinatesLength: 0,
    centerCoordinatesWidth: 0,
    centerCoordinatesUTM: 0,
  });
  const [polygon, setPolygon] = useState<{ lat: number; lng: number }[]>([]);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [ownershipLoaded, setOwnershipLoaded] = useState<boolean>(false);

  const targetNode = document.body;
  const nodeConfig = { attributes: true, childList: true, subtree: true };
  const callback = function (mutationsList: any, observer: any) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        $('div[style*="background-color: rgba(0, 0, 0, 0.5)"]').remove();
        $(
          'div[style*="background-color: white; font-weight: 500; font-family: Roboto, sans-serif; padding: 15px 25px; box-sizing: border-box; top: 5px; border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 5px; left: 50%; max-width: 375px; position: absolute; transform: translateX(-50%); width: calc(100% - 10px); z-index: 1;"]'
        ).remove();
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, nodeConfig);

  const { section_id } = useParams<{ section_id: string }>();

  const { ownerShipList } = useGlobalState();

  const getSection = useGetSectionOfLicenseRequestById(+section_id);

  const setMutation = useSetOwnershipOfLicenseRequest();
  const { section_id: id }: any = useParams();

  const getOwnerShip = useMutation(+id);

  const [ownershipTypes, setOwnershipTypes] = useState<any>([
    {
      label: " انتخاب کنید ...",
      options: [],
    },
  ]);

  useEffect(() => {
    if (getSection.isSuccess) {
      const result = getSection.data.data.result.coordinates;
      // console.log(result);

      const serverPolygon: { lat: number; lng: number }[] = [];

      result.forEach((item: { y: number; x: number }) => {
        serverPolygon.push({
          lat: item.y,
          lng: item.x,
        });
      });
      setPolygon(serverPolygon);
      // // @ts-ignore
      // const bermudaTriangle = new google.maps.Polygon({
      //   paths: serverPolygon,
      // });

      // console.log(bermudaTriangle);
    }
  }, [getSection.isSuccess]);

  useEffect(() => {
    if (polygon.length > 0 && mapLoaded) {
      // @ts-ignore
      const bermudaTriangle = new google.maps.Polygon({
        paths: polygon,
      });

      //@ts-ignore
      const area = google.maps.geometry.spherical.computeArea(
        bermudaTriangle.getPath()
      );
      //@ts-ignore
      const perimeter = google.maps.geometry.spherical.computeLength(
        bermudaTriangle.getPath()
      );

      setinitialValues((val: any) => ({
        ...val,
        area: area,
        environment: perimeter,
      }));
    }
  }, [polygon, mapLoaded]);

  const getLicenseTypeMutation = useGetDocumentByDocumentCategoryTypeEnum();
  const getLocationTypeMutation = useGetDocumentByDocumentCategoryTypeEnum();

  useEffect(() => {
    getLicenseTypeMutation.mutate(DocumentTypeEnum.OwenerShip, {
      onSuccess: (val: any) => {
        const result = val.data.result;
        const newLicenseTypes: any = [];
        result.forEach((category: any) => {
          let opt: any = [];
          category.documents.forEach((row: any) => {
            opt.push({ value: row.documentId, label: row.documentTitle });
          });

          newLicenseTypes.push({ label: category.categoryTitle, options: opt });
        });
        setOwnershipTypes(newLicenseTypes);
      },
    });
  }, []);

  useEffect(() => {

    if (getOwnerShip.isSuccess && ownerShipList[0] === null) {
      const result = getOwnerShip.data.data.result;

      const toUtm = utm.fromLatLon(result.y, result.x);

      let postalCodeDocumentIds: any = [];

      if (result.postalCodeDocumentIds) {
        result.postalCodeDocumentIds.forEach((row: any) => {
          postalCodeDocumentIds.push({ value: row, label: "" });
        });
      }

      const ownerShipObj = {
        centerCoordinatesUTM:
          toUtm.zoneNum +
          toUtm.zoneLetter +
          " " +
          toUtm.northing +
          " " +
          toUtm.easting,
        address: result.adress,
        //area: result.filedArea,
        centerCoordinatesLength: result.x,
        centerCoordinatesWidth: result.y,
        //environment: result.filedPerimeter,
        farmName: result.farmName,
        postalCode: result.postalCode,
        ownershipType: result.typeOfOwnershipDocumentId
          ? {
              value: result.typeOfOwnershipDocumentId,
              label: result.typeOfOwnershipDocumentTutle,
            }
          : { value: 0, label: "لطفا انتخاب کنید..." },
        location: fullOption(result.locationType, locationTypes)
          ? fullOption(result.locationType, locationTypes)
          : { value: 0, label: "لطفا انتخاب کنید..." },
        northAdjacent: result.northAdjacent,
        eastAdjacent: result.eastAdjacent,
        southAdjacent: result.southAdjacent,
        westAdjacent: result.westAdjacent,
      };

      setinitialValues((val: any) => ({ ...val, ...ownerShipObj }));

      ownerShipList[1](ownerShipObj);
    } else if (ownerShipList[0]) {
      setinitialValues(ownerShipList[0]);
    }
  }, [getOwnerShip.isSuccess]);

  const onSubmit = (value: any) => {
    let PostalCodeDocumentIds: any = [];

    const setOwnershipObj = {
      sectionId: id,
      typeOfOwnershipDocumentId: value.ownershipType.value,
      adress: value.address,
      farmName: value.farmName,
      postalCode: value.postalCode,
      locationType: value.location.value,
      filedArea: value.area,
      postalCodeDocumentIds: PostalCodeDocumentIds,
      filedPerimeter: value.environment,
      x: value.centerCoordinatesWidth,
      y: value.centerCoordinatesLength,
      northAdjacent: value.northAdjacent,
      eastAdjacent: value.eastAdjacent,
      southAdjacent: value.southAdjacent,
      westAdjacent: value.westAdjacent,
    };

    setMutation.mutate(setOwnershipObj, {
      onSuccess: (value: any) => {
        showToast(["با موفقیت انجام شد!"], ToastTypes.success);
        ownerShipList[1](null);
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={geographicalLocationValidation}
      onSubmit={isExpert ? onSubmit : () => {}}
      enableReinitialize={true}
    >
      {({ values, setFieldError, setFieldValue }) => (
        <FieldWrapper setFieldError={setFieldError} useMutate={() => null}>
          {getOwnerShip.isLoading ? (
            <FallBackSpinner />
          ) : (
            <Form>
              <TwoColumn>
                <div>
                  <BasicSelectOption
                    lableText="نوع سند مالکیت"
                    name="ownershipType"
                    placeHolder="انتخاب کنید ..."
                    data={ownershipTypes}
                    isLoading={getLicenseTypeMutation.isLoading}
                    significant
                    isDisabled={!isExpert}
                  />

                  <TextArea
                    lableText="ادرس"
                    name="address"
                    placeholder="ادرس"
                    disabled={!isExpert}
                  />
                  <TextInput
                    lableText="نام مزرعه "
                    name="farmName"
                    placeholder="نام مزرعه "
                    significant
                    disabled={!isExpert}
                  />
                  <TextInput
                    lableText="کد پستی "
                    name="postalCode"
                    placeholder="کد پستی "
                    significant
                    disabled={!isExpert}
                  />
                  <TextInput
                    lableText="مجاورت شمالی"
                    name="northAdjacent"
                    placeholder="مجاورت شمالی"
                    significant
                    disabled={!isExpert}
                  />
                  <TextInput
                    lableText="مجاورت شرقی"
                    name="eastAdjacent"
                    placeholder="مجاورت شرقی"
                    significant
                    disabled={!isExpert}
                  />
                  <TextInput
                    lableText="مجاورت جنوبی"
                    name="southAdjacent"
                    placeholder="مجاورت جنوبی"
                    significant
                    disabled={!isExpert}
                  />
                  <TextInput
                    lableText="مجاورت غربی"
                    name="westAdjacent"
                    placeholder="مجاورت غربی"
                    significant
                    disabled={!isExpert}
                  />
                  <BasicSelectOption
                    lableText="موقعیت مکانی"
                    name="location"
                    data={locationTypes}
                    placeHolder="موقعیت مکانی را وارد کنید..."
                    significant
                    isDisabled={!isExpert}
                  />
                </div>
                <div>
                  <TextInput
                    disabled={true}
                    lableText="مساحت قطعه (متر مربع)"
                    name="area"
                    placeholder="مساحت قطعه (متر مربع)"
                    significant
                  />
                  <TextInput
                    disabled={true}
                    lableText="محیط قطعه (متر)"
                    name="environment"
                    placeholder="محیط قطعه (متر)"
                    significant
                  />
                  <TextInput
                    disabled={true}
                    lableText="مختصات مرکز طول"
                    name="centerCoordinatesLength"
                    placeholder="مختصات مرکز طول"
                    significant
                  />
                  <TextInput
                    disabled={true}
                    lableText="مختصات مرکز عرض"
                    name="centerCoordinatesWidth"
                    placeholder="مختصات مرکز عرض"
                    significant
                  />
                  <TextInput
                    disabled={true}
                    lableText="مختصات مرکز"
                    name="centerCoordinatesUTM"
                    placeholder="مختصات مرکز"
                    significant
                  />
                </div>
              </TwoColumn>
              {isExpert && (
                <SubmitButton
                  isLoading={setMutation.isLoading}
                  schema={geographicalLocationValidation}
                  btnText="ثبت"
                  values={values}
                  initialValue={initialValues}
                />
              )}
            </Form>
          )}

          <div className="d-none">
            <LoadScriptNext
              id="script-loader"
              googleMapsApiKey="AIzaSyAZY39rkhAz-qzchvth09A906OvFkUqwoc"
              language="en"
              region="us"
              libraries={["geometry"]}
              loadingElement={<FallBackSpinner />}
              version="weekly"
            >
              <GoogleMap
                mapTypeId="hybrid"
                mapContainerClassName="App-map"
                onLoad={() => {
                  setMapLoaded(true);
                }}
              >
                {/* {polygon.length > 0 && (
                  <Polygon path={polygon} onLoad={calcArea} />
                )} */}
              </GoogleMap>
            </LoadScriptNext>
          </div>
        </FieldWrapper>
      )}
    </Formik>
  );
};

export { GeographicalLocationForm };
