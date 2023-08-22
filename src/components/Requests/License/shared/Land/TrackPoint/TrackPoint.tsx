import { Form, Formik } from "formik";
import React, { FC } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Alert, Card, CardBody, Col } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import {
  useCreateLicenseRequestSection,
  useUpdateLicenseRequestSection,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { DropZone, SubmitButton } from "../../../../../common/Form";
import * as utm from "utm";

interface IPropTypes {
  countyPolygon: any;
}

const TrackPoint: FC<IPropTypes> = ({ countyPolygon }) => {
  const validate = Yup.object().shape({
    track: Yup.array()
      .required("لطفا یک فایل انتخاب کنید")
      .typeError("لطفا یک فایل انتخاب کنید"),
  });

  const createLicenseSection = useCreateLicenseRequestSection();
  const updateSection = useUpdateLicenseRequestSection();
  const history = useHistory();
  const { req_id, section_id } =
    useParams<{ req_id: string; section_id: string }>();

  const getCenter = (polygon: { lat: number; lng: number }[]) => {
    try {
      //@ts-ignore
      const bounds = new google.maps.LatLngBounds();
      let i;

      // The Bermuda Triangle
      const polygonCoords: any = [];

      polygon.forEach((value) => {
        //@ts-ignore
        polygonCoords.push(
          //@ts-ignore
          new google.maps.LatLng(value.lat, value.lng)
        );
      });

      for (i = 0; i < polygonCoords.length; i++) {
        bounds.extend(polygonCoords[i]);
      }
      return {
        lat: bounds.getCenter().lat(),
        lng: bounds.getCenter().lng(),
      };
    } catch (error) {
      return {
        lat: 0,
        lng: 0,
      };
    }
  };

  const onSubmit = async (value: any) => {
    const str = await value.track[0].text();
    const doc: any = new window.DOMParser().parseFromString(str, "text/xml");

    let points: any = {
      licenseRequestId: +req_id,
      coordinates: [],
      id: +section_id,
    };
    const nodes = [...doc.getElementsByTagName("trkpt")];
    let polygon: { lat: number; lng: number }[] = [];

    // let isPointOutSideCounty: boolean = false;
    // nodes.forEach((node) => {
    //   if (
    //     PointInPolygon(
    //       { lat: node.getAttribute("lat"), lng: node.getAttribute("lon") },
    //       countyPolygon
    //     )
    //   ) {
    //     isPointOutSideCounty = true;
    //   }
    // });

    // if (isPointOutSideCounty) {
    //   return showToast(
    //     ["مختصات وارد شده خارج از شهرستان می باشد!"],
    //     ToastTypes.error
    //   );
    // }

    const center = getCenter(polygon);
    const utmZone = utm.fromLatLon(center.lat, center.lng);

    points["utmZoneOfCenter"] = utmZone.zoneNum;
    points["utmZoneChar"] = utmZone.zoneLetter;
    points["utmXOfCenter"] = utmZone.easting;
    points["utmYOfCenter"] = utmZone.northing;

    nodes.forEach((node) => {
      var lat = parseFloat(node.getAttribute("lat"));
      var lng = parseFloat(node.getAttribute("lon"));

      polygon.push({ lat: +lat, lng: +lng });
      points.coordinates.push({ y: lat, x: lng });
    });
    points.coordinates.push(points.coordinates[0]);

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

    points["sectionArea"] = area;
    points["sectionPerimeter"] = perimeter;

    if (!section_id || +section_id === 0)
      createLicenseSection.mutate(points, {
        onSuccess: (val) => {
          showToast(["با موفقیت اضافه شد"], ToastTypes.success);
          history.push(
            `/Inspection/8/GeographicalLocation/${req_id}/` + val.data.result
          );
        },
      });
    else
      updateSection.mutate(points, {
        onSuccess: (val) => {
          showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
          history.push(`/Inspection/8/UpdateLand/${req_id}/${section_id}`);
        },
      });
  };

  return (
    <Card>
      <Alert color="info">لطفا فایل مختصات (Track) را بارگذاری کنید</Alert>
      <CardBody>
        <Col sm="4">
          <Formik
            initialValues={{ track: null }}
            onSubmit={onSubmit}
            validationSchema={validate}
          >
            {({ values }) => (
              <Form>
                <DropZone
                  name="track"
                  isSingle
                  accept=".gpx"
                  lableText="فایل مختصات"
                  placeholder="فایل مختصات را اینجا بکشید و رها کنید..."
                />
                <SubmitButton
                  isLoading={createLicenseSection.isLoading}
                  btnText="ثبت قطعه"
                  values={values}
                  schema={validate}
                />
              </Form>
            )}
          </Formik>
        </Col>
      </CardBody>
    </Card>
  );
};

export { TrackPoint };
