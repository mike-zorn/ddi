var args_list = require('args-list');
var to_array = require('to-array');
var is_function = require('is-function');

module.exports = function() {
  return caller = function(func) {
    return resolve.call(caller, func);
  }
};

function removeAfterFirstUndefined(values) {
  var firstUndefined = values.indexOf(undefined);

  if(firstUndefined >= 0) {
    values = values.slice(0, firstUndefined);
  }
  return values;
}

function resolve(func) {
  var args = args_list(func);
  var that = this;

  var values = removeAfterFirstUndefined(
    args.map(function(arg) {
      var value = that[arg];
      if(is_function(value)) {
        return resolve.call(that, value);
      }
      return value;
    })
  );

  return function() {
    return func.apply(this, values.concat(to_array(arguments)));
  };
}
