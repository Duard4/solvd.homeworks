/* eslint-disable no-unused-vars */
// https://www.codewars.com/kata/5715eaedb436cf5606000381
function positiveSum(arr) {
  return arr.filter((el) => el > 0).reduce((acc, el) => (acc += el), 0);
}

// https://www.codewars.com/kata/5a3e1319b6486ac96f000049
function pairs(arr) {
  let res = 0;
  for (let i = 1; i < arr.length; i += 2) {
    res += Math.abs(arr[i - 1] - arr[i]) === 1 ? 1 : 0;
  }
  return res;
}

// https://www.codewars.com/kata/5aba780a6a176b029800041c
function maxMultiple(divisor, bound) {
  return bound - (bound % divisor);
}

// https://www.codewars.com/kata/514a6336889283a3d2000001
function getEvenNumbers(numbersArray) {
  return numbersArray.filter((el) => el % 2 === 0);
}

// https://www.codewars.com/kata/5a090c4e697598d0b9000004
function solve(arr) {
  arr.sort((a, b) => a - b);
  const res = [];
  let left = 0;
  let right = arr.length - 1;

  for (let i = 0; i < arr.length; i++) {
    res.push(i % 2 ? arr[left++] : arr[right--]);
  }

  return res;
}

// https://www.codewars.com/kata/566044325f8fddc1c000002c
function evenChars(string) {
  return string.length < 2 || string.length > 100
    ? 'invalid string'
    : string.split('').filter((el, i) => i % 2);
}

// https://www.codewars.com/kata/545a4c5a61aa4c6916000755
function gimme(triplet) {
  const sorted = [...triplet].sort((a, b) => a - b);
  const middleValue = sorted[1];
  return triplet.indexOf(middleValue);
}

// https://www.codewars.com/kata/578553c3a1b8d5c40300037c
const binaryArrayToNumber = (arr) => {
  return arr.reverse().reduce((acc, el, i) => (acc += el * 2 ** i));
};

// https://www.codewars.com/kata/585d7d5adb20cf33cb000235
function findUniq(arr) {
  arr.sort();
  return arr[0] == arr[1] ? arr.pop() : arr.shift();
}

// https://www.codewars.com/kata/581e014b55f2c52bb00000f8
function decipherThis(str) {
  return str
    .split(' ')
    .map((word) => {
      let numMatch = word.match(/^\d+/);

      let charCode = String.fromCharCode(parseInt(numMatch[0]));
      let rest = word.slice(numMatch[0].length);

      if (rest.length > 1) {
        rest = rest[rest.length - 1] + rest.slice(1, -1) + rest[0];
      }

      return charCode + rest;
    })
    .join(' ');
}

// https://www.codewars.com/kata/578aa45ee9fd15ff4600090d
function sortArray(array) {
  let odd = [...array].filter((el) => el % 2).sort((a, b) => a - b);
  return array.map((el) => (el % 2 ? odd.shift() : el));
}

// advanced
// https://www.codewars.com/kata/52597aa56021e91c93000cb0
function moveZeros(arr) {
  return [...arr.filter((el) => el !== 0), ...arr.filter((el) => el === 0)];
}
