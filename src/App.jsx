import React from "react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

function App() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [weatherImage, setWeatherImage] = useState("");

  function getWeather() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let MT = Math.round(data.main.temp);
        let FL = Math.round(data.main.feels_like);

        const weather = {
          location: `${data.name}`,
          temperature: `${Math.round(MT)}°C`,
          feels_like: `${FL} °C`,
          humidity: `${data.main.humidity} %`,
          wind: `${data.wind.speed} km/h`,
          condition: `${data.weather[0].main}`,
        };

        setWeatherInfo(weather);
        setWeatherImage(getImage(data.weather[0].main));
      });
  }

  function getImage(type) {
    if (type == "Clear") {
      // return "./src/assets/images/clear.png";
      return "/images/clear.png"
    }
    if (type == "Clouds") {
      // return "./src/assets/images/clouds.png";
      return "/images/clouds.png"
    }
    if (type == "Drizzle") {
      // return "./src/assets/images/drizzle.png";
      return "/images/drizzle.png"
    }
    if (type == "Humidity") {
      // return "./src/assets/images/humidity.png";
      return "/images/humidity.png"
    }
    if (type == "Mist" || "Haze") {
      // return "./src/assets/images/mist.png";
      return "/images/mist.png"
    }
    if (type == "Rain") {
      // return "./src/assets/images/rain.png";
      return "/images/rain.png"
    }
    if (type == "Snow") {
      // return "./src/assets/images/snow.png";
      return "/images/snow.png"
    }
    if (type == "Wind") {
      // return "./src/assets/images/wind.png";
      return "/images/wind.png"
    }
  }

  return (
    <div className="component">
    <div className="card">
      <div className="search">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}><IoSearch size={27}/></button>
      </div>
      {weatherInfo && (
        <div className=" row">
          <div className="weather col">
            <h1 className="temp">{weatherInfo.temperature}</h1>
            <h3 className="city">{weatherInfo.location}</h3>
            <img src={weatherImage} alt="image" className="weather-icon" />
            <h5>{weatherInfo.condition}</h5>
          </div>

          <div className=" details col">
            <div className="innercard card">
              <p>Humidity</p>
              <h4 className="humidity">{weatherInfo.humidity}</h4>
            </div>
            <div className="line"></div>
            <div className="innercard card">
              <p>Wind speed</p>
              <h4 className="wind">{weatherInfo.wind}</h4>
            </div>
            <div className="line"></div>
            <div className="innercard card">
              <p>Feels like</p>
              <h4 className="feels_like">{weatherInfo.feels_like}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
