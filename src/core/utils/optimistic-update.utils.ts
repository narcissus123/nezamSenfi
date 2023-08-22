
export const updateListById = (list:any,id:any,value:any) => {
  const newList = [...list]
  const foundIndex = newList.findIndex((item:any) => item.id === id);
  newList[foundIndex] = value
  
  return newList
}