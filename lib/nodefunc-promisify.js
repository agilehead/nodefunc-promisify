(function() {

  "use strict";

  module.exports = function(fn, noErrors) {
    return function() {
      var self = this;

      var args = Array.prototype.slice.call(arguments);

      var promise = new Promise(function(resolve, reject) {
        var thunkFn = function() {
          var args = Array.prototype.slice.call(arguments);
          if (args.length === 0) {
            resolve();
          } else {
            if (!noErrors && (args[0] !== null && (typeof args[0] !== "undefined"))) {
              reject(args[0]);
            } else {
              var resultIndex = noErrors ? 0 : 1;
              if (args.length === resultIndex + 1) {
                resolve(args[resultIndex]);
              } else {
                resolve(args.slice(resultIndex));
              }
            }
          }
        };
        fn.apply(self, args.concat(thunkFn));
      });


      return promise;
    };
  };
})();
