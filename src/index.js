function displayTemperature(response) {
  let temperatureElement = document.querySelector(".temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector(".cityHeading");
  let description = document.querySelector(".description");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  let timeElement = document.querySelector("#timeElement");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector(".temp-icon");

  icon.innerHTML = `<img class="img" src="${response.data.condition.icon_url}" />`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  description.innerHTML = ` ${response.data.condition.description}`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city); //Why do we call it here?
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return `${days[date.getDay()]}`;
}

function getForecast(city) {
  let apiKey = "0a938o4bbb37e6d9d556431etfe1aab0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dailyForecast);
  console.log(apiUrl);
}

function dailyForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="days">
         <div class="forecastDate"> ${formatDay(day.time)} </div>
         <div class="forecastIcon"> <img class="img" src="${
           day.condition.icon_url
         }"/> </div>
         <div class="forecastTemperatures-max-min">
          <span class="maxTemp">${Math.round(day.temperature.maximum)}°</span> 
          <span class="minTemp"> ${Math.round(day.temperature.minimum)}°</span>
          </div>
        </div>
        `;
    }
  });

  let forecast = document.querySelector(".dayContainer");
  forecast.innerHTML = forecastHTML;
}
