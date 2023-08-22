import React, { FC } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Styles from "./SubsetOfJobs.module.scss";


interface IPropTypes {
  initialValues:any
}

const SubsetOfJobs: FC<IPropTypes> = ({ initialValues }) => {
  
  return (
    <div style={{ margin: "20px 0px" }}>
      {initialValues && (
        <>
          {initialValues.useTypes.map((row: any, key: any) => {
            return (
              <>
                <ListGroup className="list-group-horizontal-sm">
                  <ListGroupItem style={{ flex: 1 }} active>
                    {`مشاغل نوع کاربری : ${row.title}`}
                  </ListGroupItem>
                </ListGroup>
                <ListGroup
                  className="list-group-horizontal-sm"
                  style={{ margin: "10px 0px" }}
                >
                  <ul>
                    {row.unionRequestUseTypeJobs.map((row2: any, key: any) => {
                      return <li> {row2.title} </li>;
                    })}
                  </ul>
                </ListGroup>
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export { SubsetOfJobs };
