
// Buuble Sort- Brute-Force Approach
const generator = require('random-array-generator');
const Stopwatch = require('statman-stopwatch');
const size = process.argv[2]; 
const min = 0;
const max = process.argv[2]*10;
const array = generator.randomArray({min, max, elements: size});
let expectedOutput  = [...array];
expectedOutput = expectedOutput.sort((a, b) => a - b);
require('../overridePrototypes');

const stopwatch = new Stopwatch();
stopwatch.start();
for (let i=1; i < size; i++) {
    let key = array[i];
    let j = i-1;
    while(j>=0 && array[j] >= key){
        // interchange array[j] , array[j-1]
        let temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
        j--;
    }
    array[j+1] = key
    }
stopwatch.stop();


// Time taken
console.log('TIme consumed: ', stopwatch.read());
// Compare results
if (array.equals(expectedOutput)) console.log('Insertion Sort: Test case passed');
else console.log('Insertion Sort: Test case failed.');

// Worst-time complexity O(n^2)
// Best-time complexity O(n^2)
// Average-time complexity O(n^2)