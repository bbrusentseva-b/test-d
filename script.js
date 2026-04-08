// Простой калькулятор с функциями: сложение, вычитание, умножение, деление и равно
// Поддерживает ввод чисел, десятичную точку, C (сброс) и операции + − × ÷.

const displayEl = document.getElementById('display');
const keysEl = document.querySelector('.keys');
const clearBtn = document.getElementById('clear');

// Внутреннее состояние калькулятора
let firstOperand = null;
let operator = null;
let waitingForSecond = false;

// Арифметические функции (на случай использования напрямую)
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return 'Ошибка: деление на ноль';
  return a / b;
}

// Обновить дисплей
function updateDisplay(value) {
  displayEl.textContent = String(value);
}

// Обработчик нажатий на кнопки
keysEl.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.matches('button')) return;
  const action = target.dataset.action;
  const keyContent = target.textContent;

  if (action === 'digit') {
    inputDigit(keyContent);
    return;
  }
  if (action === 'decimal') {
    inputDecimal();
    return;
  }
  if (action === 'operator') {
    handleOperator(keyContent);
    return;
  }
  if (action === 'equals') {
    equals();
    return;
  }
});

clearBtn.addEventListener('click', resetCalculator);

function inputDigit(digit) {
  if (waitingForSecond) {
    updateDisplay(digit);
    waitingForSecond = false;
  } else {
    const current = displayEl.textContent;
    updateDisplay(current === '0' ? digit : current + digit);
  }
}

function inputDecimal() {
  const current = displayEl.textContent;
  if (waitingForSecond) {
    updateDisplay('0.');
    waitingForSecond = false;
    return;
  }
  if (!current.includes('.')) {
    updateDisplay(current + '.');
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayEl.textContent);
  if (operator && waitingForSecond) {
    operator = nextOperator; // смена оператора до ввода второго операнда
    return;
  }
  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation(firstOperand, inputValue, operator);
    updateDisplay(result);
    firstOperand = (typeof result === 'number') ? result : null;
  }
  operator = nextOperator;
  waitingForSecond = true;
}

function performCalculation(a, b, op) {
  switch (op) {
    case '+': return add(a, b);
    case '−': return subtract(a, b);
    case '×': return multiply(a, b);
    case '÷': return divide(a, b);
    default: return b;
  }
}

// Функция равно — выполняет вычисление и сбрасывает состояние оператора
function equals() {
  if (operator === null || firstOperand === null) return;
  const secondOperand = parseFloat(displayEl.textContent);
  const result = performCalculation(firstOperand, secondOperand, operator);
  updateDisplay(result);
  // после равно подготовимся к новому вводу
  firstOperand = null;
  operator = null;
  waitingForSecond = false;
}

function resetCalculator() {
  updateDisplay('0');
  firstOperand = null;
  operator = null;
  waitingForSecond = false;
}

// Инициализация
resetCalculator();
