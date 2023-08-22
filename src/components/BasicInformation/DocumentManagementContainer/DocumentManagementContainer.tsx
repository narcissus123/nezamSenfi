import React, { useState } from "react";
import { Card } from "reactstrap";
import BreadCrumbs from "../../common/@vuexy/breadCrumbs/BreadCrumb";
import { AddDocument } from "./AddDocument";
import { DocumentList } from "./DocumentList/DocumentList";

const DocumentManagementContainer: React.FC<any> = () => {
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <>
      {/* <Switch>
        <Route
          exact
          path="/BasicInformation/DocumentManagement/adddocument"
          component={AddDocument}
        />
        <Route
          exact
          path="/BasicInformation/DocumentManagement/documentlist"
          component={DocumentList}
        />
      </Switch> */}
      <BreadCrumbs
        breadCrumbTitle="اسناد ضمیمه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت اسناد ضمیمه"
      />
      <Card>
        <AddDocument setRefetch={setRefetch} />
      </Card>
      <Card>
        <DocumentList refetch={refetch} />
      </Card>
    </>
  );
};

export { DocumentManagementContainer };
