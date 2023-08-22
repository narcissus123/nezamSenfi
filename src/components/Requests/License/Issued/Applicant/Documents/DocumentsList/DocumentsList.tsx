import React, { FC, Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { SubmitButton } from "../../../../../../common/Form";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { jsPDF } from "jspdf";
import { jsPdfFont } from "../../../../../../../core/data/IRANSansWeb-normal";
import "jspdf-autotable";
import  "./DocumentsList.module.scss";


interface IPropTypes {
  licenseDetail: any
}

const DocumentsList: FC<IPropTypes> = ({
  licenseDetail: documentTypeOptions,
}) => {
  const downloadPdf = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 475;
    const doc: any = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const title = "اسناد مورد نیاز";
    let headers: any = [["نوع سند", "نام سند"]];
    let data: any = [];

    documentTypeOptions.forEach((row: any) => {
      row.documents.forEach((row2: any) => {
        data.push([row.title.toString(), row2.title.toString()]);
      });
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

  const componentRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle> اسناد مورد نیاز صدور</CardTitle>
        </CardHeader>
        <CardBody>
          <>
            <table
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
                    <td style={{ width: "33%" }}> نوع سند </td>
                    <td style={{ width: "66%" }}> نام سند </td>
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
                            <p> {row.title}</p>
                            <p>{row.customDescription}</p>
                          </td>
                          <td style={{ width: "66%", padding: "0" }}>
                            <table>
                              {row.documents &&
                                row.documents.map((row2: any) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{row2.title}</td>
                                      </tr>
                                    </>
                                  );
                                })}
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
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { DocumentsList };
