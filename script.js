  import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1/+esm';
   
   
   export async function fetchWeather(city) {
    const API_KEY = '35d44bd2af4c4574b0c74804260202';
    const days = 7;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(`Fetched ${city} successfully!`);
    

      if(data.error) {
        return null;
      }
      
            
      const weekForecast = data.forecast.forecastday.map((day) => ({
       day: dayjs(day.date).format('MMMM D'),
       avgTemp: day.day.avgtemp_c,
       condition: {
        text: day.day.condition.text,
        icon: day.day.condition.icon
       }
      }));
      
      
      
      const formattedDate = dayjs(data.forecast.forecastday[0].date).format('MMMM MM');

      const weather = {
      city: data.location.name,
      day: formattedDate,
      temp: data.current.temp_c,
      condition: {
        text: data.current.condition.text,
        icon: data.current.condition.icon
      },
      humidity: data.current.humidity,
      wind: data.current.wind_kph,
      weekForecast
      }
      
      console.log(weather)
      console.log(weather.weekForecast);
      
      return weather;
      
    } catch (error) {
      console.error('Failed to fetch weather. Please try again later!');
      return null;
    }
  }

  async function showWeather (city) {
  const weather = await fetchWeather(city);

  if(weather) {
   renderWeatherHTML(weather);
  } else {
    alert('City not found! Please enter a valid city.');
  }
  }


  function searchCity () {
  const search =  document.querySelector('.js-search');
  const input = document.querySelector('.js-search-data');

  search.addEventListener('click', () => {
    const city = input.value.trim();
    if(city) {
      showWeather(city);
      localStorage.setItem('lastCity', city);
    } else {
      alert('Please enter a city name!')
    }
  });
   
  }

  function loadLastCity() {
    const lastCity = localStorage.getItem('lastCity');
    
    if(lastCity) {
      showWeather(lastCity);
    }
  }

  function renderWeatherHTML (weather) {

    let newWeatherCard = '';
    let newForecastCards = '';
 
    
    const weatherCard = document.querySelector('.js-weather-card');
    const forecastCard = document.querySelector('.js-card-container');

    newWeatherCard += ` 
        <div class="weather-card">
        <div class="container">
        <h2 class="city js-city-name">${weather.city}</h2>
        <h2 class="city js-city-date">${weather.day}</h2>
        <img src = "${weather.condition.icon}" alt = "${weather.condition.text}"/>

        <div class = "weather-condition">
        <p class="temperature js-city-temp">${weather.temp}°C</p>
        <p class="condition js-city-condition">${weather.condition.text}
        </div>
          <div class = "humidity-container">
            <span>Humidity</span>
            <p class = "js-city-humidity">${weather.humidity}%</p>
          </div>
          <div class ="wind-container">
            <span>Wind</span>
            <p class = "js-city-wind">${weather.wind} km/h</p>
          </div>
      </div>
      `
  weatherCard.innerHTML = newWeatherCard;
   
   newForecastCards+= `
     <div class="card">
      <h1>${weather.weekForecast[1].day}</h1>
      <img src="${weather.weekForecast[1].condition.icon}" alt="${weather.weekForecast[1].day}">
      <p>${weather.weekForecast[1].avgTemp} C</p>
      </div>
      <div class="card">
         <h1>${weather.weekForecast[2].day}</h1>
      <img src="${weather.weekForecast[2].condition.icon}" alt="${weather.weekForecast[2].day}">
      <p>${weather.weekForecast[2].avgTemp} C</p>
      </div>
       <div class="card">
         <h1>${weather.weekForecast[3].day}</h1>
      <img src="${weather.weekForecast[3].condition.icon}" alt="${weather.weekForecast[3].day}">
      <p>${weather.weekForecast[3].avgTemp}</p>
      </div>
       <div class="card">
         <h1>${weather.weekForecast[4].day}</h1>
      <img src="${weather.weekForecast[4].condition.icon}" alt="${weather.weekForecast[4].day}">
      <p>${weather.weekForecast[4].avgTemp}</p>
      </div>
       <div class="card">
         <h1>${weather.weekForecast[5].day}</h1>
      <img src="${weather.weekForecast[5].condition.icon}" alt="${weather.weekForecast[5].day}">
      <p>${weather.weekForecast[5].avgTemp}</p>
      </div>
       <div class="card">
         <h1>${weather.weekForecast[6].day}</h1>
      <img src="${weather.weekForecast[6].condition.icon}" alt="${weather.weekForecast[6].day}">
      <p>${weather.weekForecast[6].avgTemp}</p>
      </div>
    </div>`

    forecastCard.innerHTML = newForecastCards
  }


  loadLastCity();
  searchCity();