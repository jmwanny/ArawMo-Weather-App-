  import { fetchWeather } from './api/weatherApi.js';
  import { renderWeatherHTML } from './components/renderWeather.js';
  import { renderWeatherForecastHTML, renderForecastInfoHTML } from './components/renderForecast.js';
  import { renderDefaultPage } from './components/renderDefault.js';
  import { getHour, updateTheme } from './utils/dateUtils.js';
  import { renderHourlyForecastHTML } from './components/renderHourlyForecast.js';
  import { showForecastSections,showGreetingSections } from './components/uiHelpers.js';
  import { renderQuestionHTML} from './components/renderGreetings.js';


  async function showWeather (city) {
  const weather = await fetchWeather(city);


  if(weather) {
   renderWeatherHTML(weather);
   renderWeatherForecastHTML(weather);
   renderForecastInfoHTML(weather);
   renderHourlyForecastHTML(weather);

   showForecastSections();


  } else {
    alert('City not found! Please enter a valid city.');
  }

    console.log(weather);
    console.log(weather.every3HourForecast);

  }


  export function searchCity () {
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
  
  const hour = getHour();
   updateTheme(hour);
  
  renderDefaultPage();
  setTimeout(() => {
    showGreetingSections();
    renderQuestionHTML()
  },300);
  searchCity();
  loadLastCity();

  