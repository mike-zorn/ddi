var args_list = require('args-list');
var to_array = require('to-array');
var is_function = require('is-function');

module.exports = function() {
  return caller = function(func_or_array) {
    return resolve.call(caller, func_or_array);
  }
};

function remove_after_first_undefined(values) {
  var first_undefined = values.indexOf(undefined);

  if(first_undefined >= 0) {
    values = values.slice(0, first_undefined);
  }
  return values;
}

function get_args(func_or_array) {
  if(is_function(func_or_array)) {
    return {
      args: args_list(func_or_array),
      func: func_or_array
    };
  }
  else {
    return {
      args: func_or_array.slice(0, -1),
      func: func_or_array.slice(-1)[0]
    };
  }
}

function resolve(func_or_array) {
  var args_and_func = get_args(func_or_array);
  var args = args_and_func.args;
  var func = args_and_func.func;
  var that = this;

  var values = remove_after_first_undefined(
    args.map(function(arg) {
      var value = that[arg];
      if(is_function(value)) {
        return resolve.call(that, value);
      }
      return value;
    })
  );

  var resolved = function() {
    return func.apply(this, values.concat(to_array(arguments)));
  };

  if(args.length === values.length) {
    resolved.all_arguments_resolved = true;
  }

  return resolved;
}
