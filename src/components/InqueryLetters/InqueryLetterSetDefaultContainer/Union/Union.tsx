import * as React from "react";
import { useState } from "react";
import {
  useGetOwnedUserUnion,
  useGetOwnedUserUnionForAdmin,
  usePostSetCountyUnionInquiryLetter,
} from "../../../../core/services/api";
import { InqueryLetterSetDefaultContainer } from "../InqueryLetterSetDefaultContainer";

export interface IProps {}

const Union: React.FC<IProps> = ({}) => {
  const [unionData, setUnionData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const { data, isFetching, isSuccess } = useGetOwnedUserUnionForAdmin();

  const setMutation = usePostSetCountyUnionInquiryLetter();

  React.useEffect(() => {
    if (data) {
      try {
        const result = data.data.result;

        let newUnion = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];
        let newOptions: any = [];
        data.data.result.unions.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.unionTitle });
        });
        newUnion[0].options = newOptions;
        setUnionData(newUnion);
      } catch (e) {}
    }
  }, [isSuccess, data]);

  return (
    <>
      <InqueryLetterSetDefaultContainer
        from="Union"
        selectData={unionData}
        isLoading={isFetching}
        setMutation={setMutation}
        setLoading={setMutation.isLoading}
      />
    </>
  );
};

export { Union };
