

export function renderHourlyForecastHTML (weather)  {
  
const hourlyForecastInfo = document.querySelector('.hourly-forecast-info');



 hourlyForecastInfo.innerHTML = weather.every3HourForecast.map((hour, index) => 
   
  `  
    <div class = "hourly-forecast-cards" data-index = "${index}">
     <h1>${hour.time}</h1>
     <img src = "${hour.condition.icon}" alt = "${hour.condition.text}">
     <p>${hour.temp} °C</p>
    </div>
    `).join('');


}