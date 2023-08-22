import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSectionOfLicenseRequestByIdByIssuingResponsible } from "../../../../../../../../../../core/services/api";
import { ListTable } from "../../../../../../../../../common/ListTable/ListTable";
import { CardWrapper } from "../../../../../../../../../common/Wrapper/CardWrapper/CardWrapper";
import { columns } from "./Columns";
import * as utm from "utm";

const PartCoordinatesList: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tableData, setTableData] = useState([]);

  const { isLoading, isSuccess, data } =
    useGetSectionOfLicenseRequestByIdByIssuingResponsible(+id);

  const rad = function (x: number): number {
    return (x * Math.PI) / 180;
  };

  const getDistance = function (
    p1: { y: number; x: number },
    p2: { y: number; x: number }
  ) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.x - p1.x);
    var dLong = rad(p2.y - p1.y);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.x)) *
        Math.cos(rad(p2.x)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };
  useEffect(() => {
    if (isSuccess) {
      const result = data?.data.result;
      //   console.log(result);
      const cords = result.coordinates;
      const tableDataList: any = [];
      cords.forEach((el: { y: number; x: number }, index: number) => {
        console.log(index, cords.length);

        if (cords.length - 1 > index) {
          const distance = getDistance(el, cords[index + 1]);
          const utmObj = utm.fromLatLon(el.x, el.y);
          tableDataList.push({
            id: index + 1,
            lat: el.x,
            lng: el.y,
            utm: utmObj.zoneNum + utmObj.zoneLetter,
          });
          tableDataList.push({
            distance: distance,
            hasBetweenVal: true,
          });
        } else {
          const utmObj = utm.fromLatLon(el.x, el.y);
          tableDataList.push({
            id: index + 1,
            lat: el.x,
            lng: el.y,
            utm: utmObj.zoneNum + utmObj.zoneLetter,
          });
        }
      });
      setTableData(tableDataList);
    }
  }, [isSuccess]);

  return (
    <CardWrapper text="مختصات قطعه">
      <ListTable
        columns={columns}
        isLoading={isLoading}
        onPageChange={() => {}}
        pageCountList={0}
        customPageSize={1000}
        tableData={tableData}
        showPrint
      >
        {{
          headerTable: <></>,
        }}
      </ListTable>
    </CardWrapper>
  );
};

export { PartCoordinatesList };
