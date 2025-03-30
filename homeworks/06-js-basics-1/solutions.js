/* eslint-disable no-unused-vars */
// http://www.codewars.com/kata/opposite-number
function opposite(number) {
  return -number;
}

// http://www.codewars.com/kata/basic-mathematical-operations
function basicOp(operation, value1, value2) {
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };
  return operations[operation]?.(value1, value2) ?? 0;
}

// http://www.codewars.com/kata/printing-array-elements-with-comma-delimiters
function printArray(array) {
  return array.join(',');
}

// http://www.codewars.com/kata/transportation-on-vacation
function rentalCarCost(d) {
  let cost = d < 3 ? 0 : d < 7 ? -20 : -50;
  return cost + d * 40;
}

// http://www.codewars.com/kata/calculating-with-functions
function zero(fn) {
  return fn ? fn(0) : 0;
}
function one(fn) {
  return fn ? fn(1) : 1;
}
function two(fn) {
  return fn ? fn(2) : 2;
}
function three(fn) {
  return fn ? fn(3) : 3;
}
function four(fn) {
  return fn ? fn(4) : 4;
}
function five(fn) {
  return fn ? fn(5) : 5;
}
function six(fn) {
  return fn ? fn(6) : 6;
}
function seven(fn) {
  return fn ? fn(7) : 7;
}
function eight(fn) {
  return fn ? fn(8) : 8;
}
function nine(fn) {
  return fn ? fn(9) : 9;
}

function plus(b) {
  return (a) => a + b;
}
function minus(b) {
  return (a) => a - b;
}
function times(b) {
  return (a) => a * b;
}
function dividedBy(b) {
  return (a) => Math.floor(a / b);
}

// http://www.codewars.com/kata/get-the-middle-character
function getMiddle(s) {
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : s.slice(mid - 1, mid + 1);
}

// http://www.codewars.com/kata/partition-on
function partitionOn(pred, items) {
  const falsy = items.filter((item) => !pred(item));
  const truthy = items.filter((item) => pred(item));
  items.length = 0;
  items.push(...falsy, ...truthy);
  return falsy.length;
}

// https://www.codewars.com/kata/find-the-odd-int/
function findOdd(A) {
  for (let i of A) {
    if (A.filter((x) => x === i).length % 2 !== 0) {
      return i;
    }
  }
}

// https://www.codewars.com/kata/find-the-parity-outlier
function findOutlier(integers) {
  let odds = integers.filter((x) => x % 2);
  return odds.length > 1 ? integers.filter((x) => x % 2 == 0)[0] : odds[0];
}

// https://www.codewars.com/kata/zipwith
function zipWith(fn, a0, a1) {
  return Array.from({ length: Math.min(a0.length, a1.length) }, (_, i) => fn(a0[i], a1[i]));
}

// https://www.codewars.com/kata/filter-the-number
function filterString(value) {
  return +value
    .split('')
    .filter((a) => !isNaN(Number(a)))
    .join('');
}

// https://www.codewars.com/kata/n-th-fibonacci
function nthFibo(n) {
  return n < 2 ? 0 : n == 2 ? 1 : nthFibo(n - 1) + nthFibo(n - 2);
}

// https://www.codewars.com/kata/cat-and-mouse-2d-version/
function catMouse(map, moves) {
  const lines = map.split('\n');
  let catPos, mousePos;

  for (let y = 0; y < lines.length; y++) {
    const xC = lines[y].indexOf('C');
    const xM = lines[y].indexOf('m');
    if (xC !== -1) catPos = { x: xC, y };
    if (xM !== -1) mousePos = { x: xM, y };
  }

  if (!catPos || !mousePos) return 'boring without two animals';

  const distance = Math.abs(catPos.x - mousePos.x) + Math.abs(catPos.y - mousePos.y);

  return distance <= moves ? 'Caught!' : 'Escaped!';
}

// https://www.codewars.com/kata/duplicate-encoder
function duplicateEncode(word) {
  const chars = word.toLowerCase().split('');
  const count = {};

  chars.forEach((char) => {
    count[char] = (count[char] || 0) + 1;
  });

  return chars.map((char) => (count[char] > 1 ? ')' : '(')).join('');
}

// https://www.codewars.com/kata/576757b1df89ecf5bd00073b
function towerBuilder(nFloors) {
  let spaces,
    stars,
    res = [];
  for (let i = 0; i < nFloors; i++) {
    spaces = ' '.repeat(nFloors - i - 1);
    stars = '*'.repeat(i * 2 + 1);
    res.push(spaces + stars + spaces);
  }
  return res;
}

// https://www.codewars.com/kata/58f5c63f1e26ecda7e000029
function wave(str) {
  let mWave = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') continue;

    let waveStr = str.toLowerCase().split('');
    waveStr[i] = waveStr[i].toUpperCase();
    mWave.push(waveStr.join(''));
  }
  return mWave;
}

// https://www.codewars.com/kata/59d398bb86a6fdf100000031
function stringBreakers(n, string) {
  const noSpaces = string.replace(/\s/g, '');

  const result = [];
  for (let i = 0; i < noSpaces.length; i += n) {
    result.push(noSpaces.slice(i, i + n));
  }

  return result.join('\n');
}

// https://www.codewars.com/kata/514a024011ea4fb54200004b
function domainName(url) {
  url = url.replace(/(https?:\/\/)?(www\.)?/, '');
  const match = url.match(/^([^.]+)/);
  return match ? match[1] : '';
}
