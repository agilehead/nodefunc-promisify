(function() {

  "use strict";

  module.exports = function(fn) {
    return function() {
      var self = this;

      var args = Array.prototype.slice.call(arguments);

      var promise = new Promise(function(resolve, reject) {
        var thunkFn = function() {
          var args = Array.prototype.slice.call(arguments);
          if (args.length) {
            if (args[0] === null || (typeof args[0] === "undefined")) {
              if (args.length > 1) {
                resolve(args[1]);
              }
              else {
                resolve();
              }
            } else {
              reject(args[0]);
            }
          } else {
            resolve();
          }
        };
        fn.apply(self, args.concat(thunkFn));
      });

      return promise;
    };
  };
})();
