function formatDate(timestamp) {
let date = new Date (timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let day = days[date.getDay()];
return `${day}, ${hours}:${minutes}`;
}

function displayCurrentWeather(response) {
  let iconElement = document.querySelector ("#icon");
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature);
  document.querySelector ("#temperature-min").innerHTML = Math.round (response.data.main.temp_min);
  document.querySelector ("#temperature-max").innerHTML = Math.round (response.data.main.temp_max);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  dateElement.innerHTML = formatDate(response.data.dt*1000);
  iconElement.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "b4f47527f11e0a88d5be98d6f705a44d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b4f47527f11e0a88d5be98d6f705a44d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemperature (event){
  event.preventDefault();
  let temperatureElement = document.querySelector ("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add ("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round (fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active"); 
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let dateElement = document.querySelector("#current-date");
let searchForm = document.querySelector("#search-form");
let currentTime = new Date();

searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current_location_button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector ("#celcius-link");
celsiusLink.addEventListener ("click", showCelsiusTemperature);

searchCity("New York");
let apiKey = "b4f47527f11e0a88d5be98d6f705a44d";
