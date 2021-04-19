/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import getDimensions from './getDimensions';
// import tmData from '../data/treatmentData_sonic';

export function getFieldsForSize(data, sizeQuery) {
  // console.log(data);

  // Get unique fields for the treatment
  const flags = [];
  const treatmentFields = [];
  for (let i = 0; i < data.length; i++) {
    if (flags[data[i].name]) continue;
    flags[data[i].name] = true;
    treatmentFields.push(data[i].name);
  }

  const arr = [];
  // Reformat the data to group by field name
  treatmentFields.forEach((field) => {
    const check = getDimensions(field, data);
    if (check.length > 1) {
      arr[field] = check;
      // console.log(arr);
    }
  });
  const myVal = [];
  // grouped by field; loop through top level
  for (const [key, value] of Object.entries(arr)) {
    // inside field groups- now find the right size per field
    value.forEach((val) => {
      if (val.size === sizeQuery) {
        // console.log(val);
        myVal.push(val);
      }
    });
  }

  return myVal;
}
