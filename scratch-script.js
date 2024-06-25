// // THIS WORKS !!!
// for (let key in data) {
//   if (data.hasOwnProperty(key)) {
//     console.log(key, data[key]);
//   }
// }

// // THIS WORKS !!!
// Object.keys(data).forEach((key) => {
//   console.log(key, data[key]);
// });

// INTERPOLATION DOESNT PARSE INNER OBJECTS - CONSOLES [object Object]
// Object.keys(data).forEach((key) => {
//   console.log(`${key}: ${data[key]}`);
// });

// INTERPOLATION DOESNT PARSE INNER OBJECTS - CONSOLES [object Object]
// Object.entries(data).forEach(([key, value]) => {
//   console.log(`${key}: ${value}`);
// });

// THIS WORKS -ISH !!! Converts JSON Oboject to String !!!
// resData = JSON.stringify(data);
// console.log(resData);

// THIS WORKS BUT DOESNT ADDRESS NESTED OBJECTS SEE MAP-REDUCE !!!
// for (const key in data) {
//   console.log(`${key}: ${data[key]}`);
// }

// // THIS DOESNT WORK !!! ERROR MSG: resData.map IS NOT A FUNCTION -- WHAT ??? !!!
// let resData = data;
