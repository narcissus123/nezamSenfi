export const fullOption = (id: any, options: any) => {
  try {
    for (let i = 0; i < options.length; i++) {
      for (let j = 0; j < options[i].options.length; j++) {
        if (options[i].options[j].value === id) {
          return {
            ...options[i].options[j],
            value: id,
            label: options[i].options[j].label,
          };
        }
      }
    }
    return { value: 0, label: "" };
  } catch (error) {
    return { value: 0, label: "" };
  }
};

export const simpleOption = (id: any, options: any) => {
  try {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === id) {
        return { ...options[i], value: id, label: options[i].label };
      }
    }
    return { value: 0, label: "" };
  } catch (error) {
    return { value: 0, label: "" };
  } 
};

export const multiFullOption = (ids: any, options: any) => {
  try {
    let newArray: any = [];
    for (let k = 0; k < ids.length; k++) {
      for (let i = 0; i < options.length; i++) {
        for (let j = 0; j < options[i].options.length; j++) {
          if (options[i].options[j].value === ids[k].value) {
            newArray.push({
              ...options[i].options[j],
              value: ids[k].value,
              label: options[i].options[j].label,
            });
          }
        }
      }
    }

    return newArray;
  } catch (error) {
    return []
  }
};

export const multiSimpleOption = (ids: any, options: any) => {
  try {
    let newArray: any = [];
    for (let k = 0; k < ids.length; k++) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === ids[k].value) {
          newArray.push({
            ...options[i],
            value: ids[k].value,
            label: options[i].label,
          });
        }
      }
    }

    return newArray;
  } catch (error) {
    return [];
  }
};







