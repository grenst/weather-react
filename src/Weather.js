import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [unit, setUnit] = useState("C");

  function unitsChecker(un) {
    if (unit === "F") {
      return un * (9 / 5) + 32;
    } else {
      return un;
    }
  }

  function unitsChanger() {
    if (unit === "F") {
      setUnit("C");
      search();
    } else {
      setUnit("F");
      search();
    }
  }

  function searchCity(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      country: response.data.sys.country,
      temperature: unitsChecker(response.data.main.temp),
      maxTemp: unitsChecker(response.data.main.temp_max),
      minTemp: unitsChecker(response.data.main.temp_min),
      feelsLike: unitsChecker(response.data.main.feels_like),
      pressure: response.data.main.pressure,
      visibility: response.data.visibility,
      clouds: response.data.clouds.all,
      humidity: response.data.main.humidity,
      weatherMain: response.data.weather[0].main,
      description: response.data.weather[0].description,
      windSpeed: response.data.wind.speed,
      coordinates: response.data.coord,
      icon: response.data.weather[0].icon,
      date: new Date(response.data.dt * 1000),
    });
  }

  function search() {
    let apiKey = "d472df3cc457416a11c7918c00d8eaa1";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(searchCity);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather border px-4">
        <h1 className="pt-3 display-3">
          Weather <span className="text-warning">App</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-3">
              <input type="search" placeholder="Enter a City..." className="form-control" onChange={handleCityChange} />
            </div>
            <div className="col-3">
              <button type="submit" className="searchButton btn-primary" onClick={handleSubmit}>
                Search
              </button>
            </div>
            <div className="col-1">
              <button type="submit" className="unitsButton btn-light" onClick={unitsChanger}>
                Units °{unit}
              </button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-5">
            <WeatherInfo data={weatherData} units={unit} />
          </div>
          <div className="col-7">
            <h2>DAILY FORECAST</h2>
            <WeatherForecast coordinates={weatherData.coordinates} units={unit} />
          </div>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading. . .";
  }
}
