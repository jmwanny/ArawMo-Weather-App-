import { formatShortDate, formatLongDate, formatTime } from "../utils/dateUtils.js";

function getWeatherText(code) {
  const map = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime Fog",
    51: "Light Drizzle",
    53: "Drizzle",
    55: "Heavy Drizzle",
    56: "Freezing Drizzle",
    57: "Freezing Drizzle",
    61: "Light Rain",
    63: "Rain",
    65: "Heavy Rain",
    66: "Freezing Rain",
    67: "Freezing Rain",
    71: "Light Snow",
    73: "Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Rain Showers",
    81: "Rain Showers",
    82: "Heavy Showers",
    85: "Snow Showers",
    86: "Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm w/ Hail",
    99: "Thunderstorm w/ Hail"
  };

  return map[code] || "Unknown";
}


function getWeatherIcon(code) {
  const iconMap = {
    0: "01d",
    1: "02d",
    2: "03d",
    3: "04d",
    45: "50d",
    48: "50d",
    51: "09d",
    53: "09d",
    55: "09d",
    56: "09d",
    57: "09d",
    61: "10d",
    63: "10d",
    65: "10d",
    66: "13d",
    67: "13d",
    71: "13d",
    73: "13d",
    75: "13d",
    77: "13d",
    80: "09d",
    81: "09d",
    82: "09d",
    85: "13d",
    86: "13d",
    95: "11d",
    96: "11d",
    99: "11d"
  };

  const iconCode = iconMap[code] || "01d";
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}


export async function fetchWeather(city) {
  try {

    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results) return null;

    const { latitude, longitude, name } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,weather_code&forecast_days=7&timezone=auto`
    );

    const data = await weatherRes.json();

    const weekForecast = data.daily.time.map((date, index) => ({
      day: formatShortDate(date),
      avgTemp: data.daily.temperature_2m_max[index],
      condition: {
        text: getWeatherText(data.daily.weather_code[index]),
        icon: getWeatherIcon(data.daily.weather_code[index])
      },
      humidity: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m
    }));

    const every3HourForecast = [];

    for (let i = 0; i < 24 && i < data.hourly.time.length; i += 3) {
      every3HourForecast.push({
        time: formatTime(data.hourly.time[i]),
        temp: data.hourly.temperature_2m[i],
        condition: {
          text: getWeatherText(data.hourly.weather_code[i]),
          icon: getWeatherIcon(data.hourly.weather_code[i])
        }
      });
    }

    return {
      city: name,
      day: formatLongDate(data.current.time),
      temp: data.current.temperature_2m,
      condition: {
        text: getWeatherText(data.current.weather_code),
        icon: getWeatherIcon(data.current.weather_code)
      },
      humidity: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m,
      weekForecast,
      every3HourForecast
    };

  } catch (error) {
    console.error("Failed to fetch weather");
    return null;
  }
}
