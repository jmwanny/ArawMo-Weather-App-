import { formatShortDate, formatLongDate } from "../utils/dateUtils.js";

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
       day: formatShortDate(day.date),
       avgTemp: day.day.avgtemp_c,
       condition: {
        text: day.day.condition.text,
        icon: day.day.condition.icon
       },
       humidity: day.day.avghumidity,
       wind: day.day.maxwind_kph
      }));

      const every3HourForecast = [

      ]

      

      const hours = data.forecast.forecastday[0].hour;
      
      for(let i=0; i<hours.length; i+=3) {
      every3HourForecast.push({
        time: hours[i].time,
        temp: hours[i].temp_c,
        condition: {
          text: hours[i].condition.text,
          icon: hours[i].condition.icon
        }
      });
      }
      
  
      const weather = {
      city: data.location.name,
      day: formatLongDate(data.day),
      temp: data.current.temp_c,
      condition: {
        text: data.current.condition.text,
        icon: data.current.condition.icon
      },
      humidity: data.current.humidity,
      wind: data.current.wind_kph,
      weekForecast,
      every3HourForecast
      }
      
      return weather;
      
    } catch (error) {
      console.error('Failed to fetch weather. Please try again later!');
      return null;
    }
  }