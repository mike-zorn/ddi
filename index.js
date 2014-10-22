var args_list = require('args-list');
var to_array = require('to-array');
var is_function = require('is-function');

module.exports = function() {
  return caller = function(funcOrArray) {
    return resolve.call(caller, funcOrArray);
  }
};

function removeAfterFirstUndefined(values) {
  var firstUndefined = values.indexOf(undefined);

  if(firstUndefined >= 0) {
    values = values.slice(0, firstUndefined);
  }
  return values;
}

function getArgs(funcOrArray) {
  if(is_function(funcOrArray)) {
    return {
      args: args_list(funcOrArray),
      func: funcOrArray
    };
  }
  else {
    return {
      args: funcOrArray.slice(0, -1),
      func: funcOrArray.slice(-1)[0]
    };
  }
}

function resolve(funcOrArray) {
  var argsAndFunc = getArgs(funcOrArray);
  var args = argsAndFunc.args;
  var func = argsAndFunc.func;
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
