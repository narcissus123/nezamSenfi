import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReportPlanSectionMapForUser } from "../../../../../core/services/api";
import { SimpleSubmitButton } from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { MapDetails } from "./MapDetails/MapDetails";
import Style from './FacilityPlanContainer.module.scss';



interface IPropTypes {
  getMutation: any
}

const FacilityPlanContainer: FC<IPropTypes> = ({ getMutation }) => {
  //@ts-ignore
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
            <div className={Style.map}>
              <MapDetails sectionInfo={details.licenseInfo.sectionInfos} />
            </div>

            <div>
              <table className={Style.tableContainer}>
                <thead>
                  <tr>
                    <td
                      className={Style.noborder}
                      style={{ width: "30%" }}
                    ></td>
                    <td
                      className={Style.noborder}
                      style={{ width: "70%" }}
                    ></td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td colSpan={2} style={{ padding: 0, border: "none" }}></td>
                  </tr>
                  <tr>
                    <td
                      rowSpan={2}
                      className={`${Style.noborder} ${Style.padzero}`}
                      style={{ verticalAlign: "top" }}
                    >
                      <table
                        className={`${Style.tableContainer} ${Style.tablebordercollapse}`}
                      >
                        <tbody className="td-pad-0-3">
                          <tr>
                            <td>مقیاس نقشه</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>عنوان نقشه</td>
                            <td>پیان موقعیت زمین</td>
                          </tr>
                          <tr>
                            <td>متقاضی</td>
                            <td>{details.beneficiaryInfo.name}</td>
                          </tr>
                          <tr>
                            <td>کارفرما</td>
                            <td>{details.licenseInfo.unionInfo.unionName}</td>
                          </tr>
                          <tr>
                            <td>زمینه فعالیت</td>
                            <td>{details.beneficiaryInfo.mainJob}</td>
                          </tr>
                          <tr>
                            <td>عنوان قطعه</td>
                            <td>
                              {details.licenseInfo.sectionInfos[0].farmName}
                            </td>
                          </tr>
                          <tr>
                            <td>مساحت</td>
                            <td>{`${details.licenseInfo.sectionInfos[0].area.toFixed(
                              2
                            )} متر مربع`}</td>
                          </tr>
                          <tr>
                            <td>پیرامون</td>
                            <td>
                              {`${details.licenseInfo.sectionInfos[0].around.toFixed(
                                2
                              )} متر مربع`}
                            </td>
                          </tr>
                          <tr>
                            <td>استان </td>
                            <td>
                              {details.licenseInfo.sectionInfos[0].province}
                            </td>
                          </tr>
                          <tr>
                            <td>شهرستان</td>
                            <td>
                              {details.licenseInfo.sectionInfos[0].county}
                            </td>
                          </tr>
                          <tr>
                            <td>محل فعالیت</td>
                            <td>
                              {
                                details.licenseInfo.sectionInfos[0]
                                  .addressSection
                              }
                            </td>
                          </tr>
                          <tr>
                            <td>تاریخ ثبت</td>
                            <td>
                              {details.licenseInfo.sectionInfos[0].dateRegister}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style={{ height: "150px" }}>
                      <h2 style={{ textAlign: "center", margin: "15px" }}>
                        تاسیسات
                      </h2>
                      <tr>
                        <td
                          style={{
                            border: 0,
                            verticalAlign: "top",
                            width: "100%",
                          }}
                        >
                          <table style={{ width: "545px" }}>
                            <thead>
                              <th>ردیف</th>
                              <th>کد</th>
                              <th>مسقف</th>
                              <th>نوع ساختمان</th>
                              <th>ابعاد</th>
                              <th>پوشش دیوار</th>
                              <th>پوشش سقف</th>
                              <th>پوشش کف</th>
                              <th>مختصات</th>
                            </thead>

                            {/* {details.licenseInfo.sectionInfos[0].tree.map(
                              (row: any) => {
                                return (
                                  <tr>
                                    <td>1</td>
                                    <td>{row.typetree}</td>
                                    <td>{row.productionFactor}</td>
                                    <td>{row.productionFactor}</td>
                                    <td>{row.seedlingBase}</td>
                                    <td>{row.numberOfOriginals}</td>
                                    <td>{row.cultivatedArea}</td>
                                    <td>{row.ageOfTrees}</td>
                                    <td>{`${row.treeDimensionsLength} در ${row.treeDimensionsWidth} متر مربع`}</td>
                                  </tr>
                                );
                              }
                            )} */}
                          </table>
                        </td>
                      </tr>
                    </td>
                  </tr>

                  <tr>
                    <td className="noborder pad-0">
                      <table
                        className="table table-bordered table-border-collapsed no-fix"
                        style={{
                          borderCollapse: "collapse",
                          fontSize: "80%",
                          border: "1px solid #ddd",
                          marginTop: "3px",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td>
                              <div className="surv pull-right">
                                <div className="pull-right">
                                  <strong>مشخصات کارشناس</strong>
                                  <br />
                                  نام کارشناس:{" "}
                                  {details.licenseInfo.expertInfo.name}
                                  <br />
                                  شماره نظام:{" "}
                                  {details.licenseInfo.expertInfo.systemNumber}
                                  <br />
                                  شماره پروانه اشتغال:
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="float-right"></div>
                              <div className="surv pull-right">
                                <div className="pull-right">
                                  <strong>
                                    {details.licenseInfo.unionInfo.unionName}
                                  </strong>
                                  <br />
                                  تایید کننده:{" "}
                                  {
                                    details.licenseInfo.unionInfo
                                      .responsibleForApproving
                                  }
                                  <br />
                                  پست سازمانی:{" "}
                                  {
                                    details.licenseInfo.unionInfo
                                      .organizationalPosition
                                  }
                                  <br />
                                  &nbsp;
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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

export { FacilityPlanContainer };