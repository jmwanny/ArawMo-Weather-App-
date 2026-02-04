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
       day: dayjs(day.date).format('MMM D'),
       avgTemp: day.day.avgtemp_c,
       condition: {
        text: day.day.condition.text,
        icon: day.day.condition.icon
       },
       humidity: day.day.avghumidity,
       wind: day.day.maxwind_kph
      }));
    
      
      const formattedDate = dayjs(data.forecast.forecastday[0].date).format('ddd, D MMM');

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
   renderWeatherForecastHTML(weather);
   renderForecastInfoHTML(weather);
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
      localStorage.clear();
      renderDefaultPage();
      
    }
  
  });



   input.addEventListener('keydown', (event) => {
    
    if(event.key === 'Enter') {
    const city = input.value.trim();
    if(city) {
      showWeather(city);
      localStorage.setItem('lastCity', city);
    } else {
      alert('Please enter a city name!')
      localStorage.clear();
      renderDefaultPage();
      
    }
  }
});

}
   
  
  function loadLastCity() {
    const lastCity = localStorage.getItem('lastCity');
    
    if(lastCity) {
      showWeather(lastCity);
    }
  }

  function renderWeatherHTML (weather, dayData = null) {
    
  const data = dayData || {
    day: weather.day,
    temp: weather.temp,
    condition: weather.condition,
    humidity: weather.humidity,
    wind: weather.wind
  }


    const weatherCard = document.querySelector('.js-weather-card');
   

    weatherCard.innerHTML = ` 
        <div class="weather-card">
        <div class="container">
        <h2 class="city js-city-name">${weather.city}</h2>
        <h2 class="city js-city-date">${data.day}</h2>
        <img src = "${data.condition.icon}" alt = "${data.condition.text}"/>

        <div class = "weather-condition">
        <p class="temperature js-city-temp">${data.temp ?? data.avgTemp} °C</p>
        <p class="condition js-city-condition">${data.condition.text}
        </div>
          <div class = "humidity-container">
            <span>Humidity</span>
            <p class = "js-city-humidity">${data.humidity}%</p>
          </div>
          <div class ="wind-container">
            <span>Wind</span>
            <p class = "js-city-wind">${data.wind} km/h</p>
          </div>
      </div>
  `
   
  }


  function renderWeatherForecastHTML (weather) {
    
    const forecastCard = document.querySelector('.js-card-container');

    forecastCard.innerHTML = weather.weekForecast.slice(1).map((day,index) => 
      `
     <div class = "card" data-index = "${index + 1}">
     <h1>${day.day}</h1>
     <img src = "${day.condition.icon}" alt = "${day.condition.text}">
     <p>${day.avgTemp} °C</p>
    </div>
     `).join('');
    
  }

  function renderForecastInfoHTML(weather) {
    
    const forecastCards = document.querySelectorAll('.card');

   
    forecastCards.forEach((card) => {
    card.addEventListener('click', () => {
    
      const index = Number(card.dataset.index);
      const selectedDay = weather.weekForecast[index];

      renderWeatherHTML(weather, {
        day: dayjs(selectedDay.day).format('dddd, d MMM'),
        avgTemp: selectedDay.avgTemp,
        condition: selectedDay.condition,
        humidity: selectedDay.humidity,
        wind: selectedDay.wind
      });

      setTimeout(() => {
        renderWeatherHTML(weather);
      }, 3000);
     
    })
    });
  }

  function renderDefaultPage() {
    const page = document.querySelector('.app');

    page.innerHTML = `
    <div class="search">
      <input class="js-search-data" type="text" placeholder="Search city..." />
      <button class="js-search"><img class = "search-icon" src = "images/search-icon.png" alt="Search icon"></button>
    </div>

    <div class="weather-card js-weather-card">
      <div class="landing-page">
        <img class="logo" src="images/searching.png" alt="Searching logo">
        <h1>Search City</h1>
        <p>Find out the weather conditions of the city.</p>
      </div>
    </div>
    <div class="js-card-container">

    </div>
    `

    searchCity();
  }

  loadLastCity();
  searchCity();