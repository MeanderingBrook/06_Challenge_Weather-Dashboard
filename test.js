// // Loads existing Location Searches from Local Storage to permanent Array (searchArray), else: empty Array
// let searchArray = localStorage.getItem("locSearchs")
//   ? JSON.parse(localStorage.getItem("locSearchs"))
//   : [];
// console.log(searchArray);

// function testCityLoc() {
//   newSearch = {};

//   // Defines User-selected City Location for Weather Request >>
//   let inputCity = "Boston";
//   let inputCntryCode = "US";

//   newSearch.cityLoc = inputCity;
//   console.log(newSearch.cityLoc);

//   newSearch.cntryLoc = inputCntryCode;
//   console.log(newSearch.cntryLoc);

//   for (let i in searchArray) {
//     //loops over array indexes
//     if (searchArray[i].cityLoc === inputCity) {
//       //case sensitive
//       // return users[i];
//       console.log("Value Already Exists");
//       return null;
//     }
//   }
//   searchArray.push(newSearch);
//   console.log(searchArray);
//   localStorage.setItem("locSearchs", JSON.stringify(searchArray));

//   // if (newSearch.cityLoc && newSearch.cntryLoc) {
//   // }

//   // if (searchArray.includes(inputCity)) {
//   //   console.log("Value Already Exists");
//   //   // inputCity = "";
//   //   // inputCntryCode = "";
//   // } else {
//   //   searchArray.push(newSearch);
//   //   console.log(searchArray);
//   //   localStorage.setItem("locSearchs", JSON.stringify(searchArray));
//   // }
// }

// testCityLoc();

async function getWeather5Day() {
  // Defines Developer-specific OpenWeather API Key
  const apiKey = "91512c0479417b46b9d5f9b5e91a4f51";
  // console.log(apiKey);

  let inputCity = "Des Moines";
  // let inputState = "MA";
  let inputCntryCode = "US";

  inputLoc = inputCity + "," + inputCntryCode;
  limit = 3;

  // DIDNT USE ??? !!! ???
  const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`;

  // USE THE 5 DAY URL AND UPDATE data. REFERENCES TO INCLUDE INDEX e.g., [0]
  // Defines Query URL to OpenWeather, including User-selected Location and API Key
  // Note: Imperial Units (e.g., Farenheit Temperature)
  const weather5DayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputLoc}&appid=${apiKey}&units=imperial`;
  // console.log(queryURL);

  const response = await fetch(weather5DayURL);
  const data5day = await response.json();

  // 1719543600;
  const firstDate = new Date(1719543600 * 1000);
  console.log(firstDate.toDateString());

  console.log(data5day);
  return data5day;
}

getWeather5Day();
