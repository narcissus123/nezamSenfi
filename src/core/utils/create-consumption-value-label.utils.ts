import { getCost } from "./get-cost.utils";

export const createConsumptionValueLabel = (result : {id: number , from1: number,  from2: number, oprator:number, type:number}) => {

  return {
    value: result.id,
    label: getCost(result),
  };
}