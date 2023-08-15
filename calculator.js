let a = '';
let b = '';
let currentOperator = null;
let result = null;
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
percentBtn.addEventListener('click', calculatePercentage)
decimalBtn.addEventListener('click', addDecimalPoint);
signBtn.addEventListener('click', changeSign);

window.addEventListener('keydown', determineKey);


function determineKey(e) {
  if (e.key >= 0 && e.key <= 9 ) updateDisplay(e.key);
  else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperation(e.key);
  else if (e.key === 'Enter' || e.key === '=') operate();
  else if (e.key === 'Backspace') backspace();
  else if (e.key === 'Escape') clear();
}

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
  if (currentOperator === null || shouldResetDisplay) return;

  b = display.textContent;
  
  if (currentOperator === '+') add();
  if (currentOperator === '-') subtract();
  if (currentOperator === '*') multiply();
  if (currentOperator === '/') divide();

  showResult(`${result}`);

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
  result = null;
  shouldResetDisplay = false;
  display.textContent = '0';
}

function backspace() {
  if (shouldResetDisplay) return;

  if (display.textContent.length === 1) display.textContent = '0';
  else display.textContent = display.textContent
                                    .slice(0, display.textContent.length - 1);
}

function calculatePercentage() {
  display.textContent = display.textContent / 100;
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

function add() {
  result = (+a) + (+b);
}
function subtract() {
  result = a - b;
}
function multiply() {
  result = a * b;
}
function divide() {
  if (b === '0') result = 'error';
  else result = a / b;
}