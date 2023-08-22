import React, { FC, useEffect, useRef, useState } from "react";
import { Modal, ModalBody } from "reactstrap";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Styled from "./ShowImage.module.scss";

interface IPropTypes {
  image: string;
  isOpen: boolean;
  modalSize?: string;
  toggle: () => void;
  ///modalSize?: string;
}

const ShowImage: FC<IPropTypes> = ({
  modalSize = "lg",
  image,
  isOpen,
  toggle,
}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const ref: any = useRef(null);
  //console.log(image);

  useEffect(() => {
    if (ref.current && isLoaded) {
      setSize({
        height: ref.current.clientHeight,
        width: ref.current.clientWidth,
      });
    }
  }, [ref, isOpen, isLoaded]);

  return (
    <Modal
      toggle={toggle}
      isOpen={isOpen}
      unmountOnClose={true}
      className="modal-dialog-centered"
      size={modalSize}
    >
      <ModalBody>
        <div className="show-image-body">
          <TransformWrapper>
            <TransformComponent>
              <img src={image} alt="عکس آپلود شده" className={Styled.image} />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </ModalBody>
    </Modal>
  );
};

export { ShowImage };
