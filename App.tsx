
import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-lg text-center">
        Calculadora Simple
      </h1>
      <Calculator />
    </div>
  );
};

export default App;
