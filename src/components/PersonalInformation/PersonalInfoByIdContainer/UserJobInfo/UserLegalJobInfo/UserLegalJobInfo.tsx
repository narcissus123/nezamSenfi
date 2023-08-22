import React, { FC, useEffect, useState } from "react";
import { CardTitle, ListGroup, ListGroupItem } from "reactstrap";

import { useUserLegalJobById } from "../../../../../core/services/api";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";

import Styles from "../../UserInfo.module.scss";

interface IPropTypes {
  id: string;
}

const UserLegalJobInfo: FC<IPropTypes> = ({ id }) => {
  const [values, setValues] = useState<any>({
    workExperience: 0,
  });

  const userInfo = useUserLegalJobById(+id);

  useEffect(() => {
    if (userInfo.data && userInfo.data.data) {
      const result = userInfo.data.data.result;

      setValues({
        workExperience: result.workExperience,
      });
    }
  }, [userInfo.isSuccess]);

  const getValue = (val: any) => {
    return val ? val : "تعیین نشده";
  };

  return userInfo.isFetching ? (
    <FallBackSpinner />
  ) : (
    <ListGroup tag="div">
      <CardTitle>اطلاعات شغلی</CardTitle>
      <ListGroupItem className={Styles["item-flex"]} tag="a">
        مدت سابقه کار: {getValue(values.workExperience)} سال
      </ListGroupItem>
    </ListGroup>
  );
};

export { UserLegalJobInfo };
