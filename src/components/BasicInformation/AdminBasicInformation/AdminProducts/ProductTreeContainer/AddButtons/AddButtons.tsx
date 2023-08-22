import React, { useState } from "react";
import { Button } from "reactstrap";
import { Plus } from "react-feather";

import { AddProduction } from "../../ProductsContainer/AddProduction";
import { AddProductionItems } from "../../ProductsItmsContainer/AddProductionItems";
import { AddProductionFactor } from "../../ProductionFactorContainer/AddProductionFactor";
import { AddJob } from "../../../AdminJobField/JobContainer/AddJob";
import { AddToProductsTreeModal } from "./AddToProductsTreeModal";

const AddButtons: React.FC = () => {
  const [showCancelModal, setShowCancelModal] = useState<any>(false);
  const [addComponent, setAddComponent] = useState<any>(false);

  return (
    <>
      <AddToProductsTreeModal
        component={addComponent}
        mutation={() => alert("تایید درخواست")}
        isOpen={showCancelModal}
        title="تایید درخواست"
        toggleModal={() => setShowCancelModal((val: any) => !val)}
      />

      <div className="my-3 m-md-0">
        <Button
          style={{ margin: "3px" }}
          size="md"
          color="primary"
          outline
          className="p-0 btn-padding"
          onClick={() => alert("click")}
        >
          نوع کاربری
          <Plus size="20" color="#7367f0" />
        </Button>

        <Button
          style={{ margin: "3px" }}
          size="md"
          color="info"
          outline
          className="p-0 btn-padding"
          onClick={() => {
            {
              setShowCancelModal((prev: any) => !prev);
            }
            setAddComponent(<AddJob />);
          }}
        >
          شغل
          <Plus size="20" color="#00cfe8" />
        </Button>

        <Button
          style={{ margin: "3px" }}
          size="md"
          color="success"
          outline
          className="p-0 btn-padding"
          onClick={() => {
            {
              setShowCancelModal((prev: any) => !prev);
            }
            setAddComponent(<AddProductionFactor />);
          }}
        >
          عامل تولید
          <Plus size="20" color="#28c76f" />
        </Button>

        <Button
          style={{ margin: "3px", padding: "8px 16px" }}
          className="p-0 btn-padding"
          size="md"
          color="warning"
          outline
          onClick={() => {
            {
              setShowCancelModal((prev: any) => !prev);
            }
            setAddComponent(<AddProduction />);
          }}
        >
          محصول
          <Plus size="20" color="#ff9f43" />
        </Button>

        <Button
          style={{ margin: "3px" }}
          size="md"
          color="danger"
          outline
          className="p-0 btn-padding"
          onClick={() => {
            {
              setShowCancelModal((prev: any) => !prev);
            }
            setAddComponent(<AddProductionItems />);
          }}
        >
          رقم
          <Plus size="20" color="#ea5455" />
        </Button>
      </div>
    </>
  );
};

export { AddButtons };
