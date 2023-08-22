import * as React from "react";
import { useState } from "react";
import {
  useGetOwnedUserCountyGuildRooms,
  useGetOwnedUserCountyGuildRoomsForAdmin,
  usePostSetCountyGuildRoomInquiryLetter,
} from "../../../../core/services/api";
import { InqueryLetterSetDefaultContainer } from "../InqueryLetterSetDefaultContainer";

const County: React.FC = () => {
  const [countyData, setCountyData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const { data, isFetching, isSuccess } =
    useGetOwnedUserCountyGuildRoomsForAdmin();

  const setMutation = usePostSetCountyGuildRoomInquiryLetter();

  React.useEffect(() => {
    if (data) {
      try {
        const result = data.data.result;

        let newCounty = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];
        let newOptions: any = [];
        data.data.result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        newCounty[0].options = newOptions;
        setCountyData(newCounty);
      } catch (e) {}
    }
  }, [isSuccess, data]);

  return (
    <>
      <InqueryLetterSetDefaultContainer
        from="County"
        selectData={countyData}
        isLoading={isFetching}
        setMutation={setMutation}
        setLoading={setMutation.isLoading}
      />
    </>
  );
};

export { County };
