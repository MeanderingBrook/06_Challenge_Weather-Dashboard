// REFERENCE: https://github.com/siennameow/Weather-Dashboard

// import { API_KEY } from "../../env-local.js";
// const API_KEY = require("../../env-local.js");

// Defines Constants to hold User Input Location values until added to permanent Array (Local Storage)
const inputCity = document.getElementById("city");
// const inputState = document.getElementById("posttitle");
const inputCntryCode = "US";
// const inputZIP = document.getElementById("zipcode");

// Loads existing Location Searches from Local Storage to permanent Array (searchArray), else: empty Array
let searchArray = localStorage.getItem("locSearchs")
  ? JSON.parse(localStorage.getItem("locSearchs"))
  : [];
// console.log(searchArray);

// Defines User Search Parameters based on ZIP Code
async function zipLoc() {
  // Defines User-selected ZIP Code Location for Weather Request
  let inputZIP = "02108";
  // console.log(inputZIP);

  return inputZIP;
}

// Defines User Search Parameters based on City
function cityLoc() {
  // Defines Temporary Object in which to hold User Input Location prior to adding to Local Storage (locSearch)
  newSearch = {};
  // console.log(newSearch);

  // Defines User-selected City Location for Weather Request >>
  let inputCity = "Chicago";
  // let inputState = "MA";
  let inputCntryCode = "US";

  // WORKS WITHOUT STATE, APPARENTLY
  // inputLoc = inputCity + "," + inputState + "," + inputCntryCode;
  inputLoc = inputCity + "," + inputCntryCode;
  // console.log(inputLoc);
  // << User-selected City Location

  newSearch.cityLoc = inputCity;
  // USE THIS LATER WHEN INPUT FIELD
  // newSearch.cityLoc = inputCity.value;
  // console.log(newSearch.userName);

  // newSearch.stateLoc = inputState.value;
  // console.log(newSearch.userName);

  newSearch.cntryLoc = inputCntryCode;
  // console.log(newSearch.userName);

  if (newSearch.cityLoc && newSearch.cntryLoc) {
    for (let i in searchArray) {
      // Iterates through searchArray
      if (searchArray[i].cityLoc === inputCity) {
        console.log("City Value Already Exists");
        console.log(searchArray);
        return null;
      }
    }
  } else {
    alert("Please enter a U.S. City name.");
    return false;
  }

  // Adds new Search inputs to searchArray
  searchArray.push(newSearch);

  // Displays to Console ONLY when new City is added
  console.log(newSearch);
  console.log(searchArray);

  // Adds values of searchArray to Local Storage
  localStorage.setItem("locSearchs", JSON.stringify(searchArray));

  // Passes newSearch values to getWeather() to be sent to OpenWeather API
  getWeather(newSearch);

  // Clears Variable Values for next User Input
  inputCity = "";
  // inputState = "";
  inputCntryCode = "";
}

// Calls OpenWeather API and retrieves Weather 'data' for User-selected Location
async function getWeather() {
  // Defines Developer-specific OpenWeather API Key
  const apiKey = "91512c0479417b46b9d5f9b5e91a4f51";
  // console.log(apiKey);

  // Defines Query URL to OpenWeather, including User-selected Location and API Key
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputLoc}&appid=${apiKey}`;
  // console.log(queryURL);

  const response = await fetch(weatherURL);
  const data = await response.json();

  console.log(data);
  return data;
}

// Displays OpenWeather 'data' through dynamically created HTML Elements
function displayWeather(data) {
  // Defines Target HTML Element to which to Append Fetch-returned Data
  // let targetHTMLId = document.getElementById("forecast");
  const weatherCoord = $("#one-day-forecast");

  // OpenWeather 'data' Nodes >>
  // Stores OpenWeather 'data' - Coordinate: Longitude
  let coordLongNode = data.coord.lon;

  // Stores OpenWeather 'data' - Coordinate: Latitude
  let coordLatNode = data.coord.lat;
  // << OpenWeather 'data' Nodes

  // Current City Display >>
  // Defines Target HTML Element to which to Append Current City
  const currentCity = $("#current-city");

  // Current City 'data' Node
  let curCityNode = data.name;

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

  // Displays Current City in HTML
  const currCity = $("<h2>");
  currCity.text(data.name);
  currentCity.append(currCity);

  // Displays Coordinate ('coord') Data in HTML
  const coordCard = $("<div>").addClass("card").attr("id", "coord-id");
  const coordLongHeader = $("<h5>").text("Location Coordinate - Longitude:");
  const coordLongDesc = $("<p>")
    .addClass("card-text")
    .text(data["coord"]["lon"])
    .text(coordLongNode);

  coordCard.append(coordLongHeader, coordLongDesc);
  weatherCoord.append(coordCard);
}

// Returns User Location
cityLoc();

// Retrieves OpenWeather 'data' and Displays to Page ('index.html')
getWeather().then(displayWeather);

// Retrieves OpenWeather 'data' and Outputs to Console
// getWeather().then(consoleWeather);

// for (let i = 0; i < docArray.length; i++) {
//   let rtrnItem = document.createElement("li");
//   rtrnItem.textContent = docArray[i].description; // description is place-holder JSON data element, CHANGE
//   targetHTMLId.appendChild(rtrnItem);
// }
// })
//   .catch(function (error) {
//     // Error Notification
//     console.log(error);
//   });

// // FLAT MAP DOESNT WORK !!! WHY ??? !!!  DOESNT WORK ON OBJECTS IN JS
// let res = data.flatMap((x) => Object.keys(x));
// console.log(res);

// THIS DOESNT WORK WHICH DOESNT MAKE SENSE
// var result = resData.map(function (sub) {
//   return sub.reduce(function (obj, pair) {
//     obj[pair[0]] = pair[1];
//     // return obj;
//     console.log(obj);
//   }, {});
// });

// Outputs OpenWeather 'data'
function consoleWeather(data) {
  // DONT KNOW IF THIS WORKS INSIDE FUNCTION, DOES WORK OUTSIDE OF FUNCTION
  // getWeather().then((data) => {
  //   apiData = data;
  // });

  // Disaggregates API Array
  console.log("Disaggregated API Data >>>");
  // Object Methods required for JSON Object returned by API
  Object.entries(apiData).forEach(([key, value]) => {
    console.log(key, value);
  });
  console.log("<<< End Disaggregated API Data");

  console.log("Object - Entries:");
  console.log(Object.entries(data)[0]);

  console.log("Object - Values:");
  console.log(Object.values(data)[0]);

  // Accesses JSON properties using Dot Notation
  // https://www.geeksforgeeks.org/how-to-access-and-process-nested-objects-arrays-or-json/
  console.log("JSON - Dot Notation:");
  console.log("Coordinates: "); // Arrays cannot be interpolated without JSON.stringify()
  console.log(data.coord);
  console.log(`Coordinate - Longitude: ${data.coord.lon}`);
  console.log(`Coordinate - Latitude: ${data.coord.lat}`);

  let coordLonDot = data.coord.lon;
  let coordLatDot = data.coord.lat;
  console.log("JSON - Dot Notation with Variable Assignment");
  console.log(`Coordinate - Longitude: ${coordLonDot}`);
  console.log(`Coordinate - Latitude: ${coordLatDot}`);

  // Accesses JSON properties using Bracket Notation
  console.log("JSON - Bracket Notation:");
  console.log("Coordinates: "); // Arrays cannot be interpolated without JSON.stringify()
  console.log(data["coord"]);
  console.log(`Coordinate - Longitude: ${data["coord"]["lon"]}`);
  console.log(`Coordinate - Latitude: ${data["coord"]["lat"]}`);

  let coordLonBracket = data["coord"]["lon"];
  let coordLatBracket = data["coord"]["lat"];
  console.log("JSON - Bracket Notation with Variable Assignment");
  console.log(`Coordinate - Longitude: ${coordLonBracket}`);
  console.log(`Coordinate - Latitude: ${coordLatBracket}`);
}
