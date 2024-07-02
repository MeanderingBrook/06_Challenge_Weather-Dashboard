//   .then(function (response) {
// fetch(queryURL)
// Processes FETCH Request to OpenWeather Query URL
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

// JS CODE FROM displayWeather(data) INSTEAD OF JQUERY
// // OpenWeather 'data' Nodes >>
// // Stores OpenWeather 'data' - Coordinate: Longitude
// let coordLongNode = data.coord.lon;

// // Stores OpenWeather 'data' - Coordinate: Latitude
// let coordLatNode = data.coord.lat;
// // << OpenWeather 'data' Nodes

// Current City Display >>
// Defines Target HTML Element to which to Append Current City
// const currentCity = $("#current-city");

// // Current City 'data' Node
// let curCityNode = data.name;

// // Current City <p>
// const curCityPara = document.createElement("h2");
// // curCityPara.textContent = curCityNode;
// curCityPara.textContent = curCityNode;
// currentCity.append(curCityPara);
// // << Current City Display

// // Display Location Coordinate ('coord') Data in HTML >>
// // Coordinate <div>
// const coordDiv = document.createElement("div");
// coordDiv.classList.add("task-card");
// coordDiv.setAttribute("id", "coordLon");

// // Coordinate - Longitude <p>
// const coordLongPara = document.createElement("p");
// coordLongPara.textContent = coordLongNode;

// // Coordinate - Latitude <p>
// const coordLatPara = document.createElement("p");
// coordLatPara.textContent = coordLatNode;

// // Appends Coordinates (Longitude, Latitude) to Coordinate <div>
// coordDiv.append(coordLongPara);
// coordDiv.append(coordLatPara);
// // << Display Coordinate ('coord') Data in HTML

// Appends Coordinates <div> to Weather <div>
// weatherCoord.append(coordDiv);

// // Displays Coordinate ('coord') Data in HTML >>
// const coordCard = $("<div>").addClass("card").attr("id", "coord-id");
// const coordLongHeader = $("<h5>").text("Location Coordinate - Longitude:");
// const coordLongData = $("<p>")
//   .addClass("card-text")
//   .text(data["coord"]["lon"])
//   .text(data.coord.lon);
// const coordLatHeader = $("<h5>").text("Location Coordinate - Latitude:");
// const coordLatData = $("<p>")
//   .addClass("card-text")
//   .text(data["coord"]["lon"])
//   .text(data.coord.lat);

// // Appends Coordinate Data to Coordinate Card (HTML)
// coordCard.append(
//   coordLongHeader,
//   coordLongData,
//   coordLatHeader,
//   coordLatData
// );
// // Appends Coordinate Card to Forecast Card (HTML)
// weatherOneDay.append(coordCard);
// // << Displays Coordinate ('coord') Data in HTML

// NOT USED !!!
// Defines User Search Parameters based on ZIP Code
// async function zipLoc() {
//   // Assigns User-selected ZIP Code Location for Weather Request
//   let inputZIP = "02108";
//   // console.log(inputZIP);

//   return inputZIP;
// }

// Initiates Weather Data Retrieval >>
// NEW !!! COMMENTED OUT
// Returns User Location
// cityLoc();

// Retrieves OpenWeather 'data' and Displays to Page ('index.html')
// NEW !!! COMMENTED OUT
// getWeather().then(displayWeather);

// Retrieves OpenWeather 'data' and Outputs to Console
// getWeather().then(consoleWeather);
// << Initiates Weather Data Retrieval
