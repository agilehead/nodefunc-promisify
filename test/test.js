require("should");
var promisify = require("../lib/nodefunc-promisify");

var sayHello = function(str, cb) {
  return cb(null, "Hello " + str);
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

  it(`Should throw an error`, function() {
    var fn = promisify(throwError);
    var promise = fn("world");
    return promise.catch(function(val) {
      val.should.equal("Some error");
    });
  });
});
