const {Worker, isMainThread} = require('worker_threads');

async function p_merge_sort(arr) {

  // Base case: if the array has less than two elements, it's already sorted
  if (arr.length < 2) {
    return arr;
  }

  // round down and find the middle index of the array
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // If this is the main thread, use workers to sort each half in parallel
  if (isMainThread) {
    // Create two workers to sort the left and right halves
    const worker1 = new Worker(__filename, { workerData: left });
    const worker2 = new Worker(__filename, { workerData: right });

    // Create "promises" (asynchronous) that resolve when each worker sends back the sorted array
    const sortedLeft = new Promise(resolve => worker1.on('message', resolve));
    const sortedRight = new Promise(resolve => worker2.on('message', resolve));

    // Send the "sort" message to each worker
    worker1.postMessage('sort');
    worker2.postMessage('sort');

    // Wait for both halves to be sorted and then merge them
    return merge([await sortedLeft, await sortedRight]);
  } else {
    // If not the main thread, recursively sort the halves and merge them. This will be the case during parallel execution for both workers.
    return merge([await p_merge_sort(left), await p_merge_sort(right)]);
  }
}

// merge two sorted arrays
function merge([left, right]) {
  const result = [];
  // pretty straight forward, just pop the smallest element from the front of each array and push it to the result array
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  // return the result array
  // Javascript will concatinate the lefts and rights and return the result
  return [...result, ...left, ...right];
}
module.exports = { p_merge_sort };


