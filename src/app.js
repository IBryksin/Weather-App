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
  let celciusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    celciusTemperature);
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
  let apiKey = "a12ce643488a623cc0c6079609171e2d";
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
  let apiKey = "a12ce643488a623cc0c6079609171e2d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add ("active");
  let temperature = Math.round(celciusTemperature);
}

function showFahrenheitTemperature (event){
  event.preventDefault();
  let temperatureElement = document.querySelector ("#temperature");
  celsiusLink.classList.remove ("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round (fahrenheitTemperature);
}

let celciusLink = document.querySelector ("#celcius-link");
celciusLink.addEventListener ("click", showCelciusTemperature);

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", showFahrenheitTemperature);

let celciusTemperature = null;

let dateElement = document.querySelector("#current-date");
let searchForm = document.querySelector("#search-form");
let currentTime = new Date();
searchForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#current_location_button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("New York");
let apiKey = "a12ce643488a623cc0c6079609171e2d";
