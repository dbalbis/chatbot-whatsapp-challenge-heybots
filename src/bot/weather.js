import axios from 'axios';
import config from '../config/config.js';

export function getWeather(city) {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=${config.OPENWEATHERKEY}`
    )
    .then((response) => {
      const temperature = response.data.main.temp;
      const city = response.data.name;
      const description = response.data.weather[0].description;

      return `📡 Actualmente en ${city} hay ${temperature} grados con ${description}. `;
    })
    .catch((error) => {
      console.log(error);
      return 'No se pudo obtener el clima, coloca una ciudad.';
    });
}
