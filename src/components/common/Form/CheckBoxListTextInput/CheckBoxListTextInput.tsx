import React, { FC } from "react";
import { Check } from "react-feather";
import { Col, FormGroup, ListGroup, ListGroupItem, Row } from "reactstrap";
import { TextInput } from "..";
import { CheckBox } from "../checkbox/CheckBox";

interface CheckBoxProps {
  data: Array<any>;
  setCheckBoxData: any;
}
const CheckBoxListTextInput: FC<CheckBoxProps> = ({ data, setCheckBoxData }) => {
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
                          <Row>
                            <Col
                              xs="7"
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
                            <Col xs="5">
                              <TextInput
                                disabled={!option.checked}
                                name={option.value}
                                placeholder="مساحت ( متر مربع ) ..."
                                hasLabel={false}
                              />
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

export { CheckBoxListTextInput };
