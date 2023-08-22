import React, { FC, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Alert, Card, CardHeader, CardTitle, FormGroup } from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import { OptionRowSel } from "../../../../core/models";
import {
  useCreateLicenseRequestSection,
  useSetCountyPoligon,
  useUpdateLicenseRequestSection,
} from "../../../../core/services/api";
import { showToast } from "../../../../core/utils";
import { SimpleSubmitButton } from "../../../common/Form";
import { ListTable } from "../../../common/ListTable/ListTable";
import { AddUtm } from "./AddUtm/AddUtm";
import { columns } from "./Columns";

const Utm: FC = () => {
  const [selectedCounty, setSelectedCounty] = useState<OptionRowSel | null>(
    null
  );
  const [tableData, setTableData] = useState([]);

  const setPolygon = useSetCountyPoligon();

  const onSubmit = async () => {
    if (selectedCounty === null) {
      return showToast(
        ["لطفا شهرستان مورد نظر را وارد کنید"],
        ToastTypes.error
      );
    }

    const points: any = {
      coordinates: [],
      countyId: selectedCounty.value,
    };
    tableData.forEach((node: any) => {
      points.coordinates.push({ y: node.lat, x: node.lng });
    });
    points.coordinates.push(points.coordinates[0]);

    setPolygon.mutate(points, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  return (
    <Card>
      <AddUtm
        oldData={tableData}
        setTableData={setTableData}
        setSelectedCounty={setSelectedCounty}
      />
      <hr />
      <ListTable
        columns={columns}
        isLoading={false}
        onPageChange={() => {}}
        pageCountList={0}
        tableData={tableData}
        customPageSize={100}
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
          isLoading={setPolygon.isLoading}
          btnText="ثبت قطعه"
          onCLick={onSubmit}
          disabled={tableData.length < 3}
        />
      </FormGroup>
    </Card>
  );
};

export { Utm };
