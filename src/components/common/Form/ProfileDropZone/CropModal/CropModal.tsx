import React, { FC, useCallback, useState } from "react";
import {
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Cropper from "react-easy-crop";
import { SimpleSubmitButton } from "../..";
import getCroppedImg from "./CroppImage";
import Styles from "./CropModal.module.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface IPropTypes {
  isOpen: boolean;
  toggle: () => void;
  file: string;
  setFieldValue: (val: any) => void;
  fileType: string;
}

const CropModal: FC<IPropTypes> = ({
  isOpen,
  toggle,
  file,
  setFieldValue,
  fileType,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  //const [file, setFile] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        file,
        croppedAreaPixels,
        rotation
      );

      const blob = await (await fetch(croppedImage)).blob();
      const exportFile: File = new File([blob], "untitled." + fileType);
      setFieldValue([exportFile]);
      toggle();
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>ویرایش عکس</ModalHeader>
      <ModalBody>
        <div className={Styles["cropper-holder"]}>
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={4 / 4}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </ModalBody>

      <ModalFooter className="d-flex justify-content-start">
        <Slider
          min={34}
          value={zoom * 34}
          onChange={(val) => setZoom(val / 34 < 1 ? 1 : val / 34)}
        />

        <SimpleSubmitButton
          btnText="تایید"
          isLoading={false}
          onCLick={showCroppedImage}
        />
      </ModalFooter>
    </Modal>
  );
};

export { CropModal };
