import React from 'react';
import Calculator from "./screens/calculator/Calculator";
import Editor from "./screens/editor/Editor";
import Configurator from "./screens/configurator/Configurator";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilesBrowser from "./screens/browser/ProfilesBrowser";
import Menu from "./screens/menu/Menu";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/config" element={<Configurator />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/browse" element={<ProfilesBrowser/>} />
              <Route path="/" element={<Menu/>} />
          </Routes>
      </Router>
  );
}

export default App;
