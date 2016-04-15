var _ = require('lodash');
var curry = require('lodash/curry');

/**
  * Chapter 4 Examples
  **/

// curry adder
var add = (x) => (y) => x + y;
var increment = add(1);
var addTen = add(10);

increment(4); // 5
addTen(10); // 20

var match = curry((what, str)=>str.match(what));
var replace = curry((what, replacement, str)=>str.replace(what,replacement));
var filter = curry((f, ary)=>ary.filter(f));
var map = curry((f, ary)=>ary.map(f));

match(/\s+/g, 'hello world'); // [' ']
match(/\s+/g)('hello world'); // [' ']

var hasSpaces = match(/\s+/g);
hasSpaces('hello world'); // [' ']
hasSpaces('spaceless'); // null

filter(hasSpaces, ['tori_spelling', 'tori amos']); // ['tori amos']


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
splitOnSpace('hello world'); // ['hello', 'world']

var split = function(separator) {
    return function(str) {
        return _.split(str, separator);
    };
};

var splitOnSpace = split(' ');
splitOnSpace('hello world'); //  ['hello', 'world' ]

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

getInitials(names); // [ 'J. P. G.', 'N. S. D.' ]

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
filterOnQ(arr); // [ 'q here' ]

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

max(numbers); //885


// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
var slice = undefined;

// Bonus 1 Solution:
// =================

var slice = (start, end, arr)=> ()=> arr.slice(start, end);

var sliceExample = slice(0,2,[0,1,2]);
sliceExample(); // [0, 1]

// Bonus 2:
// ============
// Use slice to define a function "take" that takes n elements from the beginning of the string. Make it curried.
// // Result for "Something" with n=4 should be "Some"
var take = undefined;

var take = slice(0,4,'Something');
take(); //Some

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
var compose = function(g, h) {
    return function(x) {
        return g(h(x));
    };
};

// Curry prop
var prop = function(key) {
    return function(obj) {
        return obj[key];
    };
};

var inStock = prop('in_stock');
var isLastInStock = compose(inStock, _.last);
isLastInStock(CARS); // false
isLastInStock(_.reverse(CARS)); // true
// undo rever
_.reverse(CARS);

// Exercise 2:
// ============
// Use _.compose(), _.prop() and _.head() to retrieve the name of the first car.
var nameOfFirstCar;

// Exercise 2 Solution:
// ============
var carName = prop('name');
var head = function(arr) {
    return arr[0];
};

nameOfFirstCar = compose(carName, head);
nameOfFirstCar(CARS); //Ferrari FF

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.
var _average = function(xs) {
  var sum = _.reduce(xs, (sum, n)=>sum+n, 0);
  return sum / xs.length;
}; // <- leave be

var averageDollarValue = function(cars) {
  var dollar_values = _.map(function(c) {
    return c.dollar_value;
  }, cars);
  return _average(dollar_values);
};

// Exercise 3 Solution:
// ======================
var dollarValue = prop('dollar_value');

var mapProp = function(predicate) {
    return function (arr) {
        return arr.map(predicate);
    };
};

var mapAverageDollarValues = mapProp(dollarValue);
averageDollarValue = compose(_average, mapAverageDollarValues);
mapAverageDollarValues(CARS); //[ 700000, 648000, 132000, 114200, 1850000, 1300000 ]
averageDollarValue(CARS); //790700

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored car's names: e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) //=> ['ferrari_ff'].

// Exercise 4 Solution:
// ============

// Just for fun, here is how I would have written this method not using composition
var sanitizeNames = CARS.map(function(car) {
    return _.replace(car.name, /\W+/g, '_').toLowerCase();
});

// Replace Wrapper
replace = function replace(pattern, replacement) {
    return function(string) {
        return _.replace(string, pattern, replacement);
    };
};

// underscore wraper
var underscore = replace(/\W+/g, '_');

// To Lower case wrapper
var toLowerCase = function(string) {
    return String.prototype.toLowerCase.apply(string);
};


// Map functors
var mapNames = mapProp(prop('name'));
var mapLowerCase = mapProp(toLowerCase);
var mapUnderscore = mapProp(underscore);

sanitizeNames = compose(mapLowerCase, compose(mapUnderscore, mapNames));
sanitizeNames(CARS); //[ 'ferrari_ff','spyker_c12_zagato','jaguar_xkr_s','audi_r8','aston_martin_one_77','pagani_huayra' ]

// Bonus 1:
// ============
// Refactor availablePrices with compose.

var availablePrices = function(cars) {
  var available_cars = _.filter(_.prop('in_stock'), cars);
  return available_cars.map(function(x) {
    return accounting.formatMoney(x.dollar_value);
  }).join(', ');
};

// Bonus 1 Solution:
// ============

var formatMoney = function(value) {
    return '$' + value;
};

var filterArr = function(predicate) {
    return function(arr) {
        arr.filter(predicate);
    };
};

var arrToString = function(delimiter) {
    return function(arr) {
        return arr.join(delimiter);
    };
};

var toCommaString = arrToString(', ');
var filterInStock = filter(prop('in_stock'));
var mapDollarValue = mapProp(prop('dollar_value'));
var mapFormatMoney = mapProp(formatMoney);
var availablePrices = compose(toCommaString, compose(mapFormatMoney, compose(mapDollarValue, filterInStock)));

availablePrices(CARS); // $700000, $1850000
