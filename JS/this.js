// THIS is the object executing the current function
// Arrorw function always binds to the global object

function f (){
    function foo(num) {
        console.log( "foo: " + num, arguments.callee === foo );
        this.count++;
        }
        foo.count = 0; // As functions are objects in js
        var i;
        for (i=0; i<5; i++) {foo(i);}
        console.log( foo.count, 'count' in foo, this === global, this.count, global.count);
    }
    console.log(this === global);
    f();

// Main diff between Java and js 'this'
// Dynamic Scope and concept of 'this'
// When a function is invoked, an activation record, otherwise known
// -as an execution context, is created. This record contains information
// -about where the function was called from (call-site/the call-stack), how the
// -function was invoked, what parameters were passed, etc. One of the
// -properties of this record is the this reference, which will be used for
// -the duration of that function’s execution.
// 1. 'This' is automatically defined in the scope of every function. But it doesn't means it refers to the function in  which it is created.
// 2. 'This' does not, in any way, refer to a function’s lexical scope
// Example
function foo(num) {
    console.log( "foo: " + num, arguments.callee === foo );
    this.count++;
    }
    foo.count = 0; // As functions are objects in js
    var i;
    for (i=0; i<5; i++) {foo(i);}
    // Someone will assume that as count is associated with foo, so foo.count should be 5,
    // but no because the 'this' in this.count++ is not pointing to foo
    console.log( foo.count, window, 'count' in foo, 'count' in window); // 0, true, false
    // According to the dynamic scoping(as we are using this) JS Engine searches for count first in current block(that is function foo)
    // Then in the previous function in call stack(and not the previous scope)
    // Here the function after foo on call stack is global/window(default binding), Default binding does not takes place in presence of strict mode
    // Global object had count as undefined(because it was not there)
    // But when Engine found count++, it was assigned count to Nan as its prop then incremented it which is also NaN
    // Solution foo.count++; or arguments.callee.count++;
    // Same can be used to access anonymous function- arguments.callee
    // But arguments.callee is deprecated and should not be used.

    // Solutions
    // 1. foo.count++
    // 2. Create a data={ count:0 } object outside and access data.count++
    // 3. Better solution is to bind the this to the function foo
    //    foo.call(foo, i); inside for loop (Explicit Binding)

    // Default Binding- to global object
    // Implicit Binding - const fn = { a: 4, foo: () => { this.a = 5; }}, when fn.foo() is invoked an activation record is created and the 'this' is also created here, refers to fn
    // Explicit Binding- call, bind(hard Binding) and apply
    // hard binding was one strategy for preventing a function call falling back to the default binding for rest of the execution
    // newBinding, example let abc = new className(params);, class is generally a function
    // constructor className(params) invocation?, is not same as in Java
    // 1. A new object abc is created which is Prototype linked to the function className()
    // 2. At run time of new statement the this of foo points to bar in below example

    function foo(a) {
        this.a = a;
        }
        var bar = new foo( 2 ); // new object created 
        console.log(bar && bar.a );
    
    function foo(a) {
        console.log(this.a, a);
        this.a = a;
        }
        // var bar = new foo( 2 );
        const data = { a: 3 }
        const bar = foo.call(data, 2); // No new object creates, just execution of foo and storing returned value in bar
        console.log( bar && bar.a ); // error
    
    function foo(a) {
        this.a = a;
        // return { b: 6 }; // by default the return is newly constructed object using params(if we do this.a=a) i.e by default it's return {}
        }
        var bar = new foo( 2 ); // new object created 
        console.log(bar, bar.a );

        // Binding Priority(low to high)
        // |default binding| -> |implicit|-> |explicit(call and apply)| -> |new Binding| -> |explicit(bind(hard binding))|
        // Examplpe
        function foo(something) {
            this.a = something;
            }
            var obj1 = {
            foo: foo
            };
            var obj2 = {};
            obj1.foo( 2 );
            console.log( obj1.a ); // 2
            obj1.foo.call( obj2, 3 );
            console.log( obj2.a ); // 3
            var bar = new obj1.foo( 4 );
            console.log( obj1.a ); // 2
            console.log( bar.a ); // 4
        // Example2
        function foo(something) {
            this.a = something;
            }
            var obj1 = {};
            var bar = foo.bind( obj1 );
            bar( 2 );
            console.log( obj1.a ); // 2
            var baz = new bar( 3 );
            console.log( obj1.a ); // 2
            console.log( baz.a ); // 3