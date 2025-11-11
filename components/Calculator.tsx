
import React, { useState, useCallback } from 'react';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const clear = useCallback(() => {
    setDisplayValue('0');
    setOperator(null);
    setPrevValue(null);
    setWaitingForOperand(false);
  }, []);

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  }, [displayValue, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  }, [displayValue, waitingForOperand]);

  const performOperation = useCallback((nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (prevValue === null) {
      setPrevValue(displayValue);
    } else if (operator) {
      const currentValue = parseFloat(prevValue);
      let result = 0;
      switch (operator) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '*':
          result = currentValue * inputValue;
          break;
        case '/':
          result = currentValue / inputValue;
          break;
        default:
          break;
      }
      setDisplayValue(String(result));
      setPrevValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [displayValue, operator, prevValue]);

  const calculate = useCallback(() => {
    if (prevValue === null || operator === null) {
      return;
    }
    const currentValue = parseFloat(displayValue);
    const previousValue = parseFloat(prevValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      case '*':
        result = previousValue * currentValue;
        break;
      case '/':
        result = previousValue / currentValue;
        break;
      default:
        return;
    }

    setDisplayValue(String(result));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }, [displayValue, operator, prevValue]);

  const renderButton = (label: string, className: string, onClick: () => void) => (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center p-4 rounded-xl text-2xl font-semibold transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-md ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 ease-in-out">
      <div className="bg-gray-800 text-white text-right p-5 mb-6 rounded-xl text-4xl sm:text-5xl font-mono overflow-hidden break-all shadow-inner">
        {displayValue}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {renderButton('C', 'col-span-2 bg-red-500 hover:bg-red-600 text-white', clear)}
        {renderButton('/', 'bg-purple-500 hover:bg-purple-600 text-white', () => performOperation('/'))}
        {renderButton('*', 'bg-purple-500 hover:bg-purple-600 text-white', () => performOperation('*'))}

        {renderButton('7', 'bg-gray-200 hover:bg-gray-300 text-gray-800', () => inputDigit('7'))}
        {renderButton('8', 'bg-gray-200 hover:bg-gray-300 text-gray-800', () => inputDigit('8'))}
        {renderButton('9', 'bg-gray-200 hover:bg-gray-300 text-gray-800', () => inputDigit('9'))}
        {renderButton('-', 'bg-purple-500 hover:bg-purple-600 text-white', () => performOperation('-'))}

        {renderButton('4', 'bg-gray-200 hover:bg-gray-300 text-gray-800', () => inputDigit('4'))}
        {renderButton('5', 'bg-gray-200 hover:bg-gray-300 text-gray-800', () => inputDigit('5'))}
        {renderButton('6', 'bg-gray-200 hover:bg-gray-300 text-gray-800', () => inputDigit('6'))}
        {renderButton('+', 'bg-purple-500 hover:bg-purple-600 text-white', () => performOperation('+'))}

        {renderButton('1', 'bg-gray-200 hover:bg-gray-300 text-gray-800', () => inputDigit('1'))}
        {renderButton('2', 'bg-gray-200 hover:bg-gray-300 text-gray-800', () => inputDigit('2'))}
        {renderButton('3', 'bg-gray-200 hover:bg-gray-300 text-gray-800', () => inputDigit('3'))}
        {renderButton('=', 'row-span-2 bg-green-500 hover:bg-green-600 text-white', calculate)}

        {renderButton('0', 'col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800', () => inputDigit('0'))}
        {renderButton('.', 'bg-gray-200 hover:bg-gray-300 text-gray-800', inputDecimal)}
      </div>
    </div>
  );
};

export default Calculator;
