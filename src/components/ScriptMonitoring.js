import React from 'react';
import data from './dataScript.json';

function ScriptMonitoring() {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Started</th>
          <th>Completed</th>
          <th>Server</th>
          <th>Script Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.scripts.map(script => (
          <tr key={script.id}>
            <td>{script.start_time}</td>
            <td>{script.end_time}</td>
            <td>{script.server}</td>
            <td>{script.name}</td>
            <td className={`${script.status.toLowerCase()}`}>{script.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ScriptMonitoring;
