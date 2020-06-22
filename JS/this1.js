let val1 = 9;

const fun1 = () => {
    let val1 = 10;
    console.log('Inside function1::: ', val1, this.val1, this === fun1, this === window);
    return fun2();
};

function fun2 () {
    console.log('Inside function2:::  ', val1, this.val1, this === fun1, this === fun2, this === window);
    return 6;
};

console.log(val1, this.val1);
console.log('this::', this);

fun1();
fun2();
console.log('--------------------------------------');
fun2.call(fun1);