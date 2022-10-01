let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[currentTime.getDay()];
let currentHours = currentTime.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let currentDate = document.querySelector("h2.date");
currentDate.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

function currentWheather(response) {
  let currentCity = document.querySelector("h1.city");
  currentCity.innerHTML = response.data.name;

  let currentTemperature = document.querySelector("h1.temp-today");
  let currentTemp = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${currentTemp}°C`;

  let cityElement = document.querySelector("h1.city");
  cityElement.innerHTML = response.data.name;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}%`;

  let pressure = response.data.main.pressure;
  let currentPressure = document.querySelector("#pressure");
  currentPressure.innerHTML = `${pressure}hPa`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsTemp = document.querySelector("#feelsLike");
  feelsTemp.innerHTML = `${feelsLike}°C`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${wind}km/h`;
}

function searchCity(city) {
  let apiKey = "44144f3a5bac41c0c3eb91949dd3a0c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWheather);
}

function getLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  searchCity(city);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "44144f3a5bac41c0c3eb91949dd3a0c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWheather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getLocation);

let showCurrentLocation = document.querySelector("#location-btn");
showCurrentLocation.addEventListener("click", getCurrentLocation);

searchCity("New York");
