import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { AddJahadUser } from "./AddJahadUser/AddJahadUser";
import { List } from "./List/List";





const UsersContainer = () => {

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>افزودن کاربر</CardTitle>
        </CardHeader>
        <CardBody>
          <AddJahadUser />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>لیست کاربران</CardTitle>
        </CardHeader>
        <CardBody>
          <List />
        </CardBody>
      </Card>
      
    </>
  );
};

export { UsersContainer };
