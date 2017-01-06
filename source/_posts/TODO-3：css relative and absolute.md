---
title: TODO-3：css relative and absolute
date: 2016-11-14 11:42
---

css中很多属性都是很近似的，平时在项目中使用并不会太在意两者之间的区别，之前在css定位上吃过亏，这次细致的解析一下。

``` css
css position: fixed | static | absolute | relative | center | page | sticky
```

`static` 和 `fixed` 的概念很简单，这里不做详细解释。

`center` `page` `sticky` 属于css3新增属性。
<!--more-->
`relative` 相对定位，它的地位计算基于自身在文档中的位置，同时会占用文档流，使用`top` `right` `bottom` `left` 时不会影响到页面中其他元素的位置（除非在这个元素中含有带有定位的元素）。

`absolute` 绝对定位，它的定位计算基于父元素，父元素没有则向上追溯，直到body 应用了`absolute` 的元素会脱离文档流，不在页面中占位，使用`top` `right` `bottom` `left` 时也不会影响到页面中其他元素的位置（除非在这个元素中含有带有定位的元素）。

下面是我写的关于`absolute` `relative` 的[demo](http://dabblet.com/gist/cd727f543cb129f9e0fa71214a7bc9b9%20)