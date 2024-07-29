import React from 'react';
import './App.css';
import Calculator from "./screens/calculator/Calculator";
import Configurator from "./screens/configurator/Configurator";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Configurator />} />
              <Route path="/calculator" element={<Calculator />} />
              {/*<Route path="/*" element={<NotFound />} />*/}
          </Routes>
      </Router>

    // <div className="App">
    //     <Configurator></Configurator>
    //   {/*<Calculator></Calculator>*/}
    //
    // </div>
  );
}

export default App;
