import React from "react";
import WeatherIcon from "./WeatherImg";
import "./WeatherForecastDay.css";

export default function WeatherForecastDay(props) {
  function unitsChecker(un) {
    if (props.units === "F") {
      return un * (9 / 5) + 32;
    } else {
      return un;
    }
  }
  function maxTemperature() {
    let temperature = Math.round(unitsChecker(props.data.temp.max));
    return `${temperature}°${props.units}`;
  }
  function minTemperature() {
    let temperature = Math.round(unitsChecker(props.data.temp.min));
    return `${temperature}°${props.units}`;
  }
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }
  return (
    <div className="ForecastDay">
      <div className="WeatherForecastDay">{day()}</div>
      <div className="WeatherForecastIcon">
        <WeatherIcon code={props.data.weather[0].icon} size={37} />
      </div>
      <div className="WeatherForecastTemp">
        <span className="WeatherForecastTemp-min">{minTemperature()}</span>🌡
        <span className="WeatherForecastTemp-max">{maxTemperature()}</span>
      </div>

      <div className="WeatherForecastDescription">{props.data.weather[0].description}</div>
    </div>
  );
}
