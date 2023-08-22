import React, {  FC, useContext, useEffect} from "react";
import { Alert, } from "reactstrap";
import { useGetActiveTariff } from "../../../../core/services/api";



interface IPropTypes{
  setActiveTarrif?: any
  setActiveTariffSuccess?: any
}

const ShowActiveTariff: FC<IPropTypes> = ({ setActiveTarrif, setActiveTariffSuccess }) => {
  const { isLoading, isSuccess, data, isFetched } = useGetActiveTariff();

  useEffect(() => {
    if (data && data.data && data.data.result) {
      setActiveTarrif(data.data.result);
    }
  }, [isSuccess]);

  useEffect(() => {
    setActiveTariffSuccess(isFetched);
  }, [isFetched]);

  return (
    <>
      {isLoading ? (
        <Alert color="warning">در حال دریافت تعرفه فعال ... </Alert>
      ) : data?.data.result ? (
        <Alert color="primary">
          {`تعرفه فعال: شناسه ${data.data.result.id} - ${data.data.result.title} با شماره نامه ${data.data.result.letterNumber}`}
        </Alert>
      ) : (
        <Alert color="danger"> تعرفه فعالی وجود ندارد!</Alert>
      )}
    </>
  );
};
export { ShowActiveTariff }
