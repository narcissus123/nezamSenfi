import React, { FC } from "react";
import { Check } from "react-feather";
import { Col, FormGroup, ListGroup, ListGroupItem, Row } from "reactstrap";
import { CheckBox } from "../checkbox/CheckBox";

interface CheckBoxProps {
  data: Array<any>;
  setCheckBoxData: any;
}
const CheckBoxList: FC<CheckBoxProps> = ({ data, setCheckBoxData }) => {
  return (
    <>
      {data.map((row, key) => {
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
                            disabled={option.isDisabled}
                          />
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

export { CheckBoxList };
