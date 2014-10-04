ddi
===
Djanky dependency injection for javascript

[![browser support](https://ci.testling.com/apechimp/ddi.png)
](https://ci.testling.com/apechimp/ddi)

Installation
------------

[![npm install ddi](https://nodei.co/npm/ddi.png)](https://npmjs.org/package/ddi)

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
