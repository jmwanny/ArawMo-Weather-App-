 import {searchCity} from '../main.js'

  export function renderDefaultPage() {
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