/**
 * @typedef {Object} API
 * @property {string} key - API key to access the OpenWeatherMap API
 * @property {string} base - Base URL for the OpenWeatherMap
 */
const api = {
  key: "13e2a458579ad53e36bc96b60af7b53e",
  base: "https://api.openweathermap.org/data/2.5/",
};

/** @type {HTMLElement} */
const searchbox = document.querySelector(".searchBox");
searchbox.addEventListener("keypress", setQuery);

/**
 * Set the query for the weather search.
 * @param {KeyboardEvent} evt
 */
function setQuery(evt) {
  if (evt.key === 'Enter') {
    getResults(searchbox.value);
  }
}

/**
 * Get the weather results for the given query.
 * @param {string} query
 */
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults)
    .catch((err) => {
      console.log(err);
      alert("Something went wrong. Please try again.");
    });
}

/**
 * Display the weather results on page.
 * @param {Object} weather
 */
function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current-temp .temperature");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current-temp .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hiLow");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

// Add event listener to the button with ID "btn"
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  const query = searchbox.value;
  getResults(query);
});


/**
 * Build the date string.
 * @param {Date} d
 * @returns {string}
 */
function dateBuilder(d) {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
