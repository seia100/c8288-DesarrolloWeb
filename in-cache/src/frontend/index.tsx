import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importa el componente principal de la aplicación

// Renderiza el componente App dentro del elemento con el ID 'root'.
// React.StrictMode activa comprobaciones adicionales y advertencias durante el desarrollo.
ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
);
