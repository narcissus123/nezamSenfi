import { GoogleMap, LoadScriptNext, Polygon } from "@react-google-maps/api";
import React from "react";
import { FormGroup, Modal, ModalBody, ModalHeader } from "reactstrap";
import { FallBackSpinner } from "../../../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import $ from 'jquery'

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  data: any;
}

const EditModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  data,
}) => {
  let polygon: { lat: number; lng: number }[] = [];
  data.forEach((row: { x: number; y: number }) => {
    polygon.push({ lng: row.x, lat: row.y });
  });

  console.log("--data,,", polygon);

  const targetNode = document.body;
  const nodeConfig = {attributes: true, childList: true, subtree: true};
  const callback = function (mutationsList: any, observer: any) {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          $('div[style*="background-color: rgba(0, 0, 0, 0.5)"]').remove();
          $(
            'div[style*="background-color: white; font-weight: 500; font-family: Roboto, sans-serif; padding: 15px 25px; box-sizing: border-box; top: 5px; border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 5px; left: 50%; max-width: 375px; position: absolute; transform: translateX(-50%); width: calc(100% - 10px); z-index: 1;"]'
          ).remove();
        }
      }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, nodeConfig);

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
        size="lg"
      >
        <ModalHeader toggle={toggleModal}>مشاهده قطعه روی نقشه</ModalHeader>
        <ModalBody>
          <FormGroup style={{ height: "100vh" }} className="w-100 mt-2">
            <LoadScriptNext
              id="script-loader"
              googleMapsApiKey="AIzaSyAZY39rkhAz-qzchvth09A906OvFkUqwoc"
              language="en"
              region="us"
              loadingElement={<FallBackSpinner />}
              version="weekly"
            >
              <GoogleMap
                mapTypeId="hybrid"
                mapContainerClassName="App-map"
                center={polygon.length > 0 ? polygon[0] : { lat: 0, lng: 0 }}
                zoom={12}
              >
                <Polygon path={polygon} />
              </GoogleMap>
            </LoadScriptNext>
          </FormGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export { EditModal };
