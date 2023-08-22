import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import Styled from "./AddToProductsTreeModal.module.scss"


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?:boolean;
  title?:string;
  mutation?:any
  component:React.ReactNode
}
 
 
const AddToProductsTreeModal: React.FC<IPropTypes> = ({ isOpen, toggleModal , backdrop ,title, component:Component}) => {

  return ( 
   <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className={`${Styled["modal-width"]} modal-dialog-centered`}
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>
          {
            Component
          }
        </ModalBody>
      </Modal>
    </>
  );
}
 
export {AddToProductsTreeModal}