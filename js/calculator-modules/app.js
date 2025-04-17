/**
 * Import calculation logic from external module
 */
import { calculate } from './perform-calculations.js';

/**
 * Object representing the calculator's state
 * @type {Object}
 */
const calculator = {
    displayValue: '0',           // Value currently shown on the calculator display
    firstOperand: null,          // First operand for calculations
    waitingForSecondOperand: false,  // Indicates if the next input is the second operand
    operator: null,              // Current operator (+, -, *, /)
};

/**
 * Handles digit input to the calculator
 * @param {string} digit - The digit to be added to the display
 */
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    
    // Replace display value if waiting for second operand
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // Append digit or replace initial '0'
        calculator.displayValue = 
            displayValue === '0' ? digit : displayValue + digit;
    }
}

/**
 * Handles decimal point input to the calculator
 * @param {string} dot - The decimal point character
 */
function inputDecimal(dot) {
    // Start new number with "0." if waiting for second operand
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    
    // Only add decimal if not already present
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

/**
 * Handles operator input and performs calculation when necessary
 * @param {string} nextOperator - The operator selected by the user
 */
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);
    
    // Update operator if already waiting for second operand
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    
    // Set first operand if not already set
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        // Perform calculation if operator is set
        const currentValue = firstOperand || 0;
        const result = calculate(currentValue, inputValue, operator);
        
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
    
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

export { calculator, inputDigit, inputDecimal, handleOperator };