import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useGetMyUnUsedLicenseRequestCancellationReason } from "../../../../core/services/api/cancelation.api";
import { SubmitButton } from "../../../common/Form";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import "./CancellationDocumentsContainer.module.scss";
import "jspdf-autotable";
import { jsPDF } from "jspdf";
import { jsPdfFont } from "../../../../core/data/IRANSansWeb-normal";

const CancellationDocumentsContainer: FC = () => {
  const { data, isFetching, refetch, isSuccess } =
    useGetMyUnUsedLicenseRequestCancellationReason();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data && data.data.result) {
      const result = data.data.result;
      setDocumentTypeOptions(result);
    }
  }, [isSuccess, data]);

  const [documentTypeOptions, setDocumentTypeOptions] = useState<any>([]);

  const componentRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const downloadPdf = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 475;
    const doc: any = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const title = "اسناد مورد نیاز";
    let headers: any = [["شماره درخواست", "دلیل ابطال"]];
    let data: any = [];

    documentTypeOptions.forEach((row: any) => {
      data.push([row.licnseRequestId.toString(), row.resonTitle.toString()]);
    });

    doc.addFileToVFS("IRANSansWeb-normal.ttf", jsPdfFont);
    doc.addFont("IRANSansWeb-normal.ttf", "IRANSansWeb", "normal");

    doc.setFont("IRANSansWeb"); // set font

    doc.text(title, marginLeft, 40);
    doc.setFontSize(10);
    doc.autoTable({
      startY: 50,
      head: headers,
      theme: "grid",
      body: data,
      alternateRowStyles: { direction: "rtl" },
      styles: {
        fontSize: 9,
        font: "IRANSansWeb",
        direction: "rtl",
        halign: "center",
        cellPadding: 5,
      },
    });
    doc.save("اسناد_موردنیاز_ابطال.pdf");
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle> اسناد مورد نیاز ابطال</CardTitle>
        </CardHeader>
        <CardBody>
          {isFetching ? (
            <FallBackSpinner />
          ) : (
            <>
              <table
                id="my-table"
                dir="rtl"
                ref={componentRef}
                style={{
                  direction: "rtl",
                  textAlign: "right",
                  margin: "20px auto",
                  width: "95%",
                }}
              >
                <tr style={{ backgroundColor: "#30b854", color: "#fff" }}>
                  <th>اسناد مورد نیاز</th>
                </tr>
                <tr>
                  <table>
                    <tr
                      style={{
                        backgroundColor: "rgba(34, 41, 47, 0.05)",
                      }}
                    >
                      <td style={{ width: "33%" }}> شماره درخواست </td>
                      <td style={{ width: "66%" }}> دلیل ابطال </td>
                    </tr>
                  </table>
                  {documentTypeOptions &&
                    documentTypeOptions.map((row: any) => {
                      return (
                        <table>
                          <tr>
                            <td
                              style={{
                                width: "33%",
                              }}
                            >
                              {row.licnseRequestId}
                            </td>
                            <td style={{ width: "66%", padding: "0" }}>
                              <table>
                                <tr>
                                  <td>{row.resonTitle}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      );
                    })}
                </tr>
              </table>
              <Row className="mt-2">
                <Col md="6">
                  <SubmitButton
                    isLoading={false}
                    btnText="چاپ اسناد مورد نیاز"
                    onClick={handlePrint}
                    clearable
                    clearableTxt="ذخیره اسناد مورد نیاز بصورت PDF"
                    onClear={downloadPdf}
                  />
                </Col>
              </Row>
            </>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { CancellationDocumentsContainer };
