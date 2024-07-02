// import { API_KEY } from "../../env-local.js";
// const API_KEY = require("../../env-local.js");

// Assigns Constants to hold User Input Location values until added to permanent Array (Local Storage)
const inputCity = document.getElementById("city");
// const inputState = document.getElementById("posttitle");
const inputCntryCode = "US";
// const inputZIP = document.getElementById("zipcode");

// Returns User Search History from Local Storage for use subsequent Functions
function refreshSearchHistory() {
  // Loads existing Location Searches from Local Storage to permanent Array (searchHistory), else: empty Array
  let searchHistory = localStorage.getItem("locSearchs")
    ? JSON.parse(localStorage.getItem("locSearchs"))
    : [];
  // console.log(searchHistory);

  // Returns current Search History for use by other Functions
  return searchHistory;
}

// NEW !!! COMMENTED OUT
// // Loads existing Location Searches from Local Storage to permanent Array (searchHistory), else: empty Array
// let searchHistory = localStorage.getItem("locSearchs")
//   ? JSON.parse(localStorage.getItem("locSearchs"))
//   : [];
// // console.log(searchHistory);

// Defines User Search Parameters based on City
function cityLoc() {
  // Calls Search History and assigns Local Storage Object to local Variable
  searchHistory = refreshSearchHistory();

  // Assigns Temporary Object in which to hold User Input Location prior to adding to Local Storage (locSearch)
  newSearch = {};
  // console.log(newSearch);

  // Assigns User-selected City Location >>
  // let inputCity = "Des Moines";
  // let inputState = "MA";

  // Hard-coded Country Value (Search only functions for U.S. Cities)
  let inputCntryCode = "US";

  newSearch.cityLoc = inputCity.value;
  // console.log(`The new City entered is, ${newSearch.cityLoc}`);

  // State Location not required !!!
  // newSearch.stateLoc = inputState.value;
  // console.log(newSearch.stateLoc);

  newSearch.cntryLoc = inputCntryCode;
  // console.log(`The Country Code is, ${newSearch.cntryLoc}`);

  // inputLoc = inputCity + "," + inputState + "," + inputCntryCode;
  inputLoc = newSearch.cityLoc + "," + newSearch.cntryLoc;
  // console.log(`The Input Location is, ${inputLoc}`);
  // << Assigns User-selected City Location

  // Determines if current City is already present in searchHistory (Boolean Value)
  let cityPresent = searchHistory.some(function (el) {
    return el.cityLoc === newSearch.cityLoc;
  });

  // Checks if searchHistory is empty OR if Search City is NOT present in searchHistory
  if (newSearch.cityLoc && newSearch.cntryLoc) {
    if (!Object.entries(searchHistory.length) || cityPresent === false) {
      // Adds new Search inputs to searchHistory ONLY if searchHistory is empty, OR if current City is NOT present in searchHistory
      searchHistory.push(newSearch);

      // Adds values of searchHistory to Local Storage
      localStorage.setItem("locSearchs", JSON.stringify(searchHistory));

      // Calls OpenWeather API, then Display Function
      getWeather().then(displayWeather);
    } else {
      // If Search City IS present in searchHistory, only calls OpenWeather API
      getWeather().then(displayWeather);
    }
  } else {
    alert("Please enter a City name.");
  }
}

// Calls OpenWeather API and retrieves Weather 'data' for User-selected Location
async function getWeather() {
  // Assigns Developer-specific OpenWeather API Key
  const apiKey = "91512c0479417b46b9d5f9b5e91a4f51";
  // console.log(apiKey);

  // Assigns Query URL to OpenWeather, including User-selected Location and API Key
  // Note: Current (within three (3) hour refresh window) Weather, Imperial Units (e.g., Farenheit Temperature) (weather?)
  // const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputLoc}&appid=${apiKey}&units=imperial`;

  // Note: Five (5) Day Weather (Three (3) Hour Steps), Imperial Units (e.g., Farenheit Temperature) (forecast?)
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputLoc}&appid=${apiKey}&units=imperial`;
  // console.log(queryURL);

  const response = await fetch(weatherURL);
  const data = await response.json();

  console.log(data);
  displayWeather(data);
}

// Displays OpenWeather 'data' through dynamically created HTML Elements
function displayWeather(data) {
  // Assigns Target HTML Element to which to Append Current City
  const currentCity = $("#current-city");

  // Assigns Target HTML Element to which to Append One (1) Day Forecast
  const weatherOneDay = $("#one-day-forecast");

  // Displays Current City * Search Date * Weather Icon in HTML >>
  //
  // Formats Search Date (Unix Timestamp)
  const searchDate = new Date(data.list[0].dt * 1000);
  // console.log(searchDate.toDateString());

  // Clears Display of prior Weather Data
  function clearDisplay() {
    $("#city-id").remove();
    $("#icon-id").remove();
    $("#date-id").remove();
    $("#one-day-forecast").children().remove();
    $("#five-day-forecast").children().remove();
  }
  clearDisplay();

  // Displays Current City, Current Date, Current (Day 0) Weather >> >>
  //
  // Current City
  const cityName = $("<h2>").attr("id", "city-id");
  cityName.text(data.city.name);

  // Current Date
  const currDate = $("<h3>").attr("id", "date-id");
  currDate.text("(" + searchDate.toDateString() + ")");

  // Weather Icon >>
  // Returns Weather Icon Code (e.g., 02d)
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
  //
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

  // Displays Five (5) Day Forecast >> >>
  //
  // Assigns Target HTML Element to which to Append Five (5) Day Forecast
  const weatherFiveDay = $("#five-day-forecast");

  // display forecast with an offset of
  for (let i = 0; i < data.list.length; i = i + 8) {
    // forecast container
    const forecastContainer = $("<div>").attr("id", "forecast-id");

    // forecast date
    const forecastDateHeader = $("<h5>");
    const forecastCardDate = new Date(data.list[i].dt * 1000);
    forecastDateHeader.text(forecastCardDate.toDateString());

    // forecast icon
    const forecastIconCode = data.list[i].weather[0].icon;
    const forecastIconURL = `https://openweathermap.org/img/wn/${forecastIconCode}.png`;

    // forecast icon container
    const forecastIconDiv = $("<div>").attr("id", "icon-day1-id");

    // Assigns OpenWeather Icon API to <img> Tag
    const forecastImg = $("<img>").attr("src", forecastIconURL);

    // Appends Weather Icon Image to Weather Icon Container
    forecastIconDiv.append(forecastImg);
    // << Weather Icon

    forecastContainer.append(forecastDateHeader, forecastIconDiv);
    // << Displays Current City * Search Date * Weather Icon in HTML

    // Displays Temperature Data in HTML >>
    const forecastTempCard = $("<div>")
      .addClass("card flex-row")
      .attr("id", "temp-day1-id");
    const forecastTempHeader = $("<h4>").text("Temperature");
    // Assigns Temperature (Farenheit) and adds Degree Symbol
    const forecastTemp = $("<p>").text(data.list[i].main.temp + "\u00B0F");

    forecastTempCard.append(forecastTempHeader, forecastTemp);
    forecastContainer.append(forecastTempCard);
    // << Displays Temperature Data in HTML

    // Displays Wind Data in HTML >>
    const windCardDay1 = $("<div>")
      .addClass("card flex-row")
      .attr("id", "wind-day1-id");
    const windHeaderDay1 = $("<h4>").text("Wind Speed");
    // Assigns Wind Speed and adds 'MPH'
    const windDataDay1 = $("<p>").text(data.list[i].wind.speed + " MPH");

    windCardDay1.append(windHeaderDay1, windDataDay1);
    forecastContainer.append(windCardDay1);
    // << Displays Wind Data in HTML

    // Displays Humidity Data in HTML >>
    const humidityCardDay1 = $("<div>")
      .addClass("card flex-row")
      .attr("id", "humidity-day1-id");
    const humidityHeaderDay1 = $("<h4>").text("Humidity");
    // Assigns Humidity and adds '%'
    const humidityDataDay1 = $("<p>").text(data.list[i].main.humidity + "%");

    humidityCardDay1.append(humidityHeaderDay1, humidityDataDay1);
    forecastContainer.append(humidityCardDay1);

    weatherFiveDay.append(forecastContainer);
  }
  $("#city").val("");
  displaySearchHistory();
}

function createSearchItem(search) {
  const searchCard = $("<div>").addClass("searchCard");
  // const searchItem = $("<p>").text(search.cityLoc);
  const searchItemBtn = $("<button>")
    .addClass("search-item")
    .text(search.cityLoc)
    .attr("search-id", search.cityLoc);
  searchItemBtn.on("click", cityLoc); // No Parentheses () Required !!!

  searchCard.append(searchItemBtn);

  return searchCard;
}

// Initiates refreshed OpenWeather API call for previously-searched City
function searchHistLoc(event) {
  // Constant holding previously-searched City for which new Weather data will be called
  const citySearch = $(this).attr("search-id");
  console.log(citySearch);

  // Hard-coded Country Value (Search only functions for U.S. Cities)
  let searchCntryCode = "US";

  inputLoc = citySearch + "," + searchCntryCode;
  console.log(inputLoc);

  getWeather().then(displayWeather);
}

function displaySearchHistory() {
  // Calls Search History and assigns Local Storage Object to local Variable
  searchHistory = refreshSearchHistory();

  // Clears list of prior City Searchs (HTML)
  const searchList = $("#search-history");
  searchList.empty();

  searchHistory.forEach((search) => {
    searchList.append(createSearchItem(search));
  });

  // Limits displayed Search History to first five (5) Cities in Local Storage - NOT USED
  // searchHistory.slice(0, 5).forEach((search) => {
  //   searchList.append(createSearchItem(search));
  // });

  // Limits displayed Search History to last five (5) Cities in Local Storage - NOT USED
  // searchHistory
  //   .slice(1)
  //   .slice(-5)
  //   .forEach((search) => {
  //     searchList.append(createSearchItem(search));
  //   });
}

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

// Outputs OpenWeather 'data' to Console
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
