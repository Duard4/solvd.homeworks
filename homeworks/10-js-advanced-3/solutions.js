// https://www.codewars.com/kata/55e7650c8d894146be000095/javascript
export function validateMessage(message) {
  if (message === null) {
    throw new ReferenceError('Message is null!');
  }
  if (typeof message !== 'string') {
    throw new TypeError(`Message should be of type string but was of type ${typeof message}!`);
  }

  const length = message.length;
  if (length === 0 || length > 255) {
    throw new RangeError(`Message contains ${length} characters!`);
  }

  const htmlTagRegex = /<.*>/;
  if (htmlTagRegex.test(message)) {
    return false;
  }

  return true;
}

// https://www.codewars.com/kata/5a353a478f27f244a1000076
export async function sayJoke(apiUrl, jokeId) {
  const jokes = await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data.jokes);

  if (!jokes) {
    throw new Error(`No jokes at url: ${apiUrl}`);
  }

  const joke = jokes.filter((joke) => joke.id === jokeId)[0];

  if (!joke) {
    throw new Error(`No jokes found id: ${jokeId}`);
  }

  return {
    saySetup: () => joke.setup,
    sayPunchLine: () => joke.punchLine,
  };
}

// setTimeout/setInterval
export function displayElapsedTimeInterval() {
  let seconds = 0;
  const intervalId = setInterval(displayElapsedTime, 1000);
  function displayElapsedTime() {
    seconds++;
    console.log(`Elapsed time: ${seconds} sec`);
  }
  setTimeout(() => clearInterval(intervalId), 6000);
}

// setTimeout/setInterval v.2: without setTimeout
export function displayElapsedTimeIntervalV2() {
  let seconds = 0;
  const intervalId = setInterval(displayElapsedTime, 1000);
  function displayElapsedTime() {
    seconds++;
    console.log(`Elapsed time: ${seconds} sec`);
    if (seconds === 5) clearInterval(intervalId);
  }
}

// Digit or not
export const startsWithDigit = (str) => {
  const regex = /^\d/;
  return regex.test(str);
};
