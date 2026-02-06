 import {searchCity} from '../main.js'
 import { hideForecastSections } from './uiHelpers.js';

  export function renderDefaultPage() {
    const page = document.querySelector('.app');

    page.innerHTML = `
     <div class="search">
      <input class="js-search-data" type="text" placeholder="Search for cities..." />
      <button class="js-search"><img class = "search-icon" src = "images/search-icon.png" alt="Search icon"></button>
    </div> 
    
    <div class = "outer-container">
    <div class = "inner-container">
    <div class="weather-card js-weather-card">
      <div class="landing-page">
        <img class="logo" src="images/searching.png" alt="Searching logo">
        <h1>Search City</h1>
        <p>Find out the weather conditions of the city.</p>
      </div>
       
    </div>
     <div class = "hourly-forecast-container">
      <h1 class="title">TODAY'S FORECAST</h1>
       <div class = "hourly-forecast-info">
        
      </div>
    </div>
    
   </div>

    <div>

    <div class="forecast-container">
      <h1 class="title">7-DAY FORECAST</h1>
      <div class = "forecast-info">
        
      </div>
     </div>

    </div>
    </div>
    `

    hideForecastSections();
    searchCity();
  }