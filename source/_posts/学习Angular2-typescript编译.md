---
title: 学习Angular2-typescript编译
date: 2015-11-13 16:59
---
前端这个方向，对于新事物的接受能力和速度决定了你在整个行业的位置。

ng2还没有发布官方稳定版本，但是我觉得对于我来说这个时候是最好的蓄力时机，于是开始了ng2的学习之路。

接触ng2之前也接触过一个avalon的东西，但是不知道是不是哪里相克，就是不顺利，后来想想，都是大同小异，不如学学更具参考性的ng2.

ng2支持typescript和es5，6开发，当然官方文档目前只有ts的，为了更快的上手，不得不先用ts写，于是就有一个问题就是：编译。

构建工具是gulp，于是开始找gulp上编译ts的插件，到是有一些，本以为不会走什么岔路，偏偏这种地方被缠了段时间。看样子我是真的需要多磨练磨练啊。
<!--more-->
进入正题：

最终选用的ts编译插件：`gulp-typescript` 。

官方说明很详细，不多赘述，主要几个细节：

0. 定义模块加载机制
``` javascript
"module": "commonjs"
```

gulp是node下的构建工具，所以模块加载机制也采用node的机制，否则会提示如下的错误

``` bash
error TS1148: Cannot compile modules unless the '--module' flag is provided.  
error TS2307: Cannot find module 'angular2/angular2'.  
error TS2307: Cannot find module 'angular2/http'.  
```
0. 定义编译目标类型

``` javascript
"target": "es5" 
```

把ts转换成es5标准的文件，node提示可以更高版本，但是实际操作实验并不可行。

0. 避免警告

``` javascript
"experimentalDecorators": true  
```

此项不配置，会提示警告，导致编译不成功

``` bash
error TS1219: Experimental support for decorators is a feature that is subject to change in a future release. Specify '--experimentalDecorators' to remove this warning.  
```