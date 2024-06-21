// src/components/Calculator.js

import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import Button from './Button';
import Display from './Display';
import ConfettiComponent from './Confetti';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [confetti, setConfetti] = useState(false);
  const [history, setHistory] = useState([]);
  const [isRad, setIsRad] = useState(true);
  const [memory, setMemory] = useState(0);
  const [is2nd, setIs2nd] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const sanitizeInput = (input) => {
    return input
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/x²/g, '**2')
      .replace(/x³/g, '**3')
      .replace(/²√x/g, 'sqrt')
      .replace(/³√x/g, 'cbrt')
      .replace(/log/g, 'log10')
      .replace(/ln/g, 'log');
  };

  const handleButtonClick = (value) => {
    try {
      switch (value) {
        case 'AC':
          setInput('');
          setResult('');
          setConfetti(false);
          break;
        case '2nd':
          setIs2nd(!is2nd);
          break;
        case 'mc':
          setMemory(0);
          break;
        case 'mr':
          setInput(memory.toString());
          break;
        case 'm+':
          setMemory(memory + parseFloat(result || input || '0'));
          break;
        case 'm-':
          setMemory(memory - parseFloat(result || input || '0'));
          break;
        case '=':
          if (input.trim() === '') {
            setResult('Error');
            break;
          }
          const sanitizedInput = sanitizeInput(input);
          const res = evaluate(sanitizedInput);
          setResult(res.toString());
          setInput(res.toString());
          setHistory([...history, { input, result: res.toString() }]);
          if (input.includes('5') && input.includes('6')) {
            setConfetti(true);
          }
          break;
        case 'Rad':
          setIsRad(!isRad);
          break;
        case 'Hist':
          setShowHistory(!showHistory);
          break;
        default:
          // Special handling for square, cube, and root functions
          if (value === 'x²') {
            setInput((prev) => prev + '**2');
          } else if (value === 'x³') {
            setInput((prev) => prev + '**3');
          } else if (value === '²√x') {
            setInput((prev) => 'sqrt(' + prev + ')');
          } else if (value === '³√x') {
            setInput((prev) => 'cbrt(' + prev + ')');
          } else if (value === 'log') {
            setInput((prev) => 'log10(' + prev + ')');
          } else if (value === 'ln') {
            setInput((prev) => 'log(' + prev + ')');
          } else {
            // Prevent multiple consecutive operators
            if (/[\+\-\\/]$/.test(input) && /[\+\-\\/]/.test(value)) {
              setInput((prev) => prev.slice(0, -1) + value);
            } else {
              setInput((prev) => prev + value);
            }
          }
          setConfetti(false);
      }
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="calculator">
      <Display input={input} result={result} />
      <div className="buttons">
        {[
          '(', ')', 'mc', 'm+', 'm-', 'mr', 'AC', '+/-', '%', '÷', 
          '2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×',
          '¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-',
          'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
          'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', 'Hist', '='
        ].map((btn) => (
          <Button key={btn} value={btn} onClick={handleButtonClick} />
        ))}
      </div>
      {confetti && <ConfettiComponent />}
      {showHistory && (
        <div className="history">
          <h2>History</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                {item.input} = {item.result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calculator;