import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherApp from './WeatherApp';

import icon01d from './Components/icons/01d.png';
import icon01n from './Components/icons/01n.png';
import icon02d from './Components/icons/02d.png';
import icon02n from './Components/icons/02n.png';
import icon03d from './Components/icons/03d.png';
import icon03n from './Components/icons/03n.png';
import icon04d from './Components/icons/04d.png';
import icon04n from './Components/icons/04n.png';
import icon09d from './Components/icons/09d.png';
import icon09n from './Components/icons/09n.png';
import icon10d from './Components/icons/10d.png';
import icon10n from './Components/icons/10n.png';
import icon11d from './Components/icons/11d.png';
import icon11n from './Components/icons/11n.png';
import icon13d from './Components/icons/13d.png';
import icon13n from './Components/icons/13n.png';
import icon50d from './Components/icons/50d.png';
import icon50n from './Components/icons/50n.png';

const icons = {
  '01d': icon01d,
  '01n': icon01n,
  '02d': icon02d,
  '02n': icon02n,
  '03d': icon03d,
  '03n': icon03n,
  '04d': icon04d,
  '04n': icon04n,
  '09d': icon09d,
  '09n': icon09n,
  '10d': icon10d,
  '10n': icon10n,
  '11d': icon11d,
  '11n': icon11n,
  '13d': icon13d,
  '13n': icon13n,
  '50d': icon50d,
  '50n': icon50n,
};

export default icons;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);


