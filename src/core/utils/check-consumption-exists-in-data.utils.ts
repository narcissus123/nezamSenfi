import { FullOptionSel } from "../models";

export const checkConsumptionExistsInData = (id: number , options: FullOptionSel[] ) => {
  console.log('--options-' , options);
  console.log('--id-' , id);
  
  if(!id){
    return true;
  }
  try {
    for (let i = 0; i < options.length; i++) {
      for (let j = 0; j < options[i].options.length; j++) {
        if (options[i].options[j].value === id) {
          return true;
        }
      }
    }
    return false;
  } catch {
    return false;
  }
}