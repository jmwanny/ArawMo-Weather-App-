import { formatLongDate } from "../utils/dateUtils.js";
import { renderWeatherHTML } from "./renderWeather.js";

  export function renderWeatherForecastHTML (weather) {
    
    const forecastInfo = document.querySelector('.forecast-info');

    forecastInfo.innerHTML = weather.weekForecast.slice(1).map((day,index) => 
      `
     <div class = "day-forecast-cards" data-index = "${index + 1}">
     <h1>${day.day}</h1>
     <img src = "${day.condition.icon}" alt = "${day.condition.text}">
     <p>${day.avgTemp} °C</p>
    </div>
     `).join('');
    
  }

  let resetTimeout;

  export function renderForecastInfoHTML(weather) {
    
    const forecastCards = document.querySelectorAll('.day-forecast-cards');

    forecastCards.forEach((card) => {
    card.addEventListener('click', () => {
    
      const index = Number(card.dataset.index);
      const selectedDay = weather.weekForecast[index];

      renderWeatherHTML(weather, {
        day: formatLongDate(selectedDay.day),
        avgTemp: selectedDay.avgTemp,
        condition: selectedDay.condition,
        humidity: selectedDay.humidity,
        wind: selectedDay.wind
      });
      
      if(resetTimeout) {
        clearTimeout(resetTimeout);
      }

      resetTimeout = setTimeout(() => {
        renderWeatherHTML(weather);
      }, 3000);
     
    })
    });
  }
