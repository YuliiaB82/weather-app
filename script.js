let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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

  celsiusTemperature = response.data.main.temp;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);

  let cityElement = document.querySelector("h1.city");
  cityElement.innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let descriptionElement = document.querySelector("h2.weather");
  descriptionElement.innerHTML = response.data.weather[0].description;

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

let celsiusTemperature = null;

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("New York");
