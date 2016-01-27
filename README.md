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
var func_returning_promise = promisify(nodeFunc [, noErrorParamInCallback: boolean])
```

If noErrorParamInCallback is not set to true, nodeFunc is assumed to take a callback of the form (err, result) => void OR (err, r1, r2, ...) => void  
if noErrorParamInCallback is true, the callback is assumed to be (result) => void OR (r1, r2, ...) => void

If the callback passed to nodeFunc receives only one value (eg: result), the Promise is resolved with that value.  
If the callback passed to nodeFunc receives multiple values (eg: r1, r2, ...), the Promise is resolved with an array.


Supports functions of the following types:
------------------------------------------
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

fn(p1, p2, ... pN, cb) => void, where cb = (err, r1, r2, r3) => void
```
var sayHelloWithoutError = function(str, cb) {
  return cb("Hello " + str);
};

var fn = promisify(sayHelloWithoutError, true);
var promise = fn("world");
return promise.then(function(val) {
  val.should.equal("Hello world");
});
```

fn(p1, p2, ... pN, cb) => void, where cb = (result) => void
```
var sayHelloAndMaster = function(str, cb) {
  return cb(null, "Hello " + str, "Master");
};

var fn = promisify(sayHelloAndMaster);
var promise = fn("world");
return promise.then(function(val) {
  val[0].should.equal("Hello world");
  val[1].should.equal("Master");
});
```

fn(p1, p2, ... pN, cb) => void, where cb = (r1, r2, r3) => void

```
var promisify = require("../lib/nodefunc-promisify");
var fn = promisify(sayHelloAndMasterWithoutError, true);
var promise = fn("world");
return promise.then(function(val) {
  val[0].should.equal("Hello world");
  val[1].should.equal("Master");
});
```
