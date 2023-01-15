import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import Monitoring from './components/Monitoring'
import ScriptMonitoring from './components/ScriptMonitoring'
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/*<Monitoring />*/}
    <ScriptMonitoring />
  </React.StrictMode>,
  document.getElementById('root')
);
