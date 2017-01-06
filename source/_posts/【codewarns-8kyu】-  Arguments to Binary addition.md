---
title: 【codewarns-8kyu】-  Arguments to Binary addition
date: 2016-07-13 16:17
---
<h1> Introduction:
> Given an array add all the number elements and return the binary equivalent of that sum; to make the code bullet proof anything else than a number should be addeded as 0 since it can't be addeded.

>If your language can handle float binaries assume the array won't contain float or doubles.

> `arr2bin([1,2]) == '11'`
> `arr2bin([1,2,'a']) == '11'`
>`arr2bin([]) == '0'`

>`NOTE: NaN is a number too in javascript`


<!--more-->

<h1> Knowledge:     

<h2>`Array.prototype.filter`

The `filter()`method creates a new array width all elements that pass the test implemented by the provided function.

`arr.filter(callback[, thisArg])`

[this is the link about the `filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

<h2>`Array.prototype.reduce`

The reduce() method applies a function against an accumulator and each value of the array (from left-to-right) to reduce it to a single value.

`arr.reduce(callback,[initialValue])`

[this is the link ahout the `reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

<h2>`Number.prototype.toString`

The toString() method returns a string representing the specified Number object.

`numObj.toString([radix])`

[this is the link about `Number.toString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)