import React from "react";
import {
  Modal, Spinner,
} from "reactstrap";

import Styled from './LoadingModal.module.scss';

interface IPropTypes {
  isOpen: boolean;
}

const LoadingModal: React.FC<IPropTypes> = ({isOpen}) => {

return (
  <>
  <Modal
      isOpen={isOpen}
      className={`modal-dialog-centered ${Styled.modalHolder}`}
      contentClassName={Styled.modalContent}
    >
      <Spinner color="primary" size="lg" />
      <p style={{marginTop: '20px'}}>در حال بارگذاری...</p>
    </Modal>
  </>
);
};



export { LoadingModal };
