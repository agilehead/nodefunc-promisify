require("should");
var promisify = require("../lib/nodefunc-promisify");

var sayHello = function(str, cb) {
  return cb(null, "Hello " + str);
};

var sayHelloWithoutError = function(str, cb) {
  return cb("Hello " + str);
};

var sayHelloAndMaster = function(str, cb) {
  return cb(null, "Hello " + str, "Master");
};

var sayHelloAndMasterWithoutError = function(str, cb) {
  return cb("Hello " + str, "Master");
};

var throwError = function(str, cb) {
  return cb("Some error", "Hello " + str);
};

describe("Nodefunc Promisify", function() {
  it(`Convert a node func to a func returning a promise`, function() {
    var fn = promisify(sayHello);
    var promise = fn("world");
    return promise.then(function(val) {
      val.should.equal("Hello world");
    });
  });

  it(`If callback has multiple parameters, return an array`, function() {
    var fn = promisify(sayHelloAndMaster, { hasMultipleResults: true });
    var promise = fn("world");
    return promise.then(function(val) {
      val[0].should.equal("Hello world");
      val[1].should.equal("Master");
    });
  });

  it(`Convert a node func (without err param) to a generator func returning a promise`, function() {
    var fn = promisify(sayHelloWithoutError, { noErrorParameter: true });
    var promise = fn("world");
    return promise.then(function(val) {
      val.should.equal("Hello world");
    });
  });

  it(`If callback (without err param) has multiple parameters, return an array`, function() {
    var fn = promisify(sayHelloAndMasterWithoutError, { noErrorParameter: true, hasMultipleResults: true });
    var promise = fn("world");
    return promise.then(function(val) {
      val[0].should.equal("Hello world");
      val[1].should.equal("Master");
    });
  });

  it(`Should throw an error`, function() {
    var fn = promisify(throwError);
    var promise = fn("world");
    return promise.catch(function(val) {
      val.should.equal("Some error");
    });
  });
});
