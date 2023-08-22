export const removeFullOption = (idArray : Array<any> , options : any) => {
    let newOptions : any = [];
    for (let i = 0; i < options.length; i++) {
      let newRow = [...options[i].options];
      let label = options[i].label;

      let filtered = newRow.filter((row: any) =>  !idArray.includes(row.value));
      newOptions.push({
        label: label,
        options: filtered,
      });
    }
    return newOptions;
  }

// export const removeSimpleOption = (id : any , options : any) => {
//     for (let i=0; i < options.length; i++) {
//             if (options[i].value === id) {
//               return { value: id, label: options[i].label };
//             }
//     }
// }