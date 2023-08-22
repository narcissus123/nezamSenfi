import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import {
  useGetLocationInformation,
  useServeGuildRoomFileByAdmins,
  useServeUnionFileByAdmins,
  useShowServeGuildRoomFileByAdmins,
  useShowServeUnionFileByAdmins,
} from "../../../../../../core/services/api";
import { isSameString } from "../../../../../../core/utils/same-string.utils";
import { DownloadRow } from "../../../../../common/DownloadRow/DownloadRow";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styled from "./LocationInfoDetails.module.scss";

interface IPropTypes {
  data: any;
  type: string;
  isOpen: boolean;
}

const LocationInfoDetails: React.FC<IPropTypes> = ({ data, type, isOpen }) => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [locationNames, setLocationNames] = useState<any>(null);

  const getLocationInformationMutation = useGetLocationInformation();

  useEffect(() => {
    if (data) {
      if (data.cityId) {
        getLocationInformationMutation.mutate(data.cityId, {
          onSuccess: (val: any) => {
            const result = val.data.result;
            setLocationNames(result);
          },
        });
      }
    }
  }, [data.cityId]);

  return (
    <>
      {getLocationInformationMutation.isLoading ? (
        <FallBackSpinner setHeight={200} />
      ) : (
        <>
          <ListGroupItem tag="a" active>
            مشخصات مکانی
          </ListGroupItem>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem tag="a" className={Styled["item-flex"]}>
              استان : {locationNames ? locationNames.province : ""}
            </ListGroupItem>
            <ListGroupItem tag="a" className={Styled["item-flex"]}>
              شهرستان : {locationNames ? locationNames.county : ""}
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem tag="a" className={Styled["item-flex"]}>
              شهر مرکزی شهرستان : {locationNames ? locationNames.city : ""}
            </ListGroupItem>
            <ListGroupItem tag="a" className={Styled["item-flex"]}>
              کد پستی : {data.postalCode}
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem tag="a" className={Styled["item-flex"]}>
              ایمیل : {data.email}
            </ListGroupItem>
            <ListGroupItem tag="a" className={Styled["item-flex"]}>
              آدرس : {data.address}
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem tag="a" className={Styled["item-flex"]}>
              تلفن : {data.phone}
            </ListGroupItem>

            <ListGroupItem className={Styled["item-flex"]}>
              <div className="d-flex">
                <p>اسناد ارسالی &nbsp;</p>
                {isLoading && (
                  <Spinner
                    className={Styled["padding-top-spinner"]}
                    color="success"
                    size="sm"
                  />
                )}
              </div>

              {data.locationFiles ? (
                <>
                  {data.locationFiles.map((row: any, key: any) => {
                    return (
                      <>
                        {isOpen && (
                          <DownloadRow
                            mutate={
                              isSameString(type, "union")
                                ? useServeUnionFileByAdmins
                                : useServeGuildRoomFileByAdmins
                            }
                            type={
                              isSameString(type, "union")
                                ? "UnionAdmin"
                                : "GuildAdmin"
                            }
                            row={{
                              fileName: row,
                              guildRoomRequestId: data.id,
                              isUnion: isSameString(type, "union"),
                            }}
                            // setIsShow={(val: boolean) => setIsOpen(val)}
                            useServeShowFile={
                              isSameString(type, "union")
                                ? useShowServeUnionFileByAdmins
                                : useShowServeGuildRoomFileByAdmins
                            }
                          />
                        )}
                        <hr />
                      </>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </ListGroupItem>
          </ListGroup>
        </>
      )}
    </>
  );
};

export { LocationInfoDetails };
