let display = document.getElementById('display');
let buttons = document.querySelectorAll('.buttons button');

let calculator = {
  displayValue: '',
  firstOperand: '',
  secondOperand: '',
  operator: '',
  isOperatorPressed: false,

  init() {
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        this.handleButtonPress(event.target.id);
      });
    });
  },

  handleButtonPress(buttonId) {
    switch (buttonId) {
      case 'clear':
        this.clear();
        break;
      case 'backspace':
        this.backspace();
        break;
      case 'divide':
      case 'multiply':
      case 'subtract':
      case 'add':
        this.setOperator(buttonId);
        break;
      case 'equals':
        this.calculate();
        break;
      default:
        this.appendNumber(buttonId);
    }
    this.updateDisplay();
  },

  clear() {
    this.displayValue = '';
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = '';
    this.isOperatorPressed = false;
  },

  backspace() {
    this.displayValue = this.displayValue.slice(0, -1);
  },

  setOperator(operator) {
    if (this.isOperatorPressed) return;
    this.operator = operator;
    this.firstOperand = this.displayValue;
    this.displayValue = '';
    this.isOperatorPressed = true;
  },

  appendNumber(number) {
    if (this.isOperatorPressed) {
      this.displayValue = '';
      this.isOperatorPressed = false;
    }
    this.displayValue += number;
  },

  calculate() {
    this.secondOperand = this.displayValue;
    let result = 0;
    switch (this.operator) {
      case 'divide':
        result = parseFloat(this.firstOperand) / parseFloat(this.secondOperand);
        break;
      case 'multiply':
        result = parseFloat(this.firstOperand) * parseFloat(this.secondOperand);
        break;
      case 'subtract':
        result = parseFloat(this.firstOperand) - parseFloat(this.secondOperand);
        break;
      case 'add':
        result = parseFloat(this.firstOperand) + parseFloat(this.secondOperand);
        break;
    }
    this.displayValue = result.toString();
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = '';
    this.isOperatorPressed = false;
  },

  updateDisplay() {
    display.value = this.displayValue;
  }
};

calculator.init();