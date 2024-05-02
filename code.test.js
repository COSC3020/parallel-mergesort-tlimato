const { p_merge_sort } = require('./code.js'); // Adjust the path and function name as necessary
const jsc = require('jsverify');

// Asynchronous property-based testing
const testSort = jsc.forall("array nat", async function(arr) {
    var original = arr.slice(); // Make a copy of the array
    var sorted = await p_merge_sort(arr); // Sort using your parallel merge sort
    original.sort((a, b) => a - b); // Sort using the native sort for comparison

    return JSON.stringify(sorted) === JSON.stringify(original);
});

// Function to run the test
function runTest() {
    jsc.assert(testSort, {tests: 1000}).catch(error => {
        console.error("Test failed:", error);
    });
}

// Call the function to run the test
runTest();