// src/components/Calculator.js

import React, { useState } from 'react';
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

  const handleButtonClick = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
      setConfetti(false);
    } else if (value === '2nd') {
      setIs2nd(!is2nd);
    } else if (value === 'mc') {
      setMemory(0);
    } else if (value === 'mr') {
      setInput(memory.toString());
    } else if (value === 'm+') {
      setMemory(memory + parseFloat(result || input));
    } else if (value === 'm-') {
      setMemory(memory - parseFloat(result || input));
    } else if (value === '=') {
      try {
        const res = eval(input);
        setResult(res);
        setInput(res.toString());
        setHistory([...history, { input, result: res }]);
        if (input.includes('5') && input.includes('6')) {
          setConfetti(true);
        }
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'Rad') {
      setIsRad(!isRad);
    } else if (value === 'Hist') {
      setShowHistory(!showHistory);
    } else {
      setInput((prev) => prev + value);
      setConfetti(false);
    }
  };

  return (
    <div className="calculator">
      <Display input={input} result={result} />
      <div className="buttons">
        {['(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷', 
          '2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×',
          '¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '−',
          'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
          'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', 'Hist', '='].map((btn) => (
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
