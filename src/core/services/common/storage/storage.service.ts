const setItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string): string | boolean | null => {
  if (localStorage.getItem(key)) return String(localStorage.getItem(key));
  return false;
};

const getItemGeneric = (key: string): string | boolean | null => {
  if (localStorage.getItem(key)) return localStorage.getItem(key);
  return false;
};

const setItemGeneric  = (key: string, value: any): void => {
  localStorage.setItem(key,value);
};

const removeItem = (key: string): void | boolean => {
  if (getItem(key) === false) return false;
  localStorage.removeItem(key);
};

const clearStorage = (): void => {
  localStorage.clear();
};

export { setItem, getItem, removeItem, clearStorage , setItemGeneric ,getItemGeneric};
