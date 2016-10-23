nodefunc-promisify
==================
Converts a node style function (which takes a callback) into one that returns a promise.

Installation
------------
```
npm install nodefunc-promisify
```

Usage
------
```
var promisify = require("nodefunc-promisify");
var func_returning_promise = promisify(someNodeFunc[, options]);
```

The optional options parameter takes these values:
```
var options = {
  noErrorParameter: boolean,
  hasMultipleResults: boolean
}
```

If options.noErrorParameter is false (default), nodeFunc is assumed to take a standard node callback in which the first parameter denotes the error. For example, a callback like function(err, result) { .... }  
If set to true, the callback is assumed to not contain the error parameter. For example, a callback like function(result) { .... }

If options.hasMultipleResults is false (default), nodeFunc is assumed to return a single value via the callback. For example, a callback like function(err, result) { .... }  
if true, the callback is assumed to return multiple values. The promise resolves with an array containing multiple results. For example, a callback like function(err, result1, result2) { .... }

options.noErrorParameter and options.hasMultipleResults may be used together.

Examples
---------

fn(p1, p2, ... pN, cb) => void, where cb = (err, result) => void
```
var sayHello = function(str, cb) {
  return cb(null, "Hello " + str);
};

var fn = promisify(sayHello);
var promise = fn("world");
return promise.then(function(val) {
  val.should.equal("Hello world");
});
```

fn(p1, p2, ... pN, cb) => void, where cb = (result) => void
```
var sayHelloWithoutError = function(str, cb) {
  return cb("Hello " + str);
};

var fn = promisify(sayHelloWithoutError, { noErrorParameter: true });
var promise = fn("world");
return promise.then(function(val) {
  val.should.equal("Hello world");
});
```

fn(p1, p2, ... pN, cb) => void, where cb = (err, r1, r2, r3) => void
```
var sayHelloAndMaster = function(str, cb) {
  return cb(null, "Hello " + str, "Master");
};

var fn = promisify(sayHelloAndMaster, { hasMultipleResults: true });
var promise = fn("world");
return promise.then(function(val) {
  val[0].should.equal("Hello world");
  val[1].should.equal("Master");
});
```

fn(p1, p2, ... pN, cb) => void, where cb = (r1, r2, r3) => void
```
var sayHelloAndMasterWithoutError = function(str, cb) {
  return cb("Hello " + str, "Master");
};

var fn = promisify(sayHelloAndMasterWithoutError, { noErrorParameter: true, hasMultipleResults: true });
var promise = fn("world");
return promise.then(function(val) {
  val[0].should.equal("Hello world");
  val[1].should.equal("Master");
});
```
