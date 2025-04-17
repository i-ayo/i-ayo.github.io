/**
 * Performs arithmetic calculations based on the provided operands and operator
 * 
 * @param {number} firstOperand - The first number in the calculation
 * @param {number} secondOperand - The second number in the calculation
 * @param {string} operator - The arithmetic operator ('+', '-', '*', or '/')
 * @returns {number} The result of the calculation
 */

export function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        // If no valid operator is provided, return the second operand
        return secondOperand;
    }
}