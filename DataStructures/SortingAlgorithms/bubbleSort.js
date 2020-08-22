
// Buuble Sort- Brute-Force Approach
const generator = require('random-array-generator');
const Stopwatch = require('statman-stopwatch');
if (!isNaN(process.argv[2])) {
    return console.error('Please enter a number as a third argumrnt.');
}
const size = process.argv[2];
const min = 0;
const max = process.argv[2]*10;
const array = generator.randomArray({min, max, elements: size});
let expectedOutput  = [...array];
expectedOutput = expectedOutput.sort((a, b) => a - b);
require('../overridePrototypes');

const stopwatch = new Stopwatch();

stopwatch.start();
let temp;
for (let i=0; i < size; i++) {
    for (let j=i+1; j< size; j++) {
        if (array[j] <= array[i]) {
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}
stopwatch.stop();

// Time taken
console.log('TIme consumed: ', stopwatch.read());
// Compare results
if (array.equals(expectedOutput)) console.log('Bubble-Sort: Test case passed.');
else console.log('Bubble Sort: Test case failed.');

// Worst-time complexity O(n^2)
// Best-time complexity O(n^2)
// Average-time complexity O(n^2)