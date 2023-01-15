import React from 'react';
import data from './data.json';

function Monitoring() {
  return (
    <div className="container">
      <h1 className="text-center text-primary">Monitoring</h1>
      <h2>Alerts</h2>
      <ul className="list-group">
        {data.alerts.map(alert => (
          <li key={alert.id} className={`list-group-item list-group-item-${alert.type}`}>
            {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Monitoring;
