// function displaytemperature(response) {
//   let temperatureElement = document.querySelector(".temp-value");
//   let temperature = Math.round(response.data.temperature.current);
//   let cityElement = document.querySelector(".cityHeading");
//   cityElement.innerHTML = response.data.city;
//   temperatureElement.innerHTML = temperature;

//   let icon = document.querySelector(".temp-icon");
//   let tempIcon = response.data.condition.icon_url;
//   icon.innerHTML = tempIcon;
// }

// function displayWeather(event) {
//   event.preventDefault();
//   let input = document.querySelector(".weather-text-input");
//   let changeHeading = document.querySelector(".cityHeading"); Remove this line
// let cityElement = input.value;
//   changeHeading.innerHTML = input.value;

//   let keyApi = "0a938o4bbb37e6d9d556431etfe1aab0";
//   let urlApi = `https://api.shecodes.io/weather/v1/current?query=${changeHeading}&key=${keyApi}`;
//   axios.get(urlApi).then(displaytemperature);
// }
// let form = document.querySelector("form");
// form.addEventListener("submit", displayWeather);

// https://api.shecodes.io/weather/v1/current?query=Miami&key=0a938o4bbb37e6d9d556431etfe1aab0

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector(".cityHeading");
  let description = document.querySelector(".description");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  let timeElement = document.querySelector("#timeElement");
  //   let dateElement = document.querySelector("#dateElement");
  let date = new Date(response.data.time);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  description.innerHTML = ` ${response.data.condition.description}`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  //   dateTime.innerHTML = response.data.time;
  timeElement.innerHTML = formatDate(date);

  //   let icon = document.querySelector(".temp-icon");
  //   let tempIcon = response.data.condition.icon_url;
  //   icon.innerHTML = tempIcon.src;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector(".weather-text-input");
  let cityElement = searchInputElement.value;

  let apiKey = "0a938o4bbb37e6d9d556431etfe1aab0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", search);
