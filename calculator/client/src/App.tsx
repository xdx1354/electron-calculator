import React from 'react';
import './App.css';
import Calculator from "./screens/calculator/Calculator";
import Configurator from "./screens/configurator/Configurator";

function App() {
  return (
    <div className="App">
        <Configurator></Configurator>
      {/*<Calculator></Calculator>*/}
    </div>
  );
}

export default App;
