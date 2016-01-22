(function() {

  "use strict";

  module.exports = function(fn) {
    return function() {
      var self = this;

      var args = Array.prototype.slice.call(arguments);

      var promise = new Promise(function(resolve, reject) {
        var thunkFn = function() {
          var args = Array.prototype.slice.call(arguments);
          if (args[0] === null || (typeof args[0] === "undefined")) {
            if (args.length > 1)
            resolve.apply(null, args.slice(1));
            else
            resolve();
          } else {
            reject(args[0]);
          }
        };
        fn.apply(self, args.concat(thunkFn));
      });

      return promise;
    };
  };
})();
