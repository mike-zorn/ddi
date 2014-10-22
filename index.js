var args_list = require('args-list');
var to_array = require('to-array');
var is_function = require('is-function');

module.exports = function() {
  return caller = function() {
    return resolve.apply(caller, to_array(arguments));
  }
};

function removeAfterFirstUndefined(values) {
  var firstUndefined = values.indexOf(undefined);

  if(firstUndefined >= 0) {
    values = values.slice(0, firstUndefined);
  }
  return values;
}

function getArgs(stuff) {
  var func = stuff.slice(-1)[0];

  if(stuff.length === 1) {
    return {
      args: args_list(func),
      func: func
    };
  }
  else {
    return {
      args: stuff.slice(0, -1),
      func: func
    };
  }
}

function resolve() {
  var argsAndFunc = getArgs(to_array(arguments));
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
