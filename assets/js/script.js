function locWeather() {
  // Defines Developer-specific OpenWeather API Key
  const apiKey = "91512c0479417b46b9d5f9b5e91a4f51";
  // console.log(apiKey);

  // Defines User-selected Location for Weather Request >>
  let inputCity;
  let inputState;
  let inputCntryCode;

  inputCity = "Boston";
  inputState = "MA";
  inputCntryCode = "US";

  inputLoc = inputCity + "," + inputState + "," + inputCntryCode;

  // console.log(inputLoc);
  // << User-selected Location

  // Defines Query URL to OpenWeather, including Location and API Key
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputLoc}&appid=${apiKey}`;
  // console.log(queryURL);

  // Defines Target HTML Element to which to Append Query-returned Data
  let targetHTMLId = document.getElementById("forecast");

  // THIS DOESNT HELP !!! STILL NESTED OBJECTS !!!
  // https://www.sitepoint.com/loop-through-json-response-javascript/
  // (async () => {
  //   const res = await fetch(queryURL);

  //   const dataJSON = await res.json();
  //   Object.entries(dataJSON).forEach(([key, value]) => {
  //     console.log(`${key}: ${value}`);
  //   });
  // })();

  // Processes FETCH Request to OpenWeather Query URL
  fetch(queryURL)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        // JSON Method reads Response Stream, parses Response Body to produce JavaScript Object
        return response.json();
      }
    })
    .then(function (data) {
      console.log("API Data as JSON Object:");
      console.log(data);

      function createArray() {
        weatherObjectsArray = [];
        // Reference: https://www.geeksforgeeks.org/how-to-iterate-javascript-object-containing-array-and-nested-objects/
        Object.entries(data).forEach(([key, value]) => {
          weatherObjectsArray.push(key);
          return weatherObjectsArray;
        });
      }

      createArray();
      console.log(weatherObjectsArray);

      function multArrays(array) {
        array.forEach((element) => {
          console.log(el);
          var el = new Array(1);
        });
      }
      multArrays(weatherObjectsArray);

      // // THIS WORKS !!!
      // Object.entries(data).forEach(([key, value]) => {
      //   console.log(key, value);
      // });

      // THIS DOESNT WORK WHICH DOESNT MAKE SENSE
      // var result = resData.map(function (sub) {
      //   return sub.reduce(function (obj, pair) {
      //     obj[pair[0]] = pair[1];
      //     // return obj;
      //     console.log(obj);
      //   }, {});
      // });

      // Display Response Data in HTML
      let docArray = data.coord;
      // console.log(`Visibility: ${docArray}`);

      // for (let i = 0; i < docArray.length; i++) {
      //   let rtrnItem = document.createElement("li");
      //   rtrnItem.textContent = docArray[i].description; // description is place-holder JSON data element, CHANGE
      //   targetHTMLId.appendChild(rtrnItem);
      // }
    })
    .catch(function (error) {
      // Error Notification
      console.log(error);
    });
}

locWeather();
