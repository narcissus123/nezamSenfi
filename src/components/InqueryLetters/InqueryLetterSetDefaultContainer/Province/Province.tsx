import * as React from "react";
import { useState } from "react";
import {
  useGetOwnedUserProvinceGuildRooms,
  useGetOwnedUserProvinceGuildRoomsForAdmin,
  usePostSetProvinceGuildRoomInquiryLetter,
} from "../../../../core/services/api";
import { InqueryLetterSetDefaultContainer } from "../InqueryLetterSetDefaultContainer";

export interface IProps {}

const Province: React.FC<IProps> = ({}) => {
  const [provinceData, setProvinceData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const { data, isFetching, isSuccess } =
    useGetOwnedUserProvinceGuildRoomsForAdmin();
  const setMutation = usePostSetProvinceGuildRoomInquiryLetter();

  React.useEffect(() => {
    if (data) {
      try {
        const result = data.data.result;

        let newProvince = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];
        let newOptions: any = [];
        data.data.result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        newProvince[0].options = newOptions;
        setProvinceData(newProvince);
      } catch (e) {}
    }
  }, [isSuccess, data]);

  return (
    <>
      <InqueryLetterSetDefaultContainer
        from="Province"
        selectData={provinceData}
        isLoading={isFetching}
        setMutation={setMutation}
        setLoading={setMutation.isLoading}
      />
    </>
  );
};

export { Province };
