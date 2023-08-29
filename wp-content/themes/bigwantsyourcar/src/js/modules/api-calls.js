// const form = document.getElementById('ulezcheck');
// const registrationInput = document.getElementById('regName');
// const responseContainer = document.getElementById('responseContainer');

// const ulezMake = document.getElementById('ulezMake');
// const ulezModel = document.getElementById('ulezModel');
// const ulezDerivative = document.getElementById('ulezDerivative');
// const ulezEuro = document.getElementById('ulezEuro');
// const compliant = document.getElementById('compliant');
// const ulezSvg = document.getElementById('ulezSvg');
// const reasoning = document.getElementById('reasoning');
// const errorMessage = document.getElementById('errorMessage');
// const valueUlez = document.getElementById('valueUlez');
// const euroInfo = document.getElementById('euroInfo');

// const apiKey = customScriptData.apiKey;

// const headers = {
//   'x-functions-key': apiKey
// };

// const requestOptions = {
//   method: 'GET',
//   headers: headers
// };

// if (form) {
//   form.addEventListener('submit', function (event) {
//     event.preventDefault();

//     const registration = registrationInput.value;
//     const regName = registration.replace(/\s/g, '');

//     const apiUrl = `https://stocklookupapi20221108110954.azurewebsites.net/api/lookup-stock?registration=${regName}&mileage=120000`;

//     // const apiUrl = `https://stocklookupapi20221108110954.azurewebsites.net/api/lookup-stock?registration=sv14ljk&mileage=120000`;

//     // Make the API request using fetch
//     fetch(apiUrl, requestOptions)
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error('Request failed');
//         }
//       })
//       .then(data => {
//         // Handle the response data
//         // Output the data to the response container
//         //responseContainer.textContent = JSON.stringify(data, null, 2);
//         responseContainer.classList.remove('hidden');

//         const make = data.make;
//         const model = data.model;
//         const derivative = data.derivative;
//         const isULEZCompliantGuess = data.isULEZCompliantGuess;
//         const euro = data.emissionClass;

//         ulezMake.innerText = `${make}`;
//         ulezModel.innerText = `${model}`;
//         ulezDerivative.innerText = `${derivative}`;
//         ulezEuro.innerText = `${euro}`;

//         if (isULEZCompliantGuess === false) {
//           responseContainer.classList.remove('bg-green-100');
//           responseContainer.classList.add('bg-red-100');
//           compliant.classList.remove('bg-green-500');
//           compliant.classList.add('bg-red-500');
//           ulezSvg.classList.remove('text-green-100');
//           ulezSvg.classList.add('text-red-100');
//           valueUlez.classList.remove('hidden');
//           errorMessage.classList.add('hidden');
//           compliant.innerText = `Your car is not ULEZ compliant`;
//           reasoning.innerText = `Non-compliant vehicles are currently experiencing elevated values, but as the zone expands, there is a possibility of prices declining.`;
//           euroInfo.classList.remove('hidden');
//           ulezMake.classList.remove('hidden');
//           ulezModel.classList.remove('hidden');
//           ulezDerivative.classList.remove('hidden');
//           reasoning.classList.remove('hidden');
//         } else {
//           responseContainer.classList.remove('bg-red-100');
//           responseContainer.classList.add('bg-green-100');
//           compliant.classList.remove('bg-red-500');
//           compliant.classList.add('bg-green-500');
//           ulezSvg.classList.remove('text-red-100');
//           errorMessage.classList.add('hidden');
//           valueUlez.classList.remove('hidden');
//           ulezSvg.classList.add('text-green-100');
//           euroInfo.classList.remove('hidden');
//           compliant.innerText = `Your car is ULEZ compliant`;
//           reasoning.innerText = `Compliant vehicles are currently experiencing higher values than non-compiant vehicles.`;
//           ulezMake.classList.remove('hidden');
//           ulezModel.classList.remove('hidden');
//           ulezDerivative.classList.remove('hidden');
//           reasoning.classList.remove('hidden');
//         }

//       })
//       .catch(error => {
//         // Handle the error
//         responseContainer.classList.remove('hidden');
//         errorMessage.classList.remove('hidden');
//         compliant.classList.remove('bg-green-500');
//         compliant.classList.add('bg-red-500');
//         valueUlez.classList.add('hidden');
//         euroInfo.classList.add('hidden');
//         ulezMake.classList.add('hidden');
//         ulezModel.classList.add('hidden');
//         ulezDerivative.classList.add('hidden');
//         reasoning.classList.add('hidden');
//         responseContainer.classList.add('bg-red-100');
//         responseContainer.classList.remove('bg-green-100');
//         compliant.innerText = `Not found!`;
//         errorMessage.innerText = `We're sorry, we couldn't find a result for that registration. Please try again!`;
//         console.error(error);
//       });

//   });

// }

const form = document.getElementById("ulezcheck");
const registrationInput = document.getElementById("regName");
const responseContainer = document.getElementById("responseContainer");

const ulezMake = document.getElementById("ulezMake");
const ulezModel = document.getElementById("ulezModel");
const ulezDerivative = document.getElementById("ulezDerivative");
const ulezEuro = document.getElementById("ulezEuro");
const compliant = document.getElementById("compliant");
const ulezSvg = document.getElementById("ulezSvg");
const reasoning = document.getElementById("reasoning");
const errorMessage = document.getElementById("errorMessage");
const valueUlez = document.getElementById("valueUlez");
const euroInfo = document.getElementById("euroInfo");

// const apiKey = customScriptData.apiKey;

// const headers = {
//   "x-functions-key": apiKey,
// };

// const requestOptions = {
//   method: "GET",
//   headers: headers,
// };

// Function to make the API request
function makeApiRequest(registration) {
  const regName = registration.replace(/\s/g, "");
  // const apiUrl = `https://stocklookupapi20221108110954.azurewebsites.net/api/lookup-stock?registration=${regName}&mileage=120000`;

  const apiUrl = ajaxurl + `?action=ulez_check_action&regName=${regName}`;

  return fetch(apiUrl, {
    method: "GET",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Request failed");
    }
  });
}

// Function to handle the response data
function handleResponseData(data) {
  const make = data.make;
  const model = data.model;
  const derivative = data.derivative;
  const isULEZCompliantGuess = data.isULEZCompliantGuess;
  const euro = data.emissionClass;

  // Update the DOM elements with the response data
  ulezMake.innerText = make;
  ulezModel.innerText = model;
  ulezDerivative.innerText = derivative;
  ulezEuro.innerText = euro;

  // Toggle classes and set text content based on ULEZ compliance
  const isCompliant = isULEZCompliantGuess !== false;
  responseContainer.classList.toggle("bg-green-100", isCompliant);
  responseContainer.classList.toggle("bg-red-100", !isCompliant);
  compliant.classList.toggle("bg-green-500", isCompliant);
  compliant.classList.toggle("bg-red-500", !isCompliant);
  ulezSvg.classList.toggle("text-green-100", isCompliant);
  ulezSvg.classList.toggle("text-red-100", !isCompliant);
  errorMessage.classList.add("hidden");
  compliant.innerText = isCompliant
    ? "Your car is ULEZ compliant"
    : "Your car is not ULEZ compliant";
  reasoning.innerText = isCompliant
    ? "Compliant vehicles are currently experiencing higher values than non-compliant vehicles."
    : "Non-compliant vehicles are currently experiencing elevated values, but as the zone expands, there is a possibility of prices declining.";
  responseContainer.classList.remove("hidden");
  euroInfo.classList.remove("hidden");
  ulezMake.classList.remove("hidden");
  ulezModel.classList.remove("hidden");
  ulezDerivative.classList.remove("hidden");
  reasoning.classList.remove("hidden");
  valueUlez.classList.remove("hidden");
}

// Function to handle errors
function handleRequestError(error) {
  responseContainer.classList.add("bg-red-100");
  responseContainer.classList.remove("bg-green-100");
  compliant.classList.remove("bg-green-500");
  compliant.classList.add("bg-red-500");
  valueUlez.classList.add("hidden");
  euroInfo.classList.add("hidden");
  ulezMake.classList.add("hidden");
  ulezModel.classList.add("hidden");
  ulezDerivative.classList.add("hidden");
  reasoning.classList.add("hidden");
  responseContainer.classList.remove("hidden");
  errorMessage.classList.remove("hidden");
  compliant.innerText = "Not found!";
  errorMessage.innerText =
    "We're sorry, we couldn't find a result for that registration. Please try again!";
  console.error(error);
}

// Event listener function
function handleSubmit(event) {
  event.preventDefault();

  var loadButton = document.querySelector("button.load-button");

  loadButton.classList.add("loading-start");
  loadButton.disabled = true;

  const registration = registrationInput.value;

  makeApiRequest(registration)
    .then((data) => {
      handleResponseData(data);
      loadButton.classList.remove("loading-start");
      loadButton.disabled = false;
    })
    .catch((error) => {
      handleRequestError(error);
      loadButton.classList.remove("loading-start");
      loadButton.disabled = false;
    });
}

// Add event listener to the form
if (form) {
  form.addEventListener("submit", handleSubmit);
}
