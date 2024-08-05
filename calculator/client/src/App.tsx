import React from 'react';
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
  );
}

export default App;
