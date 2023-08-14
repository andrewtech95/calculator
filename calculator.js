let a = '';
let b = '';
let result = null;
let currentOperator = null;
let lastOperator = null;
shouldResetDisplay = false;

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalBtn = document.getElementById('equalBtn');
const allClearBtn = document.getElementById('allClearBtn');
const clearBtn = document.getElementById('clearBtn');
const percentBtn = document.getElementById('percentBtn');
const decimalBtn = document.getElementById('decimalBtn');
const signBtn = document.getElementById('signBtn');

numbers.forEach(button => button.addEventListener('click', 
() => updateDisplay(button.textContent)));

operators.forEach(operator => operator.addEventListener('click', 
() => setOperation(operator.textContent)));

equalBtn.addEventListener('click', operate);

allClearBtn.addEventListener('click', clear);

clearBtn.addEventListener('click', backspace);

decimalBtn.addEventListener('click', addDecimalPoint);

signBtn.addEventListener('click', changeSign);


function updateDisplay(number) {
  if (display.textContent === '0' || shouldResetDisplay) {
    display.textContent = '';
    shouldResetDisplay = false;
  }
  
  if (display.textContent.length > 13) return;

  display.textContent += number;
}

function setOperation(operator) {
  if (currentOperator) operate();
  
  a = display.textContent;
  currentOperator = operator;

  shouldResetDisplay = true;
}

function operate() {
  if (currentOperator === null) currentOperator = lastOperator; 

  b = display.textContent;
  
  if (currentOperator === null) return;
  if (currentOperator === '+') add(a, b);
  if (currentOperator === '-') subtract(a, b);
  if (currentOperator === 'x') multiply(a, b);
  if (currentOperator === '÷') divide(a, b);

  showResult(`${result}`);

  lastOperator = currentOperator;
  currentOperator = null;
}

function showResult(result) {
  if (result.length > 14) result = result.slice(0, 14);

  display.textContent = result;

  shouldResetDisplay = true;
}

function clear() {
  a = '';
  b = '';
  currentOperator = null;
  lastOperator = null;
  result = null;
  display.textContent = '0';
}

function backspace() {
  if (display.textContent.length === 1) display.textContent = '0';
  else display.textContent = display.textContent
                                    .slice(0, display.textContent.length - 1);
}

function addDecimalPoint() {
  if(display.textContent.includes('.')) return;
  display.textContent += '.';
}

function changeSign() {
  if (display.textContent === '0') return;
  if (display.textContent.includes('-')) {
    display.textContent = display.textContent.slice(1);
  } else display.textContent = '-' + display.textContent;
}

function add(a, b) {
  result = (+a) + (+b);
}
function subtract(a, b) {
  result = a - b;
}
function multiply(a, b) {
  result = a * b;
}
function divide(a, b) {
  result = a / b;
}