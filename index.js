const api ='6d1dc94616317b751bc593509e49082b';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

window.addEventListener('load', () => {
  let long;
  let lat;

  // Function to fetch weather data based on coordinates
  const fetchWeatherByCoords = (latitude, longitude) => {
    //const api = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}&units=metric`;

    fetch(base)
      .then((response) => response.json())
      .then((data) => {
        updateWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  // Function to fetch weather data based on location name
  const fetchWeatherByLocation = (location) => {
    //const api = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const base = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}&units=metric`;

    fetch(base)
      .then((response) => response.json())
      .then((data) => {
        updateWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  // Function to update the weather data on the page
  const updateWeatherData = (data) => {
    const { temp } = data.main;
    const place = data.name;
    const { description, icon } = data.weather[0];
    const { sunrise, sunset } = data.sys;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const fahrenheit = (temp * 9) / 5 + 32;

    const sunriseGMT = new Date(sunrise * 1000);
    const sunsetGMT = new Date(sunset * 1000);

    iconImg.src = iconUrl;
    loc.textContent = `${place}`;
    desc.textContent = `${description}`;
    tempC.textContent = `${temp.toFixed(2)} °C`;
    tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
  };

  // Event listener for search button click
  searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.trim();

    if (searchValue !== '') {
      fetchWeatherByLocation(searchValue);
    }
  });

  // Accessing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      fetchWeatherByCoords(lat, long);
    });
  }
});



