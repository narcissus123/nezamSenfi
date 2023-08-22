import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SimpleSubmitButton } from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Style from './PointContainer.module.scss'



interface IPropTypes {
  getMutation: any;
}

const PointContainer: FC<IPropTypes> = ({ getMutation }) => {
  document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";

  const [details, setDetails] = useState<any>({
    beneficiaryInfo: {
      userType: "",
      name: "",
      nationalCode: "",
      mainJob: "",
    },
    licenseInfo: {
      allArea: 0,
      FixedOrMobieTypeByExpert: 2,
      sectionInfos: [
        {
          farmName: "",
          area: 0,
          around: 0,
          province: "",
          county: "",
          addressSection: "",
          dateRegister: "",
          locationType: "",
          boundaryInfo: [
            {
              ownerName: "",
              distance: "",
              geographicalDirection: "",
              centerPointX: 0,
              centerPointY: 0,
            },
          ],
          topography: {
            topographyStatus: "",
            northSteep: true,
            eastSteep: false,
            southSteep: false,
            westSteep: false,
            slopePercentage: "",
            soilStatus: "",
            sourceOfWater: "",
          },
          productSections: [
            {
              jobName: "",
              productFactorName: "",
              product: "",
              figur: "",
              allowableMaximumCapacity: 0,
            },
          ],
          buildingSections: [],
          pointsSection: [
            {
              x: 0,
              y: 0,
              utm: "",
              distance: 0,
            },
          ],
          tree: [
            {
              typetree: "",
              productionFactor: "",
              seedlingBase: "",
              numberOfOriginals: 0,
              cultivatedArea: 0,
              ageOfTrees: "",
              treeDimensionsLength: 0,
              treeDimensionsWidth: 0,
              seedlingPreparationCenter: "",
            },
          ],
        },
      ],
      expertInfo: {
        name: "",
        systemNumber: "",
        signatureFullFilePath: null,
      },
      unionInfo: {
        unionName: null,
        responsibleForApproving: null,
        organizationalPosition: "",
        signatureFullFilePath: null,
      },
    },
  });

  const getDetailsMutation = getMutation();
  const { id, section_id } = useParams<any>();

  useEffect(() => {
    getDetailsMutation.mutate(
      { licenseRequestId: +id, sectionId: +section_id },
      {
        onSuccess: (val: any) => {
          const result = val.data.result;
          setDetails(result);
        },
      }
    );
  }, []);

  return (
    <>
      {getDetailsMutation.isLoading ? (
        <FallBackSpinner />
      ) : (
        <>
          <div className={Style.paper}>
            <div
              style={{
                backgroundColor: "#f1f1f1",
                height: "110px",
                border: "1px solid #ddd",
                fontSize: "21px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{}}
              >{`قطعه شماره ${details.licenseInfo.sectionInfos[0].sectionId} - ${details.beneficiaryInfo.name}`}</h1>
            </div>
            <table className={Style.tableContainer}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>طول</th>
                  <th>عرض</th>
                  <th>UTM</th>
                  <th colSpan={2}>فاصله</th>
                </tr>
              </thead>

              <tbody>
                {details.licenseInfo.sectionInfos[0].pointsSection.map(
                  (row: any, key: any) => {
                    return (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{row.x}</td>
                        <td>{row.y}</td>
                        <td>{row.utm}</td>
                        <td colSpan={2}>{row.distance}</td>
                      </tr>
                    );
                  }
                )}
                <tr>
                  <td colSpan={6}>
                    ستون های طول و عرض حاوی طول و عرض جغرافیایی ( مختصات ) هر
                    نقطه است. ستون فاصله، حاوی فاصله بین هر دو نقطه از زمین است.
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <div className="surv pull-right">
                      <div className="pull-right">
                        <strong>مشخصات کارشناس</strong>
                        <br />
                        نام کارشناس: {details.licenseInfo.expertInfo.name}
                        <br />
                        شماره نظام:{" "}
                        {details.licenseInfo.expertInfo.systemNumber}
                        <br />
                        شماره پروانه اشتغال:
                      </div>
                    </div>
                  </td>
                  <td colSpan={3}>
                    <div className="surv pull-right">
                      <div className="pull-right">
                        <strong>
                          {details.licenseInfo.unionInfo.unionName}
                        </strong>
                        <br />
                        تایید کننده:{" "}
                        {details.licenseInfo.unionInfo.responsibleForApproving}
                        <br />
                        پست سازمانی:{" "}
                        {details.licenseInfo.unionInfo.organizationalPosition}
                        <br />
                        &nbsp;
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <SimpleSubmitButton
                isLoading={false}
                btnText="چاپ"
                onCLick={() => {
                  window.print();
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { PointContainer };
