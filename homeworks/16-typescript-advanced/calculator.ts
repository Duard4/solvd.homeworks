import * as readline from 'readline';

/**
 * Defines the structure of a calculation result
 * with a numeric value and an optional error message.
 */
interface Result {
  value: number;
  error: string;
}

/**
 * Interface for a calculator that supports basic arithmetic operations.
 */
interface Calculator {
  add(num1: number, num2: number): Result;
  subtract(num1: number, num2: number): Result;
  multiply(num1: number, num2: number): Result;
  divide(num1: number, num2: number): Result;
  power(base: number, exponent: number): Result;
  sqrt(num: number): Result;
}

/**
 * A basic implementation of the Calculator interface
 * that handles arithmetic operations and errors.
 */
class BasicCalculator implements Calculator {
  /**
   * Adds two numbers
   * @param num1 First number
   * @param num2 Second number
   * @returns Result object with the sum and empty error
   */
  add(num1: number, num2: number): Result {
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
  subtract(num1: number, num2: number): Result {
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
  multiply(num1: number, num2: number): Result {
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
  divide(num1: number, num2: number): Result {
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
  power(base: number, exponent: number): Result {
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
  sqrt(num: number): Result {
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

/**
 * Readline interface for handling console input/output
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Instance of the BasicCalculator to perform arithmetic operations
 */
const calc = new BasicCalculator();

/**
 * Promisified wrapper around readline.question to simplify async input
 * @param query Prompt message to display to the user
 * @returns Promise that resolves with user input as a string
 */
const ask = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

/**
 * Main function that runs an interactive calculator in a loop
 * Accepts user input for operations and numbers, performs the operation,
 * and displays the result or error message
 * Loop continues until the user types "exit"
 */
async function main() {
  console.log('Calculator is on!');
  while (true) {
    const operation = await ask(
      'Choose operation (add, subtract, multiply, divide, power, sqrt) or "stop": '
    );

    if (operation === 'stop') {
      console.log('Calculator is off!');
      rl.close();
      break;
    }

    const isUnary = operation === 'sqrt';

    const num1 = parseFloat(await ask('Enter first number: '));
    const num2 = isUnary ? 0 : parseFloat(await ask('Enter second number: '));

    let result: Result;

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
}

main();
