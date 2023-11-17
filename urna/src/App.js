import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TelaVereador from './components/Tela/Vereador';
import TelaSenador from './components/Tela/Senador';
import TelaPresidente from './components/Tela/Presidente';

function App() {
  return (
    <Router>
      <div>
          <Routes>
          <Route path="/" element={<TelaVereador />} />
          <Route path="/TelaSenador" element={<TelaSenador />} />
          <Route path="/TelaPresidente" element={<TelaPresidente />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;