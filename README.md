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

scope.foo = 'bar';
scope(function(foo) {
  console.log(foo)
})();
```
yields `bar`.

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
yields `bar pizza`. As well as use angular style dependency declaration.

```javascript
var create_scope = require('ddi');

var scope = create_scope();

scope.foo = 'bar';
scope(['foo', function(lol) {
  console.log(lol)
})();
```
yields `bar`. Finally, `all_argments_resolved` will tell you whether or not
more arguments need to be supplied to your function.
```javascript
var create_scope = require('ddi');

var scope = create_scope();

scope.foo = 'bar';
var resolved = scope(function(foo) { });
console.log(resolved.all_argments_resolved);
```
yields `true`.
