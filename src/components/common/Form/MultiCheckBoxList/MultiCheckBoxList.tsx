import React, { FC, useState , useEffect, ReactNode, Component, } from "react";
import { Check, Eye } from "react-feather";
import { Button, Col, FormGroup, ListGroup, ListGroupItem, Row } from "reactstrap";
import { CheckBox } from "../checkbox/CheckBox";

interface CheckBoxProps {
  data: Array<any>;
  setFieldValue: any
  name : string
  ActionCell? :any
}
const MultiCheckBoxList: FC<CheckBoxProps> = ({ data : checkBoxData , setFieldValue , name , ActionCell }) => {

  const [ data , setCheckBoxData] = useState<any>([])

  useEffect(()=>{
    setCheckBoxData(checkBoxData)
  }, [checkBoxData])

  useEffect(() => {
    setFieldValue(name, data);
  }, [data]);

  return (
    <>
      {data.map((row: any, key: any) => {
        if (row.isActive && row.options.length > 1) {
          return (
            <FormGroup>
              <Row>
                <Col>
                  <ListGroup tag="div">
                    <ListGroupItem active>
                      {row.label}
                      <div style={{ float: "left" }}>
                        <CheckBox
                          setCheckBoxData={setCheckBoxData}
                          data={data}
                          currentId={{
                            group: row.groupId,
                            optionValue: row.options[row.options.length - 1].id,
                          }}
                          color="muted"
                          icon={<Check className="vx-icon" size={16} />}
                          label={row.options[row.options.length - 1].label}
                          value={row.options[row.options.length - 1].value}
                          checked={row.options[row.options.length - 1].checked}
                          defaultChecked={false}
                        />
                      </div>
                    </ListGroupItem>

                    {row.options.map((option: any, key: any) => {
                      if (option.isAll) {
                        return <></>;
                      }
                      return (
                        <ListGroupItem>
                          <Row>
                            <Col
                              xs="9"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <CheckBox
                                setCheckBoxData={setCheckBoxData}
                                data={data}
                                currentId={{
                                  group: row.groupId,
                                  optionValue: option.id,
                                }}
                                color="primary"
                                icon={<Check className="vx-icon" size={16} />}
                                label={option.label}
                                value={option.value}
                                checked={option.checked}
                                defaultChecked={false}
                              />
                            </Col>
                            <Col xs="3">
                              {ActionCell && <ActionCell id={option.coordinates}/> }
                            </Col>
                          </Row>
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                </Col>
              </Row>
            </FormGroup>
          );
        } else {
          return <></>;
        }
      })}
    </>
  );
};

export { MultiCheckBoxList };
