ddi
===
Djanky dependency injection for javascript

Installation
------------

``npm install --save ddi``

Usage
-----

```javascript
var create_scope = require('ddi');

var scope = create_scope();

scope.register('foo', 'bar');
scope(function(foo) {
  console.log(foo)
})();
```
yields ``bar``.

You can also "nest" dependencies.

```javascript
var scope = create_scope(); 
scope.foo = 'bar';
scope.baz = function(foo, bazzoo) {
  console.log(foo, bazzoo);
};
scope(function(baz) {
  baz('pizza');
})();
```
yields ``bar pizza``.
