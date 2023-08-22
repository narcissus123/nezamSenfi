import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Alert, Card, CardHeader, CardTitle, FormGroup } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import {
  useCreateLicenseRequestSection,
  useUpdateLicenseRequestSection,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { SimpleSubmitButton } from "../../../../../common/Form";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { AddLatLng } from "./AddLatLng/AddLatLng";
import { columns } from "./Columns";
import * as utm from "utm";
interface IPropTypes {
  countyPolygon: any;
}

const LatLng: FC<IPropTypes> = ({ countyPolygon }) => {
  const createLicenseSection = useCreateLicenseRequestSection();
  const updateSection = useUpdateLicenseRequestSection();
  const history = useHistory();
  const [tableData, setTableData] = useState<any>([]);
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

  const onSubmit = async () => {
    let points: any = {
      licenseRequestId: +req_id,
      coordinates: [],
      id: +section_id,
    };

    if(tableData.length === 1) {
      points.coordinates.push({ y: tableData[0].lat, x: tableData[0].lng });
      points.coordinates.push({
        y: +tableData[0].lat - 0.000001,
        x: +tableData[0].lng,
      });
      points.coordinates.push({
        y: +tableData[0].lat,
        x: +tableData[0].lng - 0.000002,
      });
    }else if (tableData.length === 2) {
      points.coordinates.push({ y: tableData[0].lat, x: tableData[0].lng });
      points.coordinates.push({
        y: +tableData[1].lat,
        x: +tableData[1].lng,
      });
      points.coordinates.push({
        y: +tableData[1].lat,
        x: +tableData[1].lng - 0.000002,
      });
    }else {
      tableData.forEach((node: any) => {
        points.coordinates.push({ y: node.lat, x: node.lng });
      });
    }

    points.coordinates.push(points.coordinates[0]);

    let polygon = tableData.map((node: any) => ({
      lat: +node.lat,
      lng: +node.lng,
    }));

    const center = getCenter(polygon);
    const utmZone = utm.fromLatLon(center.lat, center.lng);

    points["utmZoneOfCenter"] = utmZone.zoneNum;
    points["utmZoneChar"] = utmZone.zoneLetter;
    points["utmXOfCenter"] = utmZone.easting;
    points["utmYOfCenter"] = utmZone.northing;

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
          showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
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
      <Alert color="info"> نقاط را وارد کنید </Alert>
      <AddLatLng
        countyPolygon={countyPolygon}
        oldData={tableData}
        setTableData={setTableData}
      />
      <hr />
      <ListTable
        columns={columns}
        isLoading={false}
        onPageChange={() => {}}
        pageCountList={0}
        tableData={tableData}
        customPageSize={100}
        getCustomProps={{ setTableData }}
      >
        {{
          headerTable: (
            <FormGroup>
              <CardHeader>
                <CardTitle>لیست نقاط وارد شده</CardTitle>
              </CardHeader>
            </FormGroup>
          ),
        }}
      </ListTable>

      <FormGroup>
        <SimpleSubmitButton
          isLoading={createLicenseSection.isLoading}
          btnText="ثبت قطعه"
          onCLick={onSubmit}
        />
      </FormGroup>
    </Card>
  );
};

export { LatLng };
