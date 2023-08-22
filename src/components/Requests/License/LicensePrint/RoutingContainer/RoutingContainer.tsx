import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { useReportRoutingMap } from "../../../../../core/services/api";
import { stringShorter } from "../../../../../core/utils";
import { SimpleSubmitButton } from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { MapDetails } from "./MapDetails/MapDetails";
import Style from './RoutingContainer.module.scss';



interface IPropTypes {
  getMutation: any
}

const RoutingContainer: FC<IPropTypes> = ({ getMutation }) => {

  const getTitle = (title: string) => {
    if (!title) {
      return "تعیین نشده است";
    }
    return title;
  };

  //@ts-ignore
  document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";
  const [emptySize, setEmptySize] = useState<any>(new Array(10));
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

  const { id } = useParams<any>();

  useEffect(() => {
    getDetailsMutation.mutate(id, {
      onSuccess: (val: any) => {
        const result = val.data.result;

        setDetails(result);
        let arr: any = [];
        if (result.licenseInfo.sectionInfos.length) {
          for (
            let i = 0;
            i <= 8 - result.licenseInfo.sectionInfos.length;
            i++
          ) {
            arr.push("t");
          }
          setEmptySize(arr);
        }
      },
    });
  }, []);

  console.log("--empty--", emptySize);
  

  return (
    <>
      {getDetailsMutation.isLoading ? (
        <FallBackSpinner />
      ) : (
        <>
          <div className={Style.paper}>
            {details.licenseInfo &&
              details.licenseInfo.fixedOrMobieTypeByExpert === 1 && (
                <div className={Style.map}>
                  <MapDetails
                    licenseInfo={details.licenseInfo}
                    sectionInfo={details.licenseInfo.sectionInfos}
                  />
                </div>
              )}
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
                            <td>عنوان نقشه</td>
                            <td>کروکی زمین</td>
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
                            <td>مساحت کل</td>
                            <td>{details.licenseInfo.allArea}</td>
                          </tr>
                          {details.licenseInfo.sectionInfos &&
                            details.licenseInfo.sectionInfos.length > 0 && (
                              <>
                                <tr>
                                  <td>استان </td>
                                  <td>
                                    {
                                      details.licenseInfo.sectionInfos[0]
                                        .province
                                    }
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
                              </>
                            )}
                        </tbody>
                      </table>
                    </td>
                    <td
                      style={{
                        overflow: "hidden",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                      }}
                    >
                      {details.licenseInfo &&
                        details.licenseInfo.fixedOrMobieTypeByExpert === 1 && (
                          <>
                            <>
                              {details.licenseInfo.sectionInfos.map(
                                (row: any, key: any) => {
                                  return (
                                    <div
                                      style={{
                                        width: "32%",
                                        height: "240px",
                                        border: "1px solid #ccc",
                                        padding: "7px",
                                        margin: "3px",
                                      }}
                                    >
                                      <p
                                        style={{
                                          textAlign: "center",
                                          margin: "3px 0px",
                                        }}
                                      >
                                        {`قطعه شماره ${key + 1}`}
                                      </p>

                                      {row.boundaryInfo.map((row2: any) => {
                                        return (
                                          <>
                                            <p
                                              style={{
                                                fontSize: "10px",
                                                margin: "2px 0px",
                                              }}
                                            >{`${
                                              row2.geographicalDirection
                                            }: ${getTitle(row2.ownerName)}`}</p>
                                          </>
                                        );
                                      })}

                                      <p
                                        style={{
                                          fontSize: "10px",
                                          margin: "2px 0px",
                                        }}
                                      >
                                        {`کد پستی: ${getTitle(row.postalCode)}`}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "10px",
                                          margin: "2px 0px",
                                        }}
                                      >
                                        {`آدرس: ${stringShorter(
                                          getTitle(row.address),
                                          45
                                        )}`}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "10px",
                                          margin: "2px 0px",
                                        }}
                                      >
                                        {`نوع سند مالکیت: ${getTitle(
                                          row.typeOfOwnershipDocument
                                        )}`}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "10px",
                                          margin: "2px 0px",
                                        }}
                                      >
                                        {`موقعیت مکانی: ${getTitle(
                                          row.locationTypeTitle
                                        )}`}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </>
                          </>
                        )}

                      {details.licenseInfo &&
                        details.licenseInfo.fixedOrMobieTypeByExpert === 1 && (
                          <>
                            {emptySize.map((row: any, key: any) => {
                              return (
                                <div
                                  style={{
                                    width: "32%",
                                    height: "240px",
                                    border: "1px solid #ccc",
                                    padding: "7px",
                                    margin: "3px",
                                  }}
                                >
                                  <p
                                    style={{
                                      textAlign: "center",
                                      margin: "2px 0px",
                                    }}
                                  >
                                    {`قطعه`}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      margin: "2px 0px",
                                    }}
                                  >
                                    شمالی
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      margin: "2px 0px",
                                    }}
                                  >
                                    شرقی
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      margin: "2px 0px",
                                    }}
                                  >
                                    جنوبی
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      margin: "2px 0px",
                                    }}
                                  >
                                    غربی
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      margin: "2px 0px",
                                    }}
                                  >
                                    کد پستی
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      margin: "2px 0px",
                                    }}
                                  >
                                    آدرس
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      margin: "2px 0px",
                                    }}
                                  >
                                    نوع سند مالکیت
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      margin: "2px 0px",
                                    }}
                                  >
                                    موقعیت مکانی
                                  </p>
                                </div>
                              );
                            })}
                          </>
                        )}
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

export { RoutingContainer };
