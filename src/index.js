let dateElement = document.querySelector(".date");

let currentDate = new Date();

let day = currentDate.getDay();
let month = currentDate.getMonth();
let date = currentDate.getDate();
let year = currentDate.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let formattedDate = `${days[day]}, ${months[month]} ${date}, ${year}`;

dateElement.innerHTML = formattedDate;

function convertToStandardTime(hour, minute) {
  let meridiem;

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (hour >= 12) {
    meridiem = "pm";
  } else {
    meridiem = "am";
  }

  if (hour > 12) {
    return `${hour - 12}:${minute} ${meridiem}`;
  } else {
    return `${hour}:${minute} ${meridiem}`;
  }
}

let timeElement = document.querySelector(".time");

let hour = currentDate.getHours();
let minute = currentDate.getMinutes();

let formattedTime = convertToStandardTime(hour, minute);
timeElement.innerHTML = formattedTime;

function showTemperature(response) {
  console.log(response);
  document.querySelector(".city-name").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humid").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector(".wind").innerHTML =
    Math.round(response.data.wind.speed) + "mph";
  document.querySelector(".weather-type").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".feels-like").innerHTML =
    Math.round(response.data.main.feels_like) + "°";
  document.querySelector(".temp-high").innerHTML =
    Math.round(response.data.main.temp_max) + "°";
  document.querySelector(".temp-low").innerHTML =
    Math.round(response.data.main.temp_min) + "°";
}

function search(event) {
  event.preventDefault();
  let apiKey = "eda5f4c1faef5ba99e914999cfcb1292";
  let city = document.querySelector(".city-search").value;
  if (city) {
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }
}
document.querySelector(".handle-submit").addEventListener("submit", search);

function searchLocation(position) {
  let apiKey = "eda5f4c1faef5ba99e914999cfcb1292";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(".fa-location-arrow");
currentLocationButton.addEventListener("click", getCurrentLocation);
