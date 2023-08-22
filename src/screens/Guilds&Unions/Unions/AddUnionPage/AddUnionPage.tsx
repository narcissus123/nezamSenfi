import React, { FC, Fragment, useState } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { AddNewUnion } from "../../../../components/Guilds&UnionsContainer/UnionsContainer/AddUnionCategory/AddNewUnion/AddNewUnion";
import { AddUnionCategory } from "../../../../components/Guilds&UnionsContainer/UnionsContainer/AddUnionCategory/AddUnionCategory";
import { NewUnionsList } from "../../../../components/Guilds&UnionsContainer/UnionsContainer/AddUnionCategory/NewUnionsList/NewUnionsList";



const AddUnionPage: FC = () => {
  const [initialPage, setInitialPage] = useState(0);
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="اتحادیه ها"
        breadCrumbParent="داشبورد"
        breadCrumbActive="افزودن اتحادیه"
      />

      <AddUnionCategory>
        {{
          addUnion: <AddNewUnion setInitialPage={setInitialPage} />,
          unionList: (
            <NewUnionsList
              initialPage={initialPage}
              setInitialPage={setInitialPage}
            />
          ),
        }}
      </AddUnionCategory>
    </Fragment>
  );
};

export { AddUnionPage };
