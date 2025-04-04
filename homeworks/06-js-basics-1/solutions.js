// http://www.codewars.com/kata/opposite-number
export function opposite(number) {
  return -number;
}

// http://www.codewars.com/kata/basic-mathematical-operations
export function basicOp(operation, value1, value2) {
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };
  return operations[operation]?.(value1, value2) ?? 0;
}

// http://www.codewars.com/kata/printing-array-elements-with-comma-delimiters
export function printArray(array) {
  return array.join(',');
}

// http://www.codewars.com/kata/transportation-on-vacation
export function rentalCarCost(days) {
  let cost = days < 3 ? 0 : days < 7 ? -20 : -50;
  return cost + days * 40;
}

// http://www.codewars.com/kata/calculating-with-export functions
export function zero(func) {
  return func ? func(0) : 0;
}
export function one(func) {
  return func ? func(1) : 1;
}
export function two(func) {
  return func ? func(2) : 2;
}
export function three(func) {
  return func ? func(3) : 3;
}
export function four(func) {
  return func ? func(4) : 4;
}
export function five(func) {
  return func ? func(5) : 5;
}
export function six(func) {
  return func ? func(6) : 6;
}
export function seven(func) {
  return func ? func(7) : 7;
}
export function eight(func) {
  return func ? func(8) : 8;
}
export function nine(func) {
  return func ? func(9) : 9;
}

export function plus(value2) {
  return (value1) => value1 + value2;
}
export function minus(value2) {
  return (value1) => value1 - value2;
}
export function times(value2) {
  return (value1) => value1 * value2;
}
export function dividedBy(value2) {
  return (value1) => Math.floor(value1 / value2);
}

// http://www.codewars.com/kata/get-the-middle-character
export function getMiddle(str) {
  const mid = Math.floor(str.length / 2);
  return str.length % 2 ? str[mid] : str.slice(mid - 1, mid + 1);
}

// http://www.codewars.com/kata/partition-on
export function partitionOn(pred, items) {
  const falsy = items.filter((item) => !pred(item));
  const truthy = items.filter((item) => pred(item));
  items.length = 0;
  items.push(...falsy, ...truthy);
  return falsy.length;
}

// https://www.codewars.com/kata/find-the-odd-int/
export function findOdd(arr) {
  for (let i of arr) {
    if (arr.filter((x) => x === i).length % 2 !== 0) {
      return i;
    }
  }
}

// https://www.codewars.com/kata/find-the-parity-outlier
export function findOutlier(integers) {
  let odds = integers.filter((x) => x % 2);
  return odds.length > 1 ? integers.filter((x) => x % 2 == 0)[0] : odds[0];
}

// https://www.codewars.com/kata/zipwith
export function zipWith(func, arr0, arr1) {
  return Array.from({ length: Math.min(arr0.length, arr1.length) }, (_, i) =>
    func(arr0[i], arr1[i])
  );
}

// https://www.codewars.com/kata/filter-the-number
export function filterString(value) {
  return +value
    .split('')
    .filter((a) => !isNaN(Number(a)))
    .join('');
}

// https://www.codewars.com/kata/n-th-fibonacci
export function nthFibo(number) {
  return number < 2 ? 0 : number == 2 ? 1 : nthFibo(number - 1) + nthFibo(number - 2);
}

// https://www.codewars.com/kata/cat-and-mouse-2d-version/
export function catMouse(map, moves) {
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
export function duplicateEncode(word) {
  const chars = word.toLowerCase().split('');
  const count = {};

  chars.forEach((char) => {
    count[char] = (count[char] || 0) + 1;
  });

  return chars.map((char) => (count[char] > 1 ? ')' : '(')).join('');
}

// https://www.codewars.com/kata/576757b1df89ecf5bd00073b
export function towerBuilder(nFloors) {
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
export function wave(str) {
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
export function stringBreakers(n, string) {
  const noSpaces = string.replace(/\s/g, '');

  const result = [];
  for (let i = 0; i < noSpaces.length; i += n) {
    result.push(noSpaces.slice(i, i + n));
  }

  return result.join('\n');
}

// https://www.codewars.com/kata/514a024011ea4fb54200004b
export function domainName(url) {
  url = url.replace(/(https?:\/\/)?(www\.)?/, '');
  const match = url.match(/^([^.]+)/);
  return match ? match[1] : '';
}
