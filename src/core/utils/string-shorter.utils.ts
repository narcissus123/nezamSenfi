export const stringShorter = (text: string, size: number) => {
  let newString =
    text && text.length > size ? text.slice(0, size) + "..." : text;
  return newString;
};
