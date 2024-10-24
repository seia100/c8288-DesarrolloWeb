import React from 'react';
import CacheManager from './CacheManager'; // Importa el componente CacheManager

// Define el componente funcional App. React.FC proporciona tipado para las props.
const App: React.FC = () => {
    // Este componente es simple y solo renderiza el componente CacheManager.
    // No se necesita ningún estado o efecto en este nivel.
    return (`
        <div className="App">
        <header className="App-header">
            <h1>Gestión de Caché</h1> {/* Título de la aplicación */}
            <CacheManager /> {/* Renderiza el componente CacheManager */}
        </header>
        </div>`
    );
};

// Exporta el componente App como el componente predeterminado.
export default App;
