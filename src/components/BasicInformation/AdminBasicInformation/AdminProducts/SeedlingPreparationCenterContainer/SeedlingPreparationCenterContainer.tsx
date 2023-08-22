import React from "react";
import { AdminProductsWrapper } from "../AdminProductsWrapper/AdminProductsWrapper";
import { AddSeedlingPreparationCenterContainer } from "./AddSeedlingPreparationCenterContainer/AddSeedlingPreparationCenterContainer";
import { ListSeedlingPreparationCenterContainer } from "./ListSeedlingPreparationCenterContainer/ListSeedlingPreparationCenterContainer";

const SeedlingPreparationCenterContainer: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="ثبت و مدیریت مراکز تهیه نهال / بذر">
        <AddSeedlingPreparationCenterContainer />
      </AdminProductsWrapper>
      <AdminProductsWrapper text="لیست مراکز">
        <ListSeedlingPreparationCenterContainer />
      </AdminProductsWrapper>
    </>
  );
};

export { SeedlingPreparationCenterContainer };
