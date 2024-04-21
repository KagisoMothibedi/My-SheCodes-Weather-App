function displayWeather(event) {
  event.preventDefault();
  let input = document.querySelector(".weather-text-input");
  let changeHeading = document.querySelector(".cityHeading");
  changeHeading.innerHTML = input.value;
  //   console.log(changeHeading);
}
let form = document.querySelector("form");
form.addEventListener("submit", displayWeather);
