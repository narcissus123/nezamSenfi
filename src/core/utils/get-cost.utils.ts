

export const getCost  = (item: any) => {
  return `${
    item.oprator === 4
      ? `مابین ${item.from1} تا ${item.from2}`
      : item.oprator === 3
      ? `کوچکتر از ${item.from1} `
      : item.oprator === 2
      ? `بزرگتر از ${item.from1}`
      : item.oprator === 1
      ? `${item.from1}`
      : `مابین ${item.from1} تا ${item.from2}`
  } `;
} 