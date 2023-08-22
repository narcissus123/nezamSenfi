import React, { FC, Fragment } from "react";

export interface ICountReport {
  counts: {
    issuedCount: number;
    extendedCount: number;
    changedCount: number;
    finishedCount: number;
  };
  jobId: number;
  jobTitle: string;
}

interface IPropTypes {
  data: ICountReport[];
  componentRef: any
}

const ReportGrid: FC<IPropTypes> = ({ data, componentRef }) => {
  return (
    <Fragment>
      <div ref={componentRef}>
        {data.map((row: ICountReport, key: any) => {
          return (
            <>
              <div
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor:'#ccc'
                }}
              >
                {row.jobTitle}
              </div>
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    borderLeft: "1px solid #000",
                    flex: 1,
                    padding: "15px",
                  }}
                >
                  {`صادر شده`}
                </div>
                <div style={{ textAlign: "center", flex: 1, padding: "15px" }}>
                  {`${row.counts.issuedCount} پروانه`}
                </div>
              </div>

              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    borderLeft: "1px solid #000",
                    flex: 1,
                    padding: "15px",
                  }}
                >
                  {`تمدید شده`}
                </div>
                <div style={{ textAlign: "center", flex: 1, padding: "15px" }}>
                  {`${row.counts.extendedCount} پروانه`}
                </div>
              </div>

              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    borderLeft: "1px solid #000",
                    flex: 1,
                    padding: "15px",
                  }}
                >
                  {`باطل شده`}
                </div>
                <div style={{ textAlign: "center", flex: 1, padding: "15px" }}>
                  {`${row.counts.finishedCount} پروانه`}
                </div>
              </div>

              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    borderLeft: "1px solid #000",
                    flex: 1,
                    padding: "15px",
                  }}
                >
                  {`تغییر و صدور مجدد`}
                </div>
                <div style={{ textAlign: "center", flex: 1, padding: "15px" }}>
                  {`${row.counts.changedCount} پروانه`}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </Fragment>
  );
};

export { ReportGrid };
