// Closure is already there in below example
// How? 
// Say the for loop executes in 800ms, The setTimeout has a closure over the for loop and the closure = reference to variable i, 
// the common behavior of for loop should be collected by the garbage collection but it holds the refernce to i in loop,
// Closure lets the function continue to access the lexical scope it was defined in at author time.
// so instead of surrendering self to the js garbage collector, the for loop remains there after 800 ms

for (var i=0;i<5;i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}

// Apply a closure using IIFE, IIFE creates a new scope
// Although there are 5 different scopes created for IIFE, still the i in console points the same mem loc(that is global object)

for (var i=0;i<5;i++) {
    (function (){
        setTimeout(function() {
            console.log(i);
        }, 1000);
    })();
}

// Again there are 5 different scopes created for IIFE, but in the case below value of j in each scope is dependent on run time of for loop.
// Question: Will for loop be collected by Garbage collector after it's execution?
for (var i=0;i<5;i++) {
    (function (){
        var j=i; // a better example of utilising a closure
        setTimeout(function() {
            console.log(j);
        }, 1000);
    })();
}

// A better way
for (var i=0;i<5;i++) {
    (function (j){
        setTimeout(function() {
            console.log(j);
        }, 1000);
    })(i);
}

// Let creates a block scope like IIFE creates, and on each iteration of for loop a scope block is created for the let keyword
// Question: diff between block, lexical and dynamic scope?
for (let i=0;i<5;i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}


// Another closure example
var fn;
function foo() {
var a = 2;
function baz() {
console.log( a );
}
fn = baz; // assign baz to global variable
}
function bar() {
fn(); // look ma, I saw closure!
}
foo();
bar(); // 2


