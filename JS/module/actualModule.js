function module1 (val) {
    var i = 0;
    function f1 () {
        var j=i+1;
        console.log(val,i, j);
    }
    i++;
    return { // same as export in react
        f1,
    };
}

export module1;