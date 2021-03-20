let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector(".location-date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "b766a4496127010f9c77bb6bb489f2a5";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  searchCity(city);
}

let form = document.querySelector(".search-bar");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "b766a4496127010f9c77bb6bb489f2a5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeatherCondition);
}

function showPositionWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#inputSubmitLocation");
currentLocationButton.addEventListener("click", showPositionWeather);

function showCelsius(event) {
  event.preventDefault();
  let temparature = document.querySelector(".current-temperature");
  temparature.innerHTML = `20`;
}
function showFahrenheit(event) {
  event.preventDefault();
  let temparature = document.querySelector(".current-temperature");
  temparature.innerHTML = `68`;
}

let elementC = document.querySelector(".units-celsius");
elementC.addEventListener("click", showCelsius);

let elementF = document.querySelector(".units-fahrenheit");
elementF.addEventListener("click", showFahrenheit);

searchCity("Calgary");
