// Loads existing Location Searches from Local Storage to permanent Array (searchArray), else: empty Array
let searchArray = localStorage.getItem("locSearchs")
  ? JSON.parse(localStorage.getItem("locSearchs"))
  : [];
console.log(searchArray);

function testCityLoc() {
  newSearch = {};

  // Defines User-selected City Location for Weather Request >>
  let inputCity = "Boston";
  let inputCntryCode = "US";

  newSearch.cityLoc = inputCity;
  console.log(newSearch.cityLoc);

  newSearch.cntryLoc = inputCntryCode;
  console.log(newSearch.cntryLoc);

  for (let i in searchArray) {
    //loops over array indexes
    if (searchArray[i].cityLoc === inputCity) {
      //case sensitive
      // return users[i];
      console.log("Value Already Exists");
      return null;
    }
  }
  searchArray.push(newSearch);
  console.log(searchArray);
  localStorage.setItem("locSearchs", JSON.stringify(searchArray));

  // if (newSearch.cityLoc && newSearch.cntryLoc) {
  // }

  // if (searchArray.includes(inputCity)) {
  //   console.log("Value Already Exists");
  //   // inputCity = "";
  //   // inputCntryCode = "";
  // } else {
  //   searchArray.push(newSearch);
  //   console.log(searchArray);
  //   localStorage.setItem("locSearchs", JSON.stringify(searchArray));
  // }
}

testCityLoc();
