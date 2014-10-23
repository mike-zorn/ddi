var test = require('tape');
var create_scope = require('./index');

test('should resolve a string', function(t) {
  var scope = create_scope(); 
  scope.foo = 'bar';
  scope(function(foo) {
    t.equal(foo, 'bar');
    t.end();
  })();
});

test('should resolve a dependency with angular style declaration', 
function(t) {
  var scope = create_scope(); 
  scope.foo = 'bar';
  scope(['foo', function(lol) {
    t.equal(lol, 'bar');
    t.end();
  }])();
});

test('should resolve a dependency with a dependency', function(t) {
  var scope = create_scope(); 
  scope.foo = 'bar';
  scope.baz = function(foo, bazzoo) {
    t.equal(foo, 'bar');
    t.equal(bazzoo, 'pizza');
    t.end();
  };
  scope(function(baz) {
    baz('pizza');
  })();
});

test('should have all_arguments_resolved be true', function(t) {
  var scope = create_scope(); 
  scope.foo = 'bar';
  var resolved = scope(function(foo) { });
  t.ok(resolved.all_arguments_resolved, 'all arguments resolved');
  t.end();
});

test('should have all_arguments_resolved be false', function(t) {
  var scope = create_scope(); 
  scope.foo = 'bar';
  var resolved = scope(function(foo, bar) { });
  t.ok(!resolved.all_arguments_resolved, 'not all arguments resolved');
  t.end();
});
