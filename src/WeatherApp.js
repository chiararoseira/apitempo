import React, { useState, useEffect } from 'react';
import './Components/css/style.css';
import icons from './index';
import chichi from './Components/eg/chichi.gif';
import anninha from './Components/eg/anninha.gif';
import gui from './Components/eg/gui.gif';

const api = {
  key: "64ed82577ced7f69cb1687f0ce536131",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric"
}

function WeatherApp() {
  const [city, setCity] = useState("Cidade Exemplo, BR");
  const [date, setDate] = useState("");
  const [temp, setTemp] = useState(22);
  const [tempUnit, setTempUnit] = useState("°c");
  const [weather, setWeather] = useState("Nublado");
  const [lowHigh, setLowHigh] = useState("22°c / 23°c");
  const [icon, setIcon] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gif, setGif] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        fetchWeatherByCoords(lat, long);
      }, error => {
        alert(`Erro: ${error.message}`);
      });
    } else {
      alert('Navegador não suporta geolocalização');
    }
  }, []);

  const fetchWeatherByCoords = (lat, long) => {
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        displayResults(data);
      })
      .catch(error => {
        alert(error.message);
      });
  };

const fetchWeatherByCity = (city) => {
  fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Cidade não localizada');
        } else {
          throw new Error(`Erro HTTP: status ${response.status}`);
        }
      }
      return response.json();
    })
    .then(data => {
      displayResults(data);
    })
    .catch(error => {
      alert(error.message);
    });
};

  const displayResults = (weatherData) => {
    setCity(`${weatherData.name}, ${weatherData.sys.country}`);
    setDate(dateBuilder(new Date()));
    
    const iconCode = weatherData.weather[0].icon;
    setIcon(icons[iconCode] || icons['01d']); 
    
    setTemp(Math.round(weatherData.main.temp));
    setWeather(capitalizeFirstLetter(weatherData.weather[0].description));
    setLowHigh(`${Math.round(weatherData.main.temp_min)}°c / ${Math.round(weatherData.main.temp_max)}°c`);
  };

  const dateBuilder = (d) => {
    const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearch = () => {
    fetchWeatherByCity(inputValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const changeTemp = () => {
    if (tempUnit === "°c") {
      const f = (temp * 1.8) + 32;
      setTempUnit("°f");
      setTemp(Math.round(f));
    } else {
      const c = (temp - 32) / 1.8;
      setTempUnit("°c");
      setTemp(Math.round(c));
    }
  };

    const handleEasterEggClick = () => {
      const gifs = [chichi, anninha, gui];
      const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
      setGif(randomGif);
    };

  return (
    <div className="container-fluid p-0 container-sm d-flex justify-content-center">
      <div className="card text-center shadow-lg" style={{ width: '26rem' }}>
        <div className="card-header bg-white text-dark font-weight-bold">
          TEMPO E TEMPERATURA
        </div>
        <div className="card-body">
          <div className="city">{city}</div>   
  
          <div className="date">{date}</div>
          <div className="container-img">
            <img src={icon} alt="Weather icon" />
          </div>
          <div className="container-temp mx-4 my-3" onClick={changeTemp}>
            {/* Cria um container para a temperatura */}
            <div className="temperature-container">
              <span className="temperature-value">{temp}</span>
              <span className="temperature-unit">{tempUnit}</span>
            </div>
          </div>
          <div className="weather py-2">{weather}</div>
          <div className="low-high">{lowHigh}</div>
        </div>
        <div className="card-footer bg-white">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light"
              placeholder="Digite o nome da cidade"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"   
  
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}   
  
              onKeyPress={handleKeyPress}
            />
            <div className="input-group-append">
              <button className="btn text-dark search-button" type="button" id="button-addon2" onClick={handleSearch}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button 
        className="easter-egg-btn" 
        onClick={handleEasterEggClick}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          padding: '10px',
          border: 'none',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      >
        🍭
      </button>
      {gif && (
        <div className="gif-container" style={{ position: 'fixed', bottom: '60px', left: '20px' }}>
          <img src={gif} alt="Easter egg gif" style={{ width: '100px', height: '100px' }} />
        </div>
      )}
    </div>  
  );
}

export default WeatherApp;
