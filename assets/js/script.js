// Note to Reviewers: This code is unused and is simply the result of an experiment to duplicate React.js functionality
// that places sensitive information in a secure location (e.g., env-local file)
// import { API_KEY } from "../../env-local.js";
// const API_KEY = require("../../env-local.js");

// Assigns Constants to hold User Input Location values until added to permanent Array (Local Storage)
const inputCity = document.getElementById("city");
// const inputState = document.getElementById("state");
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

// Defines OpenWeather API Search Parameters based on User-input City
function cityLoc() {
  // Calls Search History and assigns Local Storage Object to local Variable
  searchHistory = refreshSearchHistory();

  // Assigns Temporary Object in which to hold User Input Location prior to adding to Local Storage (locSearch)
  newSearch = {};
  // console.log(newSearch);

  // Assigns User-selected City Location >>
  //
  // Test Code used to validate functionality without the need to continually input City location data - NO LONGER USED
  // let inputCity = "Des Moines";
  // let inputState = "MA";

  // Hard-coded Country Value (Search only functions for U.S. Cities)
  let inputCntryCode = "US";

  newSearch.cityLoc = inputCity.value;
  // console.log(`The new City entered is, ${newSearch.cityLoc}`);

  // State is NOT required by OpenWeather API - NOT USED
  // newSearch.stateLoc = inputState.value;
  // console.log(newSearch.stateLoc);

  newSearch.cntryLoc = inputCntryCode;
  // console.log(`The Country Code is, ${newSearch.cntryLoc}`);

  // State is NOT required by OpenWeather API - inputLoc with State superseded by code without that parameter
  // inputLoc = inputCity + "," + inputState + "," + inputCntryCode;

  // Defines concatenated Location variable (City + State) to be passed to OpenWeather API
  inputLoc = newSearch.cityLoc + "," + newSearch.cntryLoc;
  // console.log(`The Input Location is, ${inputLoc}`);
  //
  // << Assigns User-selected City Location

  // Determines if current, User-input City is already present in searchHistory (Boolean Value)
  let cityPresent = searchHistory.some(function (el) {
    return el.cityLoc === newSearch.cityLoc;
  });

  // Checks for required User-input City, and if City was previously searched
  if (newSearch.cityLoc && newSearch.cntryLoc) {
    // Determines if searchHistory Object is empty OR if current User-input City is NOT present in searchHistory
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
    // Alert if User has failed to enter City name
    alert("Please enter a City name.");
  }
}

// Calls OpenWeather API and retrieves Weather 'data' for User-selected Location
async function getWeather() {
  // Assigns Developer-specific OpenWeather API Key
  const apiKey = "91512c0479417b46b9d5f9b5e91a4f51";
  // console.log(apiKey);

  // Assigns OpenWeather Query URL variable, including User-selected Location and API Key
  // Note: Current (within three (3) hour refresh window) Weather, Imperial Units (e.g., Farenheit Temperature) (weather?) - NOT USED
  // const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputLoc}&appid=${apiKey}&units=imperial`;

  // Note: Five (5) Day Weather (Three (3) Hour Steps), Imperial Units (e.g., Farenheit Temperature) (forecast?)
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputLoc}&appid=${apiKey}&units=imperial`;
  // console.log(queryURL);

  const response = await fetch(weatherURL);
  const data = await response.json();

  console.log(data);

  // Calls Display function, rendering returned Weather data
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
  cityName.text(data.city.name + ", ");

  // Current Date
  const currDate = $("<h2>").attr("id", "date-id");
  // currDate.text("(" + searchDate.toDateString() + ")");
  currDate.text(searchDate.toDateString());

  // Weather Icon >>
  // Returns Weather Icon Code (e.g., 02d)
  const iconCode = data.list[0].weather[0].icon;

  // Assigns OpenWeather API to return Weather Icon Image
  // Icon Image: Standard (1x)
  const iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";
  // Icon Image: Large (2x)
  // const iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

  // Creates Weather Icon Image Container <div>
  const weatherIconDiv = $("<div>")
    .addClass("icon-container")
    .attr("id", "icon-id");

  // Assigns OpenWeather Icon API to <img> Tag
  const weatherImg = $("<img>").attr("src", iconURL);

  // Attaches Weather Icon Image to Weather Icon Container
  weatherIconDiv.append(weatherImg);
  // << Weather Icon

  // Attaches City Name, Date, Weather Icon City div to City div
  currentCity.append(cityName, currDate, weatherIconDiv);

  // Displays Temperature Data in HTML >>
  const tempCard = $("<div>")
    .addClass("card flex-row today-card")
    .attr("id", "temp-id");
  const tempHeader = $("<h4>").text("Temperature:");
  // Assigns Temperature (Farenheit) and adds Degree Symbol
  const tempData = $("<p>").text(data.list[0].main.temp + "\u00B0F");

  tempCard.append(tempHeader, tempData);
  weatherOneDay.append(tempCard);
  // << Displays Temperature Data in HTML

  // Displays Wind Data in HTML >>
  const windCard = $("<div>")
    .addClass("card flex-row today-card")
    .attr("id", "wind-id");
  const windHeader = $("<h4>").text("Wind Speed:");
  // Assigns Wind Speed and adds 'MPH'
  const windData = $("<p>").text(data.list[0].wind.speed + " MPH");

  windCard.append(windHeader, windData);
  weatherOneDay.append(windCard);
  // << Displays Wind Data in HTML

  // Displays Humidity Data in HTML >>
  const humidityCard = $("<div>")
    .addClass("card flex-row today-card")
    .attr("id", "humidity-id");
  const humidityHeader = $("<h4>").text("Humidity:");
  // Assigns Humidity and adds '%'
  const humidityData = $("<p>").text(data.list[0].main.humidity + "%");

  humidityCard.append(humidityHeader, humidityData);
  weatherOneDay.append(humidityCard);
  // << Displays Humidity Data in HTML
  //
  // << Displays Current City, Current Date, Current (Day 0) Weather

  // Displays Five (5) Day Forecast >> >>
  //
  // Assigns Target HTML Element to which to Append Five (5) Day Forecast
  const weatherFiveDay = $("#five-day-forecast");

  // display forecast with an offset of
  for (let i = 0; i < data.list.length; i = i + 8) {
    // Five (5) Day Forecast container
    const forecastContainer = $("<div>")
      .addClass("forecast-card")
      .attr("id", "forecast-id");

    // Forecast Date (for each Forecast Day card)
    const forecastDateHeader = $("<h5>");
    const forecastCardDate = new Date(data.list[i].dt * 1000);
    forecastDateHeader.text(forecastCardDate.toDateString());

    // Forecast Icon (for each Forecast Day card)
    const forecastIconCode = data.list[i].weather[0].icon;
    const forecastIconURL = `https://openweathermap.org/img/wn/${forecastIconCode}.png`;

    // Forecast Icon container (for each Forecast Day card)
    const forecastIconDiv = $("<div>")
      .addClass("forecast-icon")
      .attr("id", "icon-day1-id");

    // Assigns OpenWeather Icon API to <img> Tag
    const forecastImg = $("<img>").attr("src", forecastIconURL);

    // Appends Weather Icon Image to Weather Icon Container
    forecastIconDiv.append(forecastImg);
    // << Weather Icon

    // Attaches Date and OpenWeather Icon to Forecast Day container
    forecastContainer.append(forecastDateHeader, forecastIconDiv);

    // Displays Temperature Data in HTML (for each Forecast Day card) >>
    const forecastTempCard = $("<div>")
      .addClass("flex-row") // REMOVED card !!!
      .attr("id", "temp-day1-id");
    const forecastTempHeader = $("<h5>").text("Temperature:");
    // Assigns Temperature (Farenheit) and adds Degree Symbol
    const forecastTemp = $("<p>").text(data.list[i].main.temp + " \u00B0F");

    forecastTempCard.append(forecastTempHeader, forecastTemp);
    forecastContainer.append(forecastTempCard);
    // << Displays Temperature Data in HTML (for each Forecast Day card)

    // Displays Wind Data in HTML (for each Forecast Day card) >>
    const windCardDay1 = $("<div>")
      .addClass("flex-row") // REMOVED card !!!
      .attr("id", "wind-day1-id");
    const windHeaderDay1 = $("<h5>").text("Wind Speed:");
    // Assigns Wind Speed and adds 'MPH'
    const windDataDay1 = $("<p>").text(data.list[i].wind.speed + " MPH");

    windCardDay1.append(windHeaderDay1, windDataDay1);
    forecastContainer.append(windCardDay1);
    // << Displays Wind Data in HTML (for each Forecast Day card)

    // Displays Humidity Data in HTML (for each Forecast Day card) >>
    const humidityCardDay1 = $("<div>")
      .addClass("flex-row") // REMOVED card !!!
      .attr("id", "humidity-day1-id");
    const humidityHeaderDay1 = $("<h5>").text("Humidity:");
    // Assigns Humidity and adds '%'
    const humidityDataDay1 = $("<p>").text(data.list[i].main.humidity + "%");

    humidityCardDay1.append(humidityHeaderDay1, humidityDataDay1);
    forecastContainer.append(humidityCardDay1);
    // << Displays Humidity Data in HTML (for each Forecast Day card)

    // Attaches Forecast container to Five (5) Day Weather container (for each Forecast Day card)
    weatherFiveDay.append(forecastContainer);
  }

  // Clears User-input City value in Search field to ready for next User search
  $("#city").val("");

  // Calls function to display past City searches (sidebard)
  displaySearchHistory();
}

// Creates Buttons (HTML) for previously-searched Cities to display refreshed Weather of those locations
function createSearchItem(search) {
  // Creates container for prior City searches ('searchItemBtn')
  const searchCard = $("<div>").addClass("searchCard");

  // Creates individual Button for each User-input City previously searched
  const searchItemBtn = $("<button>")
    .addClass("search-item")
    .text(search.cityLoc)
    .attr("search-id", search.cityLoc);
  searchItemBtn.on("click", getPastCity); // No Parentheses () Required !!!

  // Attaches previously searched City buttons to Search container
  searchCard.append(searchItemBtn);

  return searchCard;
}

// Displays names of previously-searched Cities as interactive Buttons (HTML)
function displaySearchHistory() {
  // Calls Search History and assigns Local Storage Object to local Variable
  searchHistory = refreshSearchHistory();

  // Clears Search list of previously Searched Cities (HTML)
  const searchList = $("#search-history");
  searchList.empty();

  // Iterates through previously Searched Cities and creates Button for each that can trigger new OpenWeather API call for that City
  searchHistory.forEach((search) => {
    searchList.append(createSearchItem(search));
  });

  // OPTIONAL: Limits displayed Search History to FIRST five (5) Cities in Local Storage - NOT USED
  // searchHistory.slice(0, 5).forEach((search) => {
  //   searchList.append(createSearchItem(search));
  // });

  // OPTIONAL: Limits displayed Search History to LAST five (5) Cities in Local Storage - NOT USED
  // searchHistory
  //   .slice(1)
  //   .slice(-5)
  //   .forEach((search) => {
  //     searchList.append(createSearchItem(search));
  //   });
}

// Initiates refreshed OpenWeather API call for previously-searched City
function getPastCity(event) {
  // Constant holding previously-searched City for which new Weather data will be called
  const citySearch = $(this).attr("search-id");
  // console.log(citySearch);

  // Hard-coded Country Value (Search only functions for U.S. Cities)
  let searchCntryCode = "US";

  inputLoc = citySearch + "," + searchCntryCode;
  // console.log(inputLoc);

  getWeather().then(displayWeather);
}

// On Page Load displays prior City search results (sidebar)
$(document).ready(function () {
  // Populates Kanban Board with current Tasks, taken from Local Storage
  displaySearchHistory();
});

// Test Code used to validate API return functionality without the need to render data to Display - NO LONGER USED
// Outputs OpenWeather 'data' to Console
function consoleWeather(data) {
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
