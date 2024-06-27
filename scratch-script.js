// Processes FETCH Request to OpenWeather Query URL
// fetch(queryURL)
//   .then(function (response) {
//     if (response.status !== 200) {
//       console.log(response.status);
//     } else {
//       // JSON Method reads Response Stream, parses Response Body to produce JavaScript Object
//       return response.json();
//     }
//   })
//   .then(function (data) {
//     console.log("API Data as JSON Object:");
//     console.log(data);

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

// // Creates Array to hold top-level Elements (e.g., coord, weather, base) >>
// function createArray() {
//   weatherObjectsArray = [];
//   // Reference: https://www.geeksforgeeks.org/how-to-iterate-javascript-object-containing-array-and-nested-objects/
//   Object.entries(data).forEach(([key, value]) => {
//     weatherObjectsArray.push(key);
//     return weatherObjectsArray;
//   });
// }

// createArray();
// console.log(`Weather Objects Array: ${weatherObjectsArray}`);
// // <<

// THIS DOESNT WORK TO CREATE NEW ARRAYS FROM EACH WEATHER OBJECT !!! >>>
// function multArrays(array) {
//   array.forEach((element) => {
//     // console.log(element);
//     element = [];
//     console.log(element);
//     // return element;
//   });
// }
// multArrays(weatherObjectsArray);
// // console.log(weather);
// <<<

// THIS WORKS AS STAND-ALONE
// for (let i in searchArray) {
//   // Iterates through searchArray
//   if (searchArray[i].cityLoc === inputCity) {
//     // return users[i];
//     console.log("Value Already Exists");
//     console.log(searchArray);
//     return null;
//   }
// }
