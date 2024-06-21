// src/components/Button.js

import React from 'react';
import './Button.css';

const Button = ({ value, onClick }) => {
  const isOperator = /[+\-×÷=]/.test(value);
  const isFunction = /[\(\)mc|mr|AC]/.test(value); // Adjusted to include AC for the function
  const isLightGrey = /[7894561230.]/.test(value) && value !== '10ˣ';
  const isOrange = ['+', '−', '×', '÷', '='].includes(value);
  const is2nd = value === '2nd';

  let buttonClass = '';

  if (isOperator && isOrange) {
    buttonClass = 'button operator orange';
  } else if (isFunction) {
    buttonClass = 'button function';
  } else if (is2nd) {
    buttonClass = 'button dark-grey';
  } else if (isLightGrey) {
    buttonClass = 'button light-grey';
  } else {
    buttonClass = 'button dark-grey';
  }

  return (
    <button className={buttonClass} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Button;
