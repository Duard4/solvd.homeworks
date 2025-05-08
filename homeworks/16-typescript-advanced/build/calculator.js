'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const readline = require('readline');
/**
 * BasicCalculator implementation of the Calculator interface
 * that performs arithmetic operations and handles errors
 */
class BasicCalculator {
  /**
   * Adds two numbers
   * @param num1 First number
   * @param num2 Second number
   * @returns Result object with the sum and empty error
   */
  add(num1, num2) {
    return {
      value: num1 + num2,
      error: '',
    };
  }
  /**
   * Subtracts the second number from the first
   * @param num1 First number
   * @param num2 Second number
   * @returns Result object with the difference and empty error
   */
  subtract(num1, num2) {
    return {
      value: num1 - num2,
      error: '',
    };
  }
  /**
   * Multiplies two numbers
   * @param num1 First number
   * @param num2 Second number
   * @returns Result object with the product and empty error
   */
  multiply(num1, num2) {
    return {
      value: num1 * num2,
      error: '',
    };
  }
  /**
   * Divides the first number by the second
   * @param num1 First number (dividend)
   * @param num2 Second number (divisor)
   * @returns Result object with the quotient or error message if divisor is zero
   */
  divide(num1, num2) {
    if (num2 === 0) {
      return {
        value: 0,
        error: 'Cannot divide by zero',
      };
    }
    return {
      value: num1 / num2,
      error: '',
    };
  }
  /**
   * Calculates base raised to the power of exponent
   * @param base Base number
   * @param exponent Power to raise the base to
   * @returns Result object with the calculated power or error message if exponent is invalid
   */
  power(base, exponent) {
    if (exponent < 0 || !Number.isInteger(exponent)) {
      return {
        value: 0,
        error: 'Exponent must be a positive integer',
      };
    }
    return {
      value: Math.pow(base, exponent),
      error: '',
    };
  }
  /**
   * Calculates the square root of a number
   * @param num Number to calculate square root of
   * @returns Result object with the square root or error message if number is negative
   */
  sqrt(num) {
    if (num < 0) {
      return {
        value: 0,
        error: 'Cannot calculate square root of negative number',
      };
    }
    return {
      value: Math.sqrt(num),
      error: '',
    };
  }
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const calc = new BasicCalculator();
const ask = (query) => new Promise((resolve) => rl.question(query, resolve));
function main() {
  return __awaiter(this, void 0, void 0, function* () {
    console.log('Calculator is on!');
    while (true) {
      const operation = yield ask(
        'Choose operation (add, subtract, multiply, divide, power, sqrt) or "stop": '
      );
      if (operation === 'stop') {
        console.log('Calculator is off!');
        rl.close();
        break;
      }
      const isUnary = operation === 'sqrt';
      const num1 = parseFloat(yield ask('Enter first number: '));
      const num2 = isUnary ? 0 : parseFloat(yield ask('Enter second number: '));
      let result;
      switch (operation) {
        case 'add':
          result = calc.add(num1, num2);
          break;
        case 'subtract':
          result = calc.subtract(num1, num2);
          break;
        case 'multiply':
          result = calc.multiply(num1, num2);
          break;
        case 'divide':
          result = calc.divide(num1, num2);
          break;
        case 'power':
          result = calc.power(num1, num2);
          break;
        case 'sqrt':
          result = calc.sqrt(num1);
          break;
        default:
          console.log('Unknown operation');
          rl.close();
          return;
      }
      if (result.error) {
        console.log(`Error: ${result.error}`);
      } else {
        console.log(`Result: ${result.value}`);
      }
    }
  });
}
main();
