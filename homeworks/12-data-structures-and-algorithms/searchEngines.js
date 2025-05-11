import { data } from './MOCK_DATA.js';
import fs from 'fs';

const LARGE_DATA_SET = [...data, ...generateTestData(10000)];
const SORTED_LARGE_DATA = mergeSort([...LARGE_DATA_SET]);

const needleList = [
  'd462bb76-81ee-46af-9fdb-ebfe53a93d3f',
  '6df55f86-e3f5-4d7b-9cd5-906d8d7e804a',
  '1e63459f-0b18-4acf-9afc-e7287347bbeb',
  'e04b6074-332f-4661-8f3a-4cdcb3adfb6a',
  'be77abf7-29b0-4ed1-9379-f5d7576cb5ce',
  '3c511860-d159-457d-8374-e8205904e6f5',
  '1e63459f-0b18-4acf-9afc-e7287347bbeb',
  'e04b6074-332f-4661-8f3a-4cdcb3adfb6a',
  '9c4a0320-1d82-4a46-83b3-511ddffb7ee6',
  '1e63459f-0b18-4acf-9afc-e7287347bbeb',
  'e04b6074-332f-4661-8f3a-4cdcb3adfb6a',
  'be77abf7-29b0-4ed1-9379-f5d7576cb5ce',
  '3c511860-d159-457d-8374-e8205904e6f5',
  '1e63459f-0b18-4acf-9afc-e7287347bbeb',
  'd462bb76-81ee-46af-9fdb-ebfe53a93d3f',
  '6df55f86-e3f5-4d7b-9cd5-906d8d7e804a',
  '1e63459f-0b18-4acf-9afc-e7287347bbeb',
];

// Increase the number of search queries
const LARGE_NEEDLE_LIST = [
  ...needleList,
  ...Array(10000)
    .fill()
    .map(() => LARGE_DATA_SET[Math.floor(Math.random() * LARGE_DATA_SET.length)].sku),
  'non-existent-sku-123',
];

// Utility function to generate more test data if needed
function generateTestData(count) {
  const testData = [];
  for (let i = 0; i < count; i++) {
    testData.push({
      sku: crypto.randomUUID(),
    });
  }
  return testData;
}

/**
 * Linear Search algorithm. Iterates through the array until the target SKU is found.
 * Time complexity: O(n).
 * @param {Array<Object>} data - The array of objects to search. Each object is expected to have a 'sku' property.
 * @param {string} sku - The SKU to search for.
 * @returns {Object|null} The found object if the SKU exists in the array, otherwise null.
 */
function linearSearch(data, sku) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].sku === sku) {
      return data[i];
    }
  }
  return null;
}

/**
 * Binary Search algorithm. Efficiently searches a sorted array for a target SKU by repeatedly dividing the search interval in half.
 * Time complexity: O(log n). Requires the input array to be sorted by the 'sku' property.
 * @param {Array<Object>} sortedData - The sorted array of objects to search.
 * @param {string} sku - The SKU to search for.
 * @param {number} [left=0] - The starting index of the search interval.
 * @param {number} [right=sortedData.length - 1] - The ending index of the search interval.
 * @returns {Object|null} The found object if the SKU exists in the sorted array, otherwise null.
 */
function binarySearch(sortedData, sku, left = 0, right = sortedData.length - 1) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midSku = sortedData[mid].sku;

    if (midSku === sku) {
      return sortedData[mid];
    } else if (midSku < sku) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return null;
}

/**
 * Exponential Search algorithm. Useful for unbounded arrays or when the target is likely to be at the beginning.
 * It first finds a range where the target might be present and then performs Binary Search within that range.
 * Time complexity: O(log i), where i is the index of the element being searched.
 * Requires the input array to be sorted by the 'sku' property.
 * @param {Array<Object>} sortedData - The sorted array of objects to search.
 * @param {string} sku - The SKU to search for.
 * @returns {Object|null} The found object if the SKU exists in the sorted array, otherwise null.
 */
function exponentialSearch(sortedData, sku) {
  if (sortedData.length === 0) return null;
  if (sortedData[0].sku === sku) return sortedData[0];

  let i = 1;
  while (i < sortedData.length && sortedData[i].sku < sku) {
    i *= 2;
  }

  return binarySearch(sortedData, sku, Math.floor(i / 2), Math.min(i, sortedData.length - 1));
}

/**
 * Merge Sort algorithm implementation for sorting an array of objects based on their 'sku' property.
 * It's a divide and conquer algorithm that recursively divides the array into halves, sorts them, and then merges the sorted halves.
 * Time complexity: O(n log n).
 * @param {Array<Object>} items - The array of objects to be sorted.
 * @returns {Array<Object>} A new array containing the objects sorted by their 'sku' property.
 */
function mergeSort(items) {
  if (items.length <= 1) return items;

  let result = [...items];
  let temp = new Array(items.length);

  for (let size = 1; size < result.length; size *= 2) {
    for (let left = 0; left < result.length; left += 2 * size) {
      const mid = Math.min(left + size, result.length);
      const right = Math.min(left + 2 * size, result.length);
      mergeArrays(result, temp, left, mid, right);
    }
    [result, temp] = [temp, result]; // Swap references
  }

  return result;
}

/**
 * Helper function for Merge Sort. Merges two sorted subarrays into a single sorted subarray.
 * @param {Array<Object>} source - The original array containing the two subarrays to merge.
 * @param {Array<Object>} target - A temporary array to store the merged result.
 * @param {number} left - The starting index of the first subarray.
 * @param {number} mid - The ending index of the first subarray (and the starting index of the second).
 * @param {number} right - The ending index of the second subarray.
 */
function mergeArrays(source, target, left, mid, right) {
  let i = left,
    j = mid,
    k = left;

  while (i < mid && j < right) {
    target[k++] = source[i].sku <= source[j].sku ? source[i++] : source[j++];
  }

  while (i < mid) target[k++] = source[i++];
  while (j < right) target[k++] = source[j++];
}

/**
 * Performs a performance test for a given search function. It runs the search function multiple times
 * against a list of SKUs and measures the execution time.
 * @param {function} searchFunction - The search function to test (e.g., linearSearch, binarySearch).
 * @param {Array<Object>} testData - The array of data to search within.
 * @param {Array<string>} skuList - The list of SKUs to search for.
 * @param {number} [iterations=10] - The number of times to run the test for averaging.
 * @returns {Object} An object containing the performance test results, including the function name,
 * total time taken, the number of SKUs found, the total number of SKUs searched, and the average time per search.
 */
function performanceTest(searchFunction, testData, skuList, iterations = 10) {
  // Warm-up iterations to ensure the JavaScript engine optimizes the code
  for (let i = 0; i < 3; i++) {
    skuList.forEach((sku) => searchFunction(testData, sku));
  }

  let totalTime = 0;
  let foundCount = 0;

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();

    let localFound = 0;
    for (const sku of skuList) {
      if (searchFunction(testData, sku)) localFound++;
    }

    const end = performance.now();
    totalTime += end - start;
    foundCount = localFound;
  }

  return {
    name: searchFunction.name,
    time: totalTime / iterations,
    found: foundCount,
    total: skuList.length,
    avgTime: totalTime / iterations / skuList.length,
  };
}

/**
 * Runs performance tests for different search algorithms on the generated data.
 * It measures the execution time for each algorithm and logs the results to the console.
 * @returns {Array<Object>} An array of performance test result objects for each tested algorithm.
 */
function runPerformanceTests() {
  console.log('\n=== Running Performance Tests ===');
  console.log(`Data Size: ${LARGE_DATA_SET.length} items`);
  console.log(`Search Queries: ${LARGE_NEEDLE_LIST.length} searches`);

  const results = [
    { name: 'Merge Sort', func: () => mergeSort([...LARGE_DATA_SET]) },
    { name: 'Linear Search (unsorted)', func: linearSearch, data: LARGE_DATA_SET },
    { name: 'Linear Search (sorted)', func: linearSearch, data: SORTED_LARGE_DATA },
    { name: 'Binary Search', func: binarySearch, data: SORTED_LARGE_DATA },
    { name: 'Exponential Search', func: exponentialSearch, data: SORTED_LARGE_DATA },
  ].map((test) => {
    if (test.name === 'Merge Sort') {
      const start = performance.now();
      mergeSort([...LARGE_DATA_SET]);
      const time = performance.now() - start;
      return { ...test, time, avgTime: time / LARGE_DATA_SET.length };
    }

    const result = performanceTest(test.func, test.data, LARGE_NEEDLE_LIST, 10);
    return { ...test, ...result, name: test.name };
  });

  console.log('\nPerformance Results:');
  results.forEach((res) => {
    console.log(`
  ${res.name}:
    Total Time: ${res.time.toFixed(3)}ms
    Found: ${res.found || '-'}/${res.total || '-'}
    Avg per item: ${res.avgTime.toFixed(6)}ms`);
  });

  return results;
}

/**
 * The main function of the script. It runs the performance tests and saves the results to a log file.
 */
function main() {
  try {
    const performanceResults = runPerformanceTests();

    const logContent = `
  === Search Algorithm Performance Test Results ===
  Test Date: ${new Date().toISOString()}
  Data Size: ${data.length} items
  Needle List Size: ${needleList.length} searches
  
  Results:
  ${performanceResults
    .map(
      (r) => `
  ${r.name}:
    Total Time: ${r.time.toFixed(3)}ms
    Success Rate: ${r.found}/${r.total} (${((r.found / r.total) * 100).toFixed(1)}%)
    Average Time per Search: ${(r.time / r.total).toFixed(6)}ms
  `
    )
    .join('')}
  `;

    fs.writeFileSync('result.log', logContent);
    console.log('\nResults saved to result.log');
  } catch (error) {
    console.error('Error during execution:', error);
  }
}

main();
