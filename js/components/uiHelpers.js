
export function showForecastSections() {
  
   const forecastContainer = document.querySelector('.forecast-container');
   const hourlyForecastContainer = document.querySelector('.hourly-forecast-container');
   const outerContainer = document.querySelector('.outer-container');

   outerContainer.classList.add('expanded');
   forecastContainer.classList.remove('hideForecast');
   hourlyForecastContainer.classList.remove('hideForecast');
   
}

export function hideForecastSections () {
  
    const forecastContainer = document.querySelector('.forecast-container');
    const outerContainer = document.querySelector('.outer-container');
    const hourlyForecastContainer = document.querySelector('.hourly-forecast-container');


    outerContainer.classList.add('centered');
    forecastContainer.classList.add('hideForecast');
    hourlyForecastContainer.classList.add('hideForecast');
    outerContainer.classList.remove('expanded');

}



export function hideGreetingSections () {

  let greetingsContainer = document.querySelector('.greetings');

  greetingsContainer.style.display = 'none';
}

export function showGreetingSections () {

  let greetingsContainer = document.querySelector('.greetings');

  greetingsContainer.style.display = 'flex';
}
