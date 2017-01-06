---
title: TODO-1：数组去重方法大全
date: 2016-09-01 13:10
---

前两天看到有一个人在总结面试的时候写到问到了数组去重，说是方法很多。一时手痒把我能想到的都写出来了。

1、最传统的方法，“链式”检索，这个方法虽说是双层for循环嵌套，但是能够保留数组原有的顺序，对于有顺序要求的可以用这个，而且可以兼容低版本浏览器。

``` javascript
let ary = [2,324,35,2,36,1,2,5,3,51,31,2,5,2,24,5,46,789,0,'2','2'];

function uniq (ary){
    let l = ary.length,
        isRepeat = false,
        res = [];

    res[0] = ary[0];

    for(let i = 1; i < l; ++i){
        isRepeat = false;
        for(let j = 0; j < res.length; ++j){
            if(res[j] === ary[i]) {isRepeat =true; break;}
        }
        !isRepeat && res.push(ary[i])
    }
    return res;
}
```
<!--more-->
2、利用对象的属性不能重复的特性，但是对象的属性不能保留定义的时候的顺序，所以这个方法会破坏原有数组的顺序。

tips:为了防止太多重复，之后的代码都只写关键部分，同时用了箭头函数。

```javascript
let obj = {};

ary.forEach(e=>{
    if(obj[e] !== e) {res.push(e);obj[e] = e;}
    return true;
})
```
3、在数组中检索，能够被检索到便认为是重复，思路感觉跟第一个方法略有些相似
```javascript
res.push(ary[0]);
ary.forEach(e=>{
    if(res.indexOf(e) == -1) {res.push(e)}
})
```
4、先将数组排序，将相邻相同的值去掉，但是这个只适用于数据类型一致的数组。当然也破坏了原有的数组，如果想要不破坏数据源，可以先拷贝一份。
```javascript
ary.sort().forEach((e, i, array)=>{
    if(e !== array[i-1]) res.push(e);
})
```
5、利用数据的筛选和some等方法，主要思路同方法一，但是这个方法的效率应该是不如方法一的，毕竟每次都要拷贝一个新的数组。

```javscript
ary.filter((e, i, array)=>!array.slice(i+1).some(ele=>ele === e));
```
如果想要保证原有的顺序，可以先倒序数组。

```javascript
ary.reverse().filter((e, i, array)=>!array.slice(i+1).some(ele=>ele === e)).reverse();
```
6、最后一个是ES6提供的新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

```javascript
res = [ ...new Set(ary)];
```
哈哈，是不是看起来炒鸡棒！