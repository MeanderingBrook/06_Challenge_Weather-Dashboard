// REFERENCE: https://github.com/siennameow/Weather-Dashboard

// import { API_KEY } from "../../env-local.js";
// const API_KEY = require("../../env-local.js");

// Assigns Constants to hold User Input Location values until added to permanent Array (Local Storage)
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
  // Assigns User-selected ZIP Code Location for Weather Request
  let inputZIP = "02108";
  // console.log(inputZIP);

  return inputZIP;
}

// Defines User Search Parameters based on City
function cityLoc() {
  // Assigns Temporary Object in which to hold User Input Location prior to adding to Local Storage (locSearch)
  newSearch = {};
  // console.log(newSearch);

  // Assigns User-selected City Location for Weather Request >>
  let inputCity = "Des Moines";
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
        // console.log("City Value Already Exists");
        // console.log(searchArray);
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
  // Assigns Developer-specific OpenWeather API Key
  const apiKey = "91512c0479417b46b9d5f9b5e91a4f51";
  // console.log(apiKey);

  // Assigns Query URL to OpenWeather, including User-selected Location and API Key
  // Note: Current Weather, Imperial Units (e.g., Farenheit Temperature) (weather?)
  // const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputLoc}&appid=${apiKey}&units=imperial`;

  // Note: Five (5) Day Weather (Three (3) Hour Steps), Imperial Units (e.g., Farenheit Temperature) (forecast?)
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputLoc}&appid=${apiKey}&units=imperial`;
  // console.log(queryURL);

  const response = await fetch(weatherURL);
  const data = await response.json();

  console.log(data);
  // console.log(data.city.name); // WORKS !!!
  return data;
}

// Displays OpenWeather 'data' through dynamically created HTML Elements
function displayWeather(data) {
  // Displays Current City, Current Date, Current (Day 0) Weather >> >>
  //
  // Assigns Target HTML Element to which to Append Current City
  const currentCity = $("#current-city");

  // Assigns Target HTML Element to which to Append One (1) Day Forecast
  const weatherOneDay = $("#one-day-forecast");

  // Displays Current City * Search Date * Weather Icon in HTML >>
  // Formats Search Date (Unix Timestamp)
  const searchDate = new Date(data.list[0].dt * 1000);
  // console.log(searchDate.toDateString());

  // Current City
  const cityName = $("<h2>");
  cityName.text(data.city.name); // THIS WORKS !!!

  // Current Date
  const currDate = $("<h3>");
  currDate.text("(" + searchDate.toDateString() + ")");

  // Weather Icon >>
  // Returns Weather Icon Code (e.g., 02d)
  // const iconCode = data.weather[0].icon; // FROM 1 DAY DATA
  const iconCode = data.list[0].weather[0].icon;

  // Assigns OpenWeather API to return Weather Icon Image
  // Icon Image: Standard (1x)
  // const iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";
  // Icon Image: Large (2x)
  const iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

  // Creates Weather Icon Image Container <div>
  const weatherIconDiv = $("<div>").attr("id", "icon-id");

  // Assigns OpenWeather Icon API to <img> Tag
  const weatherImg = $("<img>").attr("src", iconURL);

  // Appends Weather Icon Image to Weather Icon Container
  weatherIconDiv.append(weatherImg);
  // << Weather Icon

  currentCity.append(cityName, currDate, weatherIconDiv);
  // << Displays Current City * Search Date * Weather Icon in HTML

  // Displays Temperature Data in HTML >>
  const tempCard = $("<div>").addClass("card flex-row").attr("id", "temp-id");
  const tempHeader = $("<h4>").text("Temperature");
  // Assigns Temperature (Farenheit) and adds Degree Symbol
  const tempData = $("<p>").text(data.list[0].main.temp + "\u00B0F");

  tempCard.append(tempHeader, tempData);
  weatherOneDay.append(tempCard);
  // << Displays Temperature Data in HTML

  // Displays Wind Data in HTML >>
  const windCard = $("<div>").addClass("card flex-row").attr("id", "wind-id");
  const windHeader = $("<h4>").text("Wind Speed");
  // Assigns Wind Speed and adds 'MPH'
  const windData = $("<p>").text(data.list[0].wind.speed + " MPH");

  windCard.append(windHeader, windData);
  weatherOneDay.append(windCard);
  // << Displays Wind Data in HTML

  // Displays Humidity Data in HTML >>
  const humidityCard = $("<div>")
    .addClass("card flex-row")
    .attr("id", "humidity-id");
  const humidityHeader = $("<h4>").text("Humidity");
  // Assigns Humidity and adds '%'
  const humidityData = $("<p>").text(data.list[0].main.humidity + "%");

  humidityCard.append(humidityHeader, humidityData);
  weatherOneDay.append(humidityCard);
  // << Displays Humidity Data in HTML
  //
  // << << Displays Current City, Current Date, Current (Day 0) Weather

  // Displays Five (5) Day Forecast >> >>
  //
  // Assigns Target HTML Element to which to Append Five (5) Day Forecast
  const weatherFiveDay = $("#five-day-forecast");

  //////////////////////////////////////////////////
  // display forecast with an offset of
  for (let i = 5; i < data.list.length; i = i + 8) {
    // Displays Next Day (Day 1) Forecast >>
    // Creates Day 1 Forecast Card to which to Append Day 1 Weather Data
    const dayOneDiv = $("<div>");

    // Displays Day 1 Date in HTML >>
    // Formats Search Date (Unix Timestamp) (Data is returned in three (3) hour increments)
    const dateDay1 = new Date(data.list[i].dt * 1000);
    // console.log(dateDay1.toDateString());

    // Day 1 Date
    const dayOneDate = $("<h5>");
    dayOneDate.text(dateDay1.toDateString());

    // Weather Icon >>
    // Returns Weather Icon Code (e.g., 02d)
    const iconCodeDay1 = data.list[i].weather[0].icon;

    // Assigns OpenWeather API to return Weather Icon Image
    // Icon Image: Standard (1x)
    const iconURLDay1 =
      "https://openweathermap.org/img/wn/" + iconCodeDay1 + ".png";
    // Icon Image: Large (2x)
    // const iconURLDay1 = "https://openweathermap.org/img/wn/" + iconCodeDay1 + "@2x.png";

    // Creates Weather Icon Image Container <div>
    const weatherIconDivDay1 = $("<div>").attr("id", "icon-day1-id");

    // Assigns OpenWeather Icon API to <img> Tag
    const weatherImgDay1 = $("<img>").attr("src", iconURLDay1);

    // Appends Weather Icon Image to Weather Icon Container
    weatherIconDivDay1.append(weatherImgDay1);
    // << Weather Icon

    dayOneDiv.append(dayOneDate, weatherIconDivDay1);
    // << Displays Current City * Search Date * Weather Icon in HTML

    // Displays Temperature Data in HTML >>
    const tempCardDay1 = $("<div>")
      .addClass("card flex-row")
      .attr("id", "temp-day1-id");
    const tempHeaderDay1 = $("<h4>").text("Temperature");
    // Assigns Temperature (Farenheit) and adds Degree Symbol
    const tempDataDay1 = $("<p>").text(data.list[i].main.temp + "\u00B0F");

    tempCardDay1.append(tempHeaderDay1, tempDataDay1);
    dayOneDiv.append(tempCardDay1);
    // << Displays Temperature Data in HTML

    // Displays Wind Data in HTML >>
    const windCardDay1 = $("<div>")
      .addClass("card flex-row")
      .attr("id", "wind-day1-id");
    const windHeaderDay1 = $("<h4>").text("Wind Speed");
    // Assigns Wind Speed and adds 'MPH'
    const windDataDay1 = $("<p>").text(data.list[i].wind.speed + " MPH");

    windCardDay1.append(windHeaderDay1, windDataDay1);
    dayOneDiv.append(windCardDay1);
    // << Displays Wind Data in HTML

    // Displays Humidity Data in HTML >>
    const humidityCardDay1 = $("<div>")
      .addClass("card flex-row")
      .attr("id", "humidity-day1-id");
    const humidityHeaderDay1 = $("<h4>").text("Humidity");
    // Assigns Humidity and adds '%'
    const humidityDataDay1 = $("<p>").text(data.list[i].main.humidity + "%");

    humidityCardDay1.append(humidityHeaderDay1, humidityDataDay1);
    dayOneDiv.append(humidityCardDay1);

    weatherFiveDay.append(dayOneDiv);
  }

  //
  //
  // << Displays Day 2 Forecast

  // Displays Day 3 Forecast >>
  // Displays Day 3 Date in HTML >>
  const day3Date = new Date(data.list[23].dt * 1000);
  // console.log(day3Date.toDateString());

  // << Displays Day 3 Date in HTML

  // Displays Day 4 Forecast >>
  // Displays Day 4 Date in HTML >>
  const day4Date = new Date(data.list[31].dt * 1000);
  // console.log(day4Date.toDateString());

  // << Displays Day 4 Date in HTML

  // Displays Day 5 Forecast >>
  // Displays Day 5 Date in HTML >>
  const day5Date = new Date(data.list[39].dt * 1000);
  // console.log(day5Date.toDateString());

  // << Displays Day 3 Date in HTML

  // << << Displays Five (5) Day Forecast
}

// Initiates Weather Data Retrieval >>
// Returns User Location
cityLoc();

// Retrieves OpenWeather 'data' and Displays to Page ('index.html')
getWeather().then(displayWeather);

// Retrieves OpenWeather 'data' and Outputs to Console
// getWeather().then(consoleWeather);
// << Initiates Weather Data Retrieval

//
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
