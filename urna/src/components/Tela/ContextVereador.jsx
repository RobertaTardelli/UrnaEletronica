

import { createContext, useContext, useState } from 'react';

const VereadorContext = createContext();

export const ThemeContext = ({ children }) => {
  const [candidatos, setCandidatos] = useState([
    // ... seu array de candidatos
  ]);

  const [votosInvalidos, setVotosInvalidos] = useState({
    'votos_nulos': 0,
    'votos_brancos': 0
  });

  const incrementarVotosSenador = (numero) => {
    // Sua lógica para incrementar os votos do senador
  };

  const apuracaoSenador = () => {
    // Sua lógica para calcular a apuração dos senadores
  };

  return (
    <SenadorContext.Provider value={{ candidatos, votosInvalidos, incrementarVotosSenador, apuracaoSenador }}>
      {children}
    </SenadorContext.Provider>
  );
};

export const useSenador = () => {
  return useContext(SenadorContext);
};