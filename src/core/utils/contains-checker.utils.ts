
export const MultiContainsChecker = (value : Array<{value : number ; label : string}> , id : number )=> {
  if (!value) {
    return false;
  }
  return value.some((e: any) => e.value === id);
};
