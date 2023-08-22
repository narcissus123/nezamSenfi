import * as React from "react";
import { useState } from "react";
import { Info, X } from "react-feather";
import { Button, Col, Popover, PopoverBody, PopoverHeader, Row } from "reactstrap";

export interface IPropTypes {
  id: string
  placement: "top" | "bottom" | "left" | "right"
  text: string
  title: string
}

const DetailsPopover: React.FC<IPropTypes> = ({id, placement, text, title}) => {

  const [ isOpen , setIsOpen ] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((prev: boolean) => !prev);
  }
 
  return (
    <div style={{ position: "relative" }}>
      <Info
        style={{
          cursor: "pointer",
          position: "absolute",
          left: "8px",
          top: "-23px",
        }}
        size={20}
        color="#7367f0"
        onClick={toggle}
        id={`Popover-${id}`}
      />

      {isOpen && (
        <Popover
          placement={placement}
          isOpen={isOpen}
          target={`Popover-${id}`}
          toggle={toggle}
          color="warning"
        >
          <PopoverHeader>
            <Row>
              <Col xs="10"> {title} </Col>
              <Col xs="2">
                <X
                  color="white"
                  style={{ cursor: "pointer" }}
                  size={18}
                  onClick={toggle}
                />
              </Col>
            </Row>
          </PopoverHeader>
          <PopoverBody>{text}</PopoverBody>
        </Popover>
      )}
    </div>
  );
};

export { DetailsPopover };
