---
title: 'RESTful:PATCH vs PUT'
date: 2017-04-18 19:26:00
author: wmzy
tags:
  - REST
  - RESTful
  - http
  - api
---

在写 RESTful API 时，很多人分不清 PUT 和 PATCH 方法的区别，这里讲一下我的理解。

### 更新和更新部分

PUT 用于整体更新，PATCH 用于部分更新，很多人都明白这一点。
那么有些人就把 PATCH 作为更新资源的首选，理由很简单，PATCH 请求只需要把要修改的属性提交给 server 端，按需变更更省资源。
这么看来，PUT 基本上可以用 PATCH 替换掉了。但是实际上并非如此，整体更新还是部分更新是要根据业务逻辑来的，而不是单从技术上讲的。

比如用户在一个 project 的详情页面，修改了 project 的 owner， 这个时候是不应该用 PATCH 方法的，而应该用 PUT。用户在详情页面，看到的是 project 的整体，虽然变更的只是一个属性，但是保存的逻辑对用户来说就是操作成功后，project 就变成了他现在看到的样子（也是他期望的样子）。

而如果用 PATCH 方法会是怎样呢？在用户看到 project 和修改保存的期间，可能这个 project 已经变更了，这时候得到的结果可能就不是当前用户所期望的了。这个时候保存操作应该是失败的，用户应该处理可能发生的冲突，然后放弃或重新编辑保存。但是 server 端并不能根据 PATCH 的语义来判断有冲突发生的，它只能根据请求变更某些字段。PUT 遇到这种情况就不同了， server 端可以根据一些特定的字段（比如 version、createdAt等）来检测有没有冲突，让操作失败，也可以覆盖掉这个冲突，但至少可以保证逻辑的严谨性。

而如果用户在 project 的列表页去变更 owner 的话，就应该用 PATCH 了，这个时候用户并不能看到这个 project 的全部属性，他也不关心整个 project 最后是什么样，他只是想把一个名叫“xxx”的项目转给某个人。

### 幂等性
> 幂等指的是资源实体，而不是资源的某个属性。

* PUT 是幂等的，同一个PUT请求重试多次，资源的状态和请求一次应该是一样的。
* PATCH 并不是幂等的，同一个请求发送多次，资源的状态未必是一致的。