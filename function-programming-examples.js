var _ = require('lodash');
var curry = require('lodash/curry');

/**
  * Chapter 4 Examples
  **/

// curry adder
var add = (x) => (y) => x + y;
var increment = add(1);
var addTen = add(10);

console.log(increment(4)); // 5
console.log(addTen(10)); // 20

var match = curry((what, str)=>str.match(what));
var replace = curry((what, replacement, str)=>str.replace(what,replacement));
var filter = curry((f, ary)=>ary.filter(f));
var map = curry((f, ary)=>ary.map(f));

console.log(match(/\s+/g, 'hello world'));
console.log(match(/\s+/g)('hello world'));

var hasSpaces = match(/\s+/g);
console.log(hasSpaces('hello world'));
console.log(hasSpaces('spaceless'));

console.log(filter(hasSpaces, ['tori_spelling', 'tori amos']));


/**
  * Chapter 5 Exercises
  **/

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

var words = function(str) {
  return _.split(' ', str);
};

// Exercise 1 Solution
//==============
var split = curry((separator, str)=>_.split(str, separator));
var splitOnSpace = split(' ');
console.log(splitOnSpace('hello world'));

var split = function(separator) {
    return function(str) {
        return _.split(str, separator);
    };
};

var splitOnSpace = split(' ');
console.log(splitOnSpace('hello world'));

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

var sentences = undefined;

// Exercise 1a Solution (my solution takes an array of names and maps to an array
//  of initials, e.g. ['justin p graber'] -> ['J. P. G.'])
//==============
var mapArray = (fn, arr)=>_.map(arr, fn);
var names = ['justin p graber', 'nate something dean'];
var getInitials = map(function(name) {
    var names = splitOnSpace(name);
    return [names[0][0].toUpperCase() + '.',
            names[1][0].toUpperCase() + '.',
            names[2][0].toUpperCase() + '.'
          ].join(' ');
});

console.log(getInitials(names));

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

var filterQs = function(xs) {
  return _.filter(function(x) {
    return match(/q/i, x);
  }, xs);
};

// Exercise 2 Solution
//==============
var match = function(x) {
    return function(str) {
        return str.match(x);
    };
};

var arrFilter = function(predicate) {
    return function(arr) {
        return _.filter(arr, predicate);
    };
};

// put it all together
var findQ = match(/q/i);
var filterOnQ = arrFilter(findQ);
var arr = ['q here', 'not here'];
console.log(filterOnQ(arr));

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
var _keepHighest = function(x, y) {
  return x >= y ? x : y;
};

// REFACTOR THIS ONE:
var max = function(xs) {
  return _.reduce(function(acc, x) {
    return _keepHighest(acc, x);
  }, -Infinity, xs);
};

// Exercise 3 Solution
//==============
var reduce = (reducer, init)=> (arr)=> _.reduce(arr, reducer, init);
var max = reduce(_keepHighest, -Infinity);
var numbers = [1, 2, 6, 4, 885, 732];

console.log(max(numbers));


// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
var slice = undefined;

// Bonus 1 Solution:
// =================

var slice = (start, end, arr)=> ()=> arr.slice(start, end);

var sliceExample = slice(0,2,[0,1,2]);
console.log(sliceExample());

/**
  * Chapter 5 Examples
  **/

// Composition function
var compose = function(f, g) {
    return function(x) {
        return f(g(x));
    };
};

/**
  * Chapter 5 Exercises
  **/

// Example Data
var CARS = [{
  name: 'Ferrari FF',
  horsepower: 660,
  dollar_value: 700000,
  in_stock: true,
}, {
  name: 'Spyker C12 Zagato',
  horsepower: 650,
  dollar_value: 648000,
  in_stock: false,
}, {
  name: 'Jaguar XKR-S',
  horsepower: 550,
  dollar_value: 132000,
  in_stock: false,
}, {
  name: 'Audi R8',
  horsepower: 525,
  dollar_value: 114200,
  in_stock: false,
}, {
  name: 'Aston Martin One-77',
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true,
}, {
  name: 'Pagani Huayra',
  horsepower: 700,
  dollar_value: 1300000,
  in_stock: false,
}];

// Exercise 1:
// ============
// Use _.compose() to rewrite the function below. Hint: _.prop() is curried.
var isLastInStock = function(cars) {
  var last_car = _.last(cars);
  return _.prop('in_stock', last_car);
};

// Exercise 1 Solution:
// ====================
