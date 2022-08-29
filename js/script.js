// month, day and year
let now = new Date();

function formatDate(_today) {
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

  let currentYear = now.getFullYear();
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();

  let formattedDate = `${currentMonth} ${currentDate}, ${currentYear}`;

  date.innerHTML = formattedDate;
}

formatDate(now);

// weekday
function formatWeekday(_day) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentWeekday = days[now.getDay()];

  weekday.innerHTML = currentWeekday;
}

formatWeekday(now);

// time
function formatTime(_time) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentTime = `${hours}:${minutes}`;

  time.innerHTML = currentTime;
}

formatTime(now);

// to update the city
//id = "search"
//id = "btn"
function update(event) {
  event.preventDefault();
  let searchField = document.querySelector("#search");
  updateTemperature(searchField.value);
}

let searchBtn = document.querySelector("#btn");
searchBtn.addEventListener("click", update);

// to update current temperature considering tipped city
function updateTemperature(city) {
  let apiKey = "0e032dd702d93fe6312bb3410aedb25c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function displayWeather(response) {
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#city").innerHTML = city;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }

  function onError(error) {
    alert("Please type a valid city name");
  }

  axios.get(apiUrl).then(displayWeather).catch(onError);
}

updateTemperature(document.querySelector("#city").innerHTML);

// to update based on geolocation
function showLocation(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function showPosition(position) {
  let apiKey = "0e032dd702d93fe6312bb3410aedb25c";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showLocation);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geoLocation = document.querySelector("#location");
geoLocation.addEventListener("click", getCurrentPosition);
