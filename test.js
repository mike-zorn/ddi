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
