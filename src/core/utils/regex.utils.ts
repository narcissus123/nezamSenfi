export const isLimitedNumberRegex = (
  minLength: number,
  maxLength: number
): RegExp => new RegExp(`^([0-9]|[٠١٢٣٤٥٦٧٨٩]){${minLength},${maxLength}}$`); ///^\d{${minLength},${maxLength}}$/;

export const isLimitedNumberNullableRegex = (
  minLength: number,
  maxLength: number
): RegExp =>
  new RegExp(`^(?:([0-9]|[٠١٢٣٤٥٦٧٨٩]){${minLength},${maxLength}}|)$`); ///^\d{${minLength},${maxLength}}$/;

export const isNumberRegex = (): RegExp => /^([0-9]|[٠١٢٣٤٥٦٧٨٩])*$/;
export const isNumberPointRegex = (): RegExp =>
  /^[+-]?([0-9]|[٠١٢٣٤٥٦٧٨٩])+([.]([0-9]|[٠١٢٣٤٥٦٧٨٩])+)?$/;

export const isPersian = (): RegExp =>
  /^((\s)?[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]+(\s)?)*$/;

export const isPersianAndNumber = (): RegExp =>
  /^((\s)?[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]+([0-9]|[٠١٢٣٤٥٦٧٨٩])*(\s)?([0-9]|[٠١٢٣٤٥٦٧٨٩])*(\s)?)*$/;

export const isPersianNullable = (): RegExp =>
  /^((\s)?[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]*(\s)?)*$/;

export const isHomePhone = (): RegExp => /^0[0-9]{2,}[0-9]{3,}$/;
export const isHomePhoneNullable = (): RegExp => /^(0[0-9]{2,}[0-9]{3,})*$/;

export const isFax = (): RegExp => /^0[0-9]{2,}[0-9]{3,}$/
